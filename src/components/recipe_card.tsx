import { RecipeResponse } from "../models/Recip";

interface ChildCardProps {
  recipe: RecipeResponse;
}

export const RecipeCard = ({ recipe }: ChildCardProps) => {
  return (
    <>
      <div className="md:w-[60%] w-full mx-auto mt-6 sm:mt-8 p-4 sm:p-6 bg-[#FFF6E6] border border-[#D6C5AF] rounded-xl shadow-md">
        <h3 className="text-md sm:text-lg font-bold mb-2 text-[#7B5E3C]">
          Hasil Rekomendasi Makanan
        </h3>

        <div className="space-y-2 text-sm sm:text-base">
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

        <div className="mt-4 text-sm sm:text-base">
          <strong className="text-gray-700">Bahan:</strong>
          <ul className="list-disc ml-5 mt-1">
            {recipe.ingredients.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 text-sm sm:text-base">
          <strong className="text-gray-700">Langkah:</strong>
          <ul className="list-disc ml-5 mt-1">
            {recipe.steps.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 text-sm sm:text-base">
          <strong className="text-gray-700">Nutrisi:</strong>
          <ul className="list-disc ml-5 mt-1">
            <li>Kalori: {recipe.nutrition.calories} kcal</li>
            <li>Karbohidrat: {recipe.nutrition.carbohydrate} g</li>
            <li>Protein: {recipe.nutrition.protein} g</li>
            <li>Lemak Total: {recipe.nutrition.total_fat} g</li>
            <li>Lemak Jenuh: {recipe.nutrition.saturated_fat} g</li>
          </ul>
        </div>
      </div>
    </>
  );
};
