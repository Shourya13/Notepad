import { ScrollView, Text, View } from 'react-native';

import { entityListStyles as styles } from '@/features/notepad/components/entity-list.styles';
import { SwipeableCard } from '@/features/notepad/components/swipeable-card';
import { formatTime } from '@/features/notepad/utils';
import { UiPalette } from '@/lib/themes';
import { Recipe } from '../types';

type Props = {
  recipes: Recipe[];
  isHydrated: boolean;
  palette: UiPalette;
  onOpen: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
};

const buildSubtitle = (recipe: Recipe) => {
  const ingredientCount = recipe.steps.filter((s) => s.kind === 'ingredient').length;
  const actionCount = recipe.steps.filter((s) => s.kind === 'action').length;
  const totalMin = recipe.steps.reduce(
    (sum, s) => (s.kind === 'action' ? sum + (s.durationMin ?? 0) : sum),
    0,
  );
  const parts: string[] = [];
  if (ingredientCount) parts.push(`${ingredientCount} ingredient${ingredientCount === 1 ? '' : 's'}`);
  if (actionCount) parts.push(`${actionCount} step${actionCount === 1 ? '' : 's'}`);
  if (totalMin) parts.push(`${totalMin} min`);
  return parts.length ? parts.join(' · ') : 'Empty recipe';
};

export function RecipeList({ recipes, isHydrated, palette, onOpen, onDelete }: Props) {
  return (
    <View style={styles.listArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {!isHydrated && (
          <View style={[styles.emptyState, { backgroundColor: palette.panel }]}>
            <Text style={[styles.emptyText, { color: palette.muted }]}>
              Loading saved data...
            </Text>
          </View>
        )}

        {isHydrated && recipes.length === 0 && (
          <View style={[styles.emptyState, { backgroundColor: palette.panel }]}>
            <Text style={[styles.emptyText, { color: palette.muted }]}>
              No recipes yet. Tap + to start cooking.
            </Text>
          </View>
        )}

        {isHydrated &&
          recipes.map((recipe) => (
            <SwipeableCard
              key={recipe.id}
              id={recipe.id}
              icon="restaurant-menu"
              iconColor={palette.accent}
              title={recipe.title || 'Untitled Recipe'}
              subtitle={buildSubtitle(recipe)}
              timestamp={formatTime(recipe.updatedAt)}
              palette={palette}
              onPress={() => onOpen(recipe)}
              onLeftSwipe={() => onDelete(recipe.id)}
              showDoneAction={false}
            />
          ))}
      </ScrollView>
    </View>
  );
}
