

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
interface Preference {
  allergens: string[];
  favoriteFoods: string[];
  lokasi: string;
}
  export interface ChildrenResponse {
    id : number;
    name: string;
    age: number;
   preference : Preference;
  };
  

