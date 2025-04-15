

export interface NutritionInfo {
    calories: number;
    carbohydrate: number;
    protein: number;
    total_fat: number;
    saturated_fat: number;
  }
  
  export interface RecipeResponse {
    namaMakanan: string;
    bahan: string[];
    Langkah: string[];
    waktu: number;
    porsi: number;
    beratgram: number;
    nutrisi: NutritionInfo; // Tambahkan ini
  
  }