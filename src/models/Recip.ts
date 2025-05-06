export interface NutritionInfo {
  calories: number;
  carbohydrate: number;
  protein: number;
  total_fat: number;
  saturated_fat: number;
}

export interface RecipeResponse {
  name: string;
  description: string;
  ingredients: string[];
  step: string[];
  time: number;
  portion: number;
  weight: number;
  nutrition: NutritionInfo;
}
interface Preference {
  allergens: string[];
  favoriteFoods: string[];
  lokasi: string;
}
export interface ChildrenResponse {
  id: number;
  name: string;
  age: number;
  preference: Preference;
}

export interface RecipeCreate {
  recipeId: number;
  type: string;
  time: string;
}

export interface CreateScheduleRequest {
  childId: number;
  date: string;
  recipes: [RecipeCreate];
}

export interface AddChildrenRequest {
  name: string;
  age: number;
  preference: string[];
  allergen: string[];
  lokasi: string;
}


// types.ts
export interface Nutrition {
  id: number;
  recipeId: number;
  calories: number;
  carb: number;
  protein: number;
  totalFat: number;
  saturatedFat: number;
}

export interface Recipe {
  id: number;
  name: string;
  description: string;
  step: string[];
  time: number;
  portion: number;
  weight: number;
  ingredients: string[];
  nutrition: Nutrition;
}

export interface RecipeMealPlan {
  mealPlanId: number;
  recipeId: number;
  status: string;
  type: string;
  time: string;
  recipe: Recipe;
}

export interface Child {
  id: number;
  name: string;
  age: number;
  userId: number;
}

export interface Schedule {
  id: number;
  date: string;
  childId: number;
  child: Child;
  recipes: RecipeMealPlan[];
}
export interface GroupedSchedule {
  child: Child;
  schedules: Schedule[];
}