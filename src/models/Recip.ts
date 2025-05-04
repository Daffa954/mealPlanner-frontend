

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
    steps: string[];
    time: number;
    portion: number;
    weight: number;
    nutrition: NutritionInfo;
  
  }