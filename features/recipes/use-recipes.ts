import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';

import { AppStore } from '@/features/notepad/types';
import { createId, nowIso } from '@/features/notepad/utils';
import { Recipe, Step } from './types';

export function useRecipes(
  store: AppStore,
  setStore: Dispatch<SetStateAction<AppStore>>,
) {
  const recipes = useMemo(
    () =>
      [...store.recipes].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    [store.recipes],
  );

  const getRecipe = useCallback(
    (id: string) => store.recipes.find((r) => r.id === id) ?? null,
    [store.recipes],
  );

  const createRecipe = useCallback((): Recipe => {
    const recipe: Recipe = {
      id: createId(),
      title: '',
      servings: 2,
      createdAt: nowIso(),
      updatedAt: nowIso(),
      steps: [],
    };
    setStore((prev) => ({ ...prev, recipes: [recipe, ...prev.recipes] }));
    return recipe;
  }, [setStore]);

  const updateRecipe = useCallback(
    (id: string, patch: Partial<Omit<Recipe, 'id' | 'createdAt'>>) => {
      setStore((prev) => ({
        ...prev,
        recipes: prev.recipes.map((r) =>
          r.id === id ? { ...r, ...patch, updatedAt: nowIso() } : r,
        ),
      }));
    },
    [setStore],
  );

  const deleteRecipe = useCallback(
    (id: string) => {
      setStore((prev) => ({
        ...prev,
        recipes: prev.recipes.filter((r) => r.id !== id),
      }));
    },
    [setStore],
  );

  const setSteps = useCallback(
    (id: string, steps: Step[]) => updateRecipe(id, { steps }),
    [updateRecipe],
  );

  return {
    recipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    setSteps,
  };
}
