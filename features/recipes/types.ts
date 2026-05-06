export type RecipeId = string;
export type StepId = string;

export type Unit =
  | 'g'
  | 'kg'
  | 'ml'
  | 'l'
  | 'tsp'
  | 'tbsp'
  | 'cup'
  | 'piece'
  | 'pinch';

export const UNITS: Unit[] = [
  'g',
  'kg',
  'ml',
  'l',
  'tsp',
  'tbsp',
  'cup',
  'piece',
  'pinch',
];

export type Ingredient = {
  id: string;
  name: string;
  quantity?: number;
  unit?: Unit;
  prep?: string;
};

export type ActionKind =
  | 'saute'
  | 'fry'
  | 'boil'
  | 'bake'
  | 'simmer'
  | 'roast'
  | 'mix'
  | 'chop'
  | 'rest'
  | 'marinate'
  | 'serve';

export type IngredientStep = {
  id: StepId;
  kind: 'ingredient';
  ingredient: Ingredient;
};

export type ActionStep = {
  id: StepId;
  kind: 'action';
  action: ActionKind;
  durationMin?: number;
  tempC?: number;
  note?: string;
  usesIngredientIds?: string[];
};

export type Step = IngredientStep | ActionStep;

export type Recipe = {
  id: RecipeId;
  title: string;
  servings?: number;
  createdAt: string;
  updatedAt: string;
  steps: Step[];
};
