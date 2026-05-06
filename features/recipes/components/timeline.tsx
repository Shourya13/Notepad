import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, Text, View } from 'react-native';

import { UiPalette } from '@/lib/themes';
import { ACTION_CONFIG } from '../action-config';
import { Step } from '../types';

import { StepDragHandle } from './step-drag-handle';
import { timelineStyles as styles } from './timeline.styles';

type Props = {
  steps: Step[];
  palette: UiPalette;
  dropIndex: number | null;
  draggingStepId: string | null;
  onEditIngredient: (stepId: string) => void;
  onEditAction: (stepId: string) => void;
  onDeleteStep: (stepId: string) => void;
  onAddIngredient: () => void;
  onAddAction: () => void;
  /**
   * Receives a ref to the inner View whose top is the y=0 origin used by
   * `onStepLayout` measurements. The parent uses this to convert absolute
   * pointer coordinates into list-local coordinates via measureInWindow.
   */
  registerListRef: (node: View | null) => void;
  onListLayout: () => void;
  onStepLayout: (stepId: string, y: number, height: number) => void;
  onStepDragStart: (stepId: string, x: number, y: number) => void;
  onStepDragMove: (x: number, y: number) => void;
  onStepDragEnd: () => void;
};

const formatIngredient = (
  step: Extract<Step, { kind: 'ingredient' }>,
): string => {
  const { ingredient } = step;
  const parts: string[] = [];
  if (ingredient.quantity != null) {
    parts.push(String(ingredient.quantity));
  }
  if (ingredient.unit) {
    parts.push(ingredient.unit);
  }
  parts.push(ingredient.name);
  let line = parts.join(' ');
  if (ingredient.prep) {
    line += `, ${ingredient.prep}`;
  }
  return line;
};

export function Timeline({
  steps,
  palette,
  dropIndex,
  draggingStepId,
  onEditIngredient,
  onEditAction,
  onDeleteStep,
  onAddIngredient,
  onAddAction,
  registerListRef,
  onListLayout,
  onStepLayout,
  onStepDragStart,
  onStepDragMove,
  onStepDragEnd,
}: Props) {
  const isEmpty = steps.length === 0;

  return (
    <View style={styles.container}>
      {isEmpty ? (
        <Pressable
          ref={registerListRef as any}
          onLayout={onListLayout}
          onPress={onAddAction}
          style={[styles.emptyState, { backgroundColor: palette.panel }]}
        >
          <MaterialIcons color={palette.muted} name="timeline" size={26} />
          <Text style={[styles.emptyTitle, { color: palette.text }]}>
            Empty timeline
          </Text>
          <Text style={[styles.emptyText, { color: palette.muted }]}>
            Tap to add your first action, or add an ingredient below.
          </Text>
          {dropIndex === 0 ? (
            <View style={[styles.dropIndicator, { backgroundColor: palette.accent }]} />
          ) : null}
        </Pressable>
      ) : (
        <View
          ref={registerListRef}
          onLayout={onListLayout}
          style={styles.stepList}
        >
          {dropIndex === 0 ? (
            <View style={[styles.dropIndicator, { backgroundColor: palette.accent }]} />
          ) : null}

          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            const isBeingDragged = step.id === draggingStepId;
            return (
              <View key={step.id}>
                <View
                  onLayout={(e) =>
                    onStepLayout(step.id, e.nativeEvent.layout.y, e.nativeEvent.layout.height)
                  }
                  style={[styles.stepRow, isBeingDragged ? styles.draggingRow : null]}
                >
                  <View style={styles.gutter}>
                    <View
                      style={[
                        styles.dot,
                        {
                          backgroundColor:
                            step.kind === 'ingredient' ? palette.accent : palette.success,
                        },
                      ]}
                    />
                    {!isLast ? (
                      <View
                        style={[
                          styles.connector,
                          { backgroundColor: palette.border },
                        ]}
                      />
                    ) : null}
                  </View>

                  {step.kind === 'ingredient' ? (
                    <Pressable
                      onPress={() => onEditIngredient(step.id)}
                      style={[styles.ingredientPill, { backgroundColor: palette.panel }]}
                    >
                      <Text
                        style={[styles.ingredientText, { color: palette.text }]}
                        numberOfLines={2}
                      >
                        {formatIngredient(step)}
                      </Text>
                      <Pressable
                        hitSlop={8}
                        onPress={() => onDeleteStep(step.id)}
                        style={styles.deleteHit}
                      >
                        <MaterialIcons color={palette.muted} name="close" size={20} />
                      </Pressable>
                      <StepDragHandle
                        stepId={step.id}
                        palette={palette}
                        onDragStart={onStepDragStart}
                        onDragMove={onStepDragMove}
                        onDragEnd={onStepDragEnd}
                      />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => onEditAction(step.id)}
                      style={[styles.actionCard, { backgroundColor: palette.panel }]}
                    >
                      <View style={styles.actionContent}>
                        <View style={styles.actionHeader}>
                          <MaterialIcons
                            color={palette.success}
                            name={ACTION_CONFIG[step.action].icon}
                            size={18}
                          />
                          <Text style={[styles.actionTitle, { color: palette.text }]}>
                            {ACTION_CONFIG[step.action].label}
                          </Text>
                          {step.durationMin != null ? (
                            <Text style={[styles.actionMeta, { color: palette.muted }]}>
                              · {step.durationMin} min
                            </Text>
                          ) : null}
                          {step.tempC != null ? (
                            <Text style={[styles.actionMeta, { color: palette.muted }]}>
                              · {step.tempC}°C
                            </Text>
                          ) : null}
                        </View>
                        {step.note ? (
                          <Text style={[styles.actionNote, { color: palette.muted }]}>
                            {step.note}
                          </Text>
                        ) : null}
                      </View>
                      <View style={styles.actionRight}>
                        <Pressable
                          hitSlop={8}
                          onPress={() => onDeleteStep(step.id)}
                          style={styles.deleteHit}
                        >
                          <MaterialIcons color={palette.muted} name="close" size={20} />
                        </Pressable>
                        <StepDragHandle
                          stepId={step.id}
                          palette={palette}
                          onDragStart={onStepDragStart}
                          onDragMove={onStepDragMove}
                          onDragEnd={onStepDragEnd}
                        />
                      </View>
                    </Pressable>
                  )}
                </View>

                {dropIndex === index + 1 ? (
                  <View style={[styles.dropIndicator, { backgroundColor: palette.accent }]} />
                ) : null}
              </View>
            );
          })}
        </View>
      )}

      <View style={styles.ctaRow}>
        <Pressable
          onPress={onAddIngredient}
          style={[styles.ctaButton, styles.ctaSecondary, { backgroundColor: palette.panel, borderColor: palette.border }]}
        >
          <MaterialIcons color={palette.text} name="label" size={18} />
          <Text style={[styles.ctaText, { color: palette.text }]}>
            Ingredient
          </Text>
        </Pressable>
        <Pressable
          onPress={onAddAction}
          style={[styles.ctaButton, styles.ctaPrimary, { backgroundColor: palette.accent }]}
        >
          <MaterialIcons color="#fff" name="playlist-add" size={18} />
          <Text style={[styles.ctaText, { color: '#fff' }]}>
            Add action
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
