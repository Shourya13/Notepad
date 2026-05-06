import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
    Animated,
    KeyboardAvoidingView,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useNotepadStore } from '@/features/notepad/use-notepad-store';
import { createId } from '@/features/notepad/utils';
import { ACTION_CONFIG } from '@/features/recipes/action-config';
import { ActionEditSheet } from '@/features/recipes/components/action-edit-sheet';
import { ActionPalette } from '@/features/recipes/components/action-palette';
import { IngredientForm } from '@/features/recipes/components/ingredient-form';
import { Timeline } from '@/features/recipes/components/timeline';
import { ActionKind, ActionStep, Ingredient, Step } from '@/features/recipes/types';
import { useRecipes } from '@/features/recipes/use-recipes';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { minimalThemes, resolveThemeMode } from '@/lib/themes';

import { recipeEditorStyles as styles } from './[id].styles';

export default function RecipeEditorScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const systemColorScheme = useColorScheme();

  const { store, setStore } = useNotepadStore();
  const { getRecipe, updateRecipe, setSteps } = useRecipes(store, setStore);

  const recipe = useMemo(() => (id ? getRecipe(id) : null), [getRecipe, id]);

  const preferences = store.preferences;
  const resolvedThemeMode = resolveThemeMode(preferences.mode, systemColorScheme);
  const palette = minimalThemes[preferences.themeId][resolvedThemeMode];
  const isDark = resolvedThemeMode === 'dark';

  const [title, setTitle] = useState(recipe?.title ?? '');
  const [servings, setServings] = useState<string>(
    recipe?.servings ? String(recipe.servings) : '2',
  );

  const [ingredientFormOpen, setIngredientFormOpen] = useState(false);
  const [editingIngredientStepId, setEditingIngredientStepId] = useState<string | null>(null);
  const [editingActionStepId, setEditingActionStepId] = useState<string | null>(null);

  // Drag state for action chips dropping into the timeline (or step reorder)
  type Drag =
    | { kind: 'new'; action: ActionKind }
    | { kind: 'reorder'; stepId: string };
  const [drag, setDrag] = useState<Drag | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const ghostX = useRef(new Animated.Value(0)).current;
  const ghostY = useRef(new Animated.Value(0)).current;
  const stepLayoutsRef = useRef<Map<string, { y: number; height: number }>>(new Map());
  const stepOrderRef = useRef<string[]>([]);
  const timelineLocalYRef = useRef(0); // y of timeline within scroll content
  const scrollOriginYRef = useRef(0); // absolute y of ScrollView on screen
  const scrollOffsetYRef = useRef(0);
  const lastDropIndexRef = useRef<number | null>(null);

  useEffect(() => {
    stepOrderRef.current = recipe?.steps.map((s) => s.id) ?? [];
  }, [recipe?.steps]);

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setServings(recipe.servings ? String(recipe.servings) : '');
    }
  }, [recipe?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const persist = () => {
    if (!recipe) return;
    const parsedServings = parseInt(servings, 10);
    updateRecipe(recipe.id, {
      title: title.trim(),
      servings: Number.isFinite(parsedServings) && parsedServings > 0 ? parsedServings : undefined,
    });
  };

  const goBack = () => {
    persist();
    router.back();
  };

  const editingIngredient: Ingredient | null = useMemo(() => {
    if (!recipe || !editingIngredientStepId) return null;
    const step = recipe.steps.find((s) => s.id === editingIngredientStepId);
    return step && step.kind === 'ingredient' ? step.ingredient : null;
  }, [recipe, editingIngredientStepId]);

  const openAddIngredient = () => {
    setEditingIngredientStepId(null);
    setIngredientFormOpen(true);
  };

  const openEditIngredient = (stepId: string) => {
    setEditingIngredientStepId(stepId);
    setIngredientFormOpen(true);
  };

  const closeIngredientForm = () => {
    setIngredientFormOpen(false);
    setEditingIngredientStepId(null);
  };

  const submitIngredient = (ingredient: Ingredient) => {
    if (!recipe) return;
    let nextSteps: Step[];
    if (editingIngredientStepId) {
      nextSteps = recipe.steps.map((s) =>
        s.id === editingIngredientStepId && s.kind === 'ingredient'
          ? { ...s, ingredient }
          : s,
      );
    } else {
      nextSteps = [
        ...recipe.steps,
        { id: createId(), kind: 'ingredient', ingredient },
      ];
    }
    setSteps(recipe.id, nextSteps);
  };

  const deleteStep = (stepId: string) => {
    if (!recipe) return;
    setSteps(
      recipe.id,
      recipe.steps.filter((s) => s.id !== stepId),
    );
  };

  const appendAction = (action: ActionKind) => {
    if (!recipe) return;
    const meta = ACTION_CONFIG[action];
    const newStep: Step = {
      id: createId(),
      kind: 'action',
      action,
      durationMin: meta.defaultMin > 0 ? meta.defaultMin : undefined,
    };
    setSteps(recipe.id, [...recipe.steps, newStep]);
  };

  const insertActionAt = (action: ActionKind, index: number) => {
    if (!recipe) return;
    const meta = ACTION_CONFIG[action];
    const newStep: Step = {
      id: createId(),
      kind: 'action',
      action,
      durationMin: meta.defaultMin > 0 ? meta.defaultMin : undefined,
    };
    const next = [...recipe.steps];
    const safeIndex = Math.max(0, Math.min(index, next.length));
    next.splice(safeIndex, 0, newStep);
    setSteps(recipe.id, next);
  };

  const moveStepTo = (stepId: string, targetIndex: number) => {
    if (!recipe) return;
    const fromIndex = recipe.steps.findIndex((s) => s.id === stepId);
    if (fromIndex < 0) return;
    const next = [...recipe.steps];
    const [item] = next.splice(fromIndex, 1);
    // After removal, indices > fromIndex shift down by one
    const adjusted = targetIndex > fromIndex ? targetIndex - 1 : targetIndex;
    const safeIndex = Math.max(0, Math.min(adjusted, next.length));
    next.splice(safeIndex, 0, item);
    setSteps(recipe.id, next);
  };

  const computeDropIndex = (absoluteY: number): number => {
    // Convert absolute screen Y -> y within timeline content
    const localY = absoluteY - scrollOriginYRef.current + scrollOffsetYRef.current - timelineLocalYRef.current;
    const order = stepOrderRef.current;
    if (order.length === 0) {
      return 0;
    }
    for (let i = 0; i < order.length; i += 1) {
      const layout = stepLayoutsRef.current.get(order[i]);
      if (!layout) continue;
      const midpoint = layout.y + layout.height / 2;
      if (localY < midpoint) {
        return i;
      }
    }
    return order.length;
  };

  const onDragStart = (kind: ActionKind, x: number, y: number) => {
    setDrag({ kind: 'new', action: kind });
    ghostX.setValue(x);
    ghostY.setValue(y);
    const idx = computeDropIndex(y);
    setDropIndex(idx);
    lastDropIndexRef.current = idx;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  };

  const onStepDragStart = (stepId: string, x: number, y: number) => {
    setDrag({ kind: 'reorder', stepId });
    ghostX.setValue(x);
    ghostY.setValue(y);
    const idx = computeDropIndex(y);
    setDropIndex(idx);
    lastDropIndexRef.current = idx;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
  };

  const onDragMove = (x: number, y: number) => {
    ghostX.setValue(x);
    ghostY.setValue(y);
    const idx = computeDropIndex(y);
    if (idx !== lastDropIndexRef.current) {
      lastDropIndexRef.current = idx;
      setDropIndex(idx);
      Haptics.selectionAsync().catch(() => {});
    }
  };

  const onDragEnd = () => {
    const current = drag;
    const finalIndex = lastDropIndexRef.current;
    setDrag(null);
    setDropIndex(null);
    lastDropIndexRef.current = null;
    if (current && finalIndex != null) {
      if (current.kind === 'new') {
        insertActionAt(current.action, finalIndex);
      } else {
        moveStepTo(current.stepId, finalIndex);
      }
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollOffsetYRef.current = event.nativeEvent.contentOffset.y;
  };

  const editingActionStep: ActionStep | null = useMemo(() => {
    if (!recipe || !editingActionStepId) return null;
    const step = recipe.steps.find((s) => s.id === editingActionStepId);
    return step && step.kind === 'action' ? step : null;
  }, [recipe, editingActionStepId]);

  const saveActionEdits = (patch: Partial<ActionStep>) => {
    if (!recipe || !editingActionStepId) return;
    setSteps(
      recipe.id,
      recipe.steps.map((s) =>
        s.id === editingActionStepId && s.kind === 'action' ? { ...s, ...patch } : s,
      ),
    );
  };

  if (!recipe) {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: palette.background }]}
        edges={['top', 'bottom']}
      >
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <View style={styles.notFound}>
          <Text style={[styles.notFoundText, { color: palette.muted }]}>
            Recipe not found.
          </Text>
          <Pressable
            onPress={() => router.back()}
            style={[styles.backButton, { backgroundColor: palette.panel }]}
          >
            <Text style={[styles.backButtonText, { color: palette.text }]}>
              Go back
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: palette.background }]}
      edges={['top', 'bottom']}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.select({ ios: 'padding', default: undefined })}
      >
        <View style={styles.headerRow}>
          <Pressable
            accessibilityLabel="Back"
            onPress={goBack}
            style={[styles.iconButton, { backgroundColor: palette.panel }]}
          >
            <MaterialIcons color={palette.text} name="arrow-back" size={22} />
          </Pressable>

          <View style={styles.headerTextWrap}>
            <Text style={[styles.headerLabel, { color: palette.muted }]}>Recipe</Text>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          onLayout={(e) => {
            scrollOriginYRef.current = e.nativeEvent.layout.y;
          }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <TextInput
            onBlur={persist}
            onChangeText={setTitle}
            placeholder="Recipe title"
            placeholderTextColor={palette.muted}
            style={[styles.titleInput, { color: palette.text }]}
            value={title}
          />

          <View style={styles.metaRow}>
            <View style={[styles.metaPill, { backgroundColor: palette.panel }]}>
              <MaterialIcons color={palette.muted} name="people" size={16} />
              <Text style={[styles.metaLabel, { color: palette.muted }]}>Serves</Text>
              <TextInput
                keyboardType="number-pad"
                onBlur={persist}
                onChangeText={setServings}
                placeholder="2"
                placeholderTextColor={palette.muted}
                style={[styles.metaInput, { color: palette.text }]}
                value={servings}
              />
            </View>
          </View>

          <Timeline
            steps={recipe.steps}
            palette={palette}
            dropIndex={dropIndex}
            draggingStepId={drag?.kind === 'reorder' ? drag.stepId : null}
            onEditIngredient={openEditIngredient}
            onEditAction={(stepId) => setEditingActionStepId(stepId)}
            onDeleteStep={deleteStep}
            onAddIngredient={openAddIngredient}
            onContainerLayout={(y) => {
              timelineLocalYRef.current = y;
            }}
            onStepLayout={(stepId, y, height) => {
              stepLayoutsRef.current.set(stepId, { y, height });
            }}
            onStepDragStart={onStepDragStart}
            onStepDragMove={onDragMove}
            onStepDragEnd={onDragEnd}
          />
        </ScrollView>

        <ActionPalette
          palette={palette}
          onTap={appendAction}
          onDragStart={onDragStart}
          onDragMove={onDragMove}
          onDragEnd={onDragEnd}
        />

        {drag ? (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.ghost,
              {
                backgroundColor: palette.accent,
                transform: [
                  { translateX: Animated.subtract(ghostX, new Animated.Value(40)) },
                  { translateY: Animated.subtract(ghostY, new Animated.Value(40)) },
                ],
              },
            ]}
          >
            {drag.kind === 'new' ? (
              <>
                <MaterialIcons
                  color="#fff"
                  name={ACTION_CONFIG[drag.action].icon}
                  size={20}
                />
                <Text style={styles.ghostLabel}>{ACTION_CONFIG[drag.action].label}</Text>
              </>
            ) : (
              (() => {
                const step = recipe.steps.find((s) => s.id === drag.stepId);
                if (!step) return null;
                if (step.kind === 'ingredient') {
                  return (
                    <>
                      <MaterialIcons color="#fff" name="label" size={20} />
                      <Text style={styles.ghostLabel} numberOfLines={1}>
                        {step.ingredient.name}
                      </Text>
                    </>
                  );
                }
                return (
                  <>
                    <MaterialIcons
                      color="#fff"
                      name={ACTION_CONFIG[step.action].icon}
                      size={20}
                    />
                    <Text style={styles.ghostLabel}>
                      {ACTION_CONFIG[step.action].label}
                    </Text>
                  </>
                );
              })()
            )}
          </Animated.View>
        ) : null}

        <IngredientForm
          visible={ingredientFormOpen}
          palette={palette}
          initial={editingIngredient}
          onClose={closeIngredientForm}
          onSubmit={submitIngredient}
        />

        <ActionEditSheet
          visible={!!editingActionStepId}
          palette={palette}
          step={editingActionStep}
          onClose={() => setEditingActionStepId(null)}
          onSave={saveActionEdits}
          onDelete={() => editingActionStepId && deleteStep(editingActionStepId)}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
