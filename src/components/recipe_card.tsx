import { useParams, useSearchParams } from "react-router-dom";
import { createRecipe, createSchedule } from "../apis/apiService";
import { RecipeResponse } from "../models/Recip";
import { useState } from "react";

interface ChildCardProps {
  recipe: RecipeResponse;
  onClose: () => void;
  time: string;
  type: string;
}

export const RecipeCard = ({ recipe, onClose, time, type }: ChildCardProps) => {
  const { childId } = useParams<{ childId: string }>();
  const [searchParams] = useSearchParams();
  const [recipeId, setRecipeId] = useState(0);
  const date = searchParams.get("date");

  const addSchedule = async () => {
    try {
      const token = sessionStorage.getItem("token");

      let finalRecipeId = recipeId;

      // Kalau resep belum ditambahkan ➔ tambahkan dulu
      if (finalRecipeId === 0) {
        const recipeResponse = await createRecipe(token ? token : "", recipe);
        if (recipeResponse.status == 201) {
          console.log("Recipe added to database successfully");
          finalRecipeId = recipeResponse.data.addRecipe.id;
          setRecipeId(finalRecipeId);
        } else {
          console.error("Failed to add recipe to database");
          return;
        }
      }

      // Lanjut buat jadwal
      const scheduleResponse = await createSchedule(token ? token : "", {
        childId: parseInt(childId ? childId : "0"),
        date: date ? date : "",
        recipes: [
          {
            recipeId: finalRecipeId,
            type: type,
            time: time,
          },
        ],
      });

      if (scheduleResponse.status == 201) {
        console.log("Schedule added successfully");
        alert("Jadwal berhasil ditambahkan!");
        onClose();
      } else {
        console.error("Failed to add schedule");
      }
    } catch (error) {
      console.error("Error adding schedule:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="red"
            viewBox="0 0 24 24"
            stroke="red"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-4 text-[#7B5E3C]">
            Hasil Rekomendasi Makanan
            {childId ? ` untuk ${childId}` : ""}
            {date ? ` pada ${date}` : ""}
            {" (ID: " + (recipeId !== 0 ? recipeId : "Belum ditambahkan") + ")"}
          </h3>

          <div className="space-y-2">
            <p>
              <strong className="text-gray-700">Nama Makanan:</strong>{" "}
              {recipe.name}
            </p>
            <p>
              <strong className="text-gray-700">Waktu Masak:</strong>{" "}
              {recipe.time} menit
            </p>
            <p>
              <strong className="text-gray-700">Porsi:</strong> {recipe.portion}
            </p>
            <p>
              <strong className="text-gray-700">Berat:</strong> {recipe.weight}{" "}
              gram
            </p>
          </div>

          <div className="mt-4">
            <strong className="text-gray-700">Bahan:</strong>
            <ul className="list-disc ml-5 mt-1">
              {recipe.ingredients.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <strong className="text-gray-700">Langkah:</strong>
            <ul className="list-disc ml-5 mt-1">
              {recipe.step.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <strong className="text-gray-700">Nutrisi:</strong>
            <ul className="list-disc ml-5 mt-1">
              <li>Kalori: {recipe.nutrition.calories} kcal</li>
              <li>Karbohidrat: {recipe.nutrition.carbohydrate} g</li>
              <li>Protein: {recipe.nutrition.protein} g</li>
              <li>Lemak Total: {recipe.nutrition.total_fat} g</li>
              <li>Lemak Jenuh: {recipe.nutrition.saturated_fat} g</li>
            </ul>
          </div>

          <div className="flex w-full">
            <button
              className="bg-[#7B5E3C] text-white px-4 py-2 rounded-md mt-4 ml-auto"
              onClick={addSchedule}
            >
              Tambah Resep & Buat Jadwal
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};
