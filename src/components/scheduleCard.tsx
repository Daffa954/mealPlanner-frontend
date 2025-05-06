// MealScheduleCard.tsx
import { useState } from "react";
import { Schedule, RecipeMealPlan } from "../models/Recip";

interface MealScheduleCardProps {
  schedule: Schedule;
}

const MealScheduleCard = ({ schedule }: MealScheduleCardProps) => {
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeMealPlan | null>(
    null
  );

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    return `${hour % 12 === 0 ? 12 : hour % 12}:${minutes} ${
      hour >= 12 ? "PM" : "AM"
    }`;
  };

  const getMealTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "sarapan":
        return "bg-green-100 text-green-800";
      case "makan siang":
        return "bg-blue-100 text-blue-800";
      case "makan malam":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full bg-white border-2 border-solid-black rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {schedule.child.name}'s Meal Plan
          </h2>
          
        </div>
      </div>

      <div>
        {schedule.recipes.map((recipePlan) => (
          <div
            key={recipePlan.mealPlanId}
            className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-[#4BA095] transition-all group w-full"
            onClick={() => setSelectedRecipe(recipePlan)}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-800 group-hover:text-[#4BA095] line-clamp-2">
                  {recipePlan.recipe.name}
                </h3>
                <span
                  className={`${getMealTypeColor(
                    recipePlan.type
                  )} text-xs font-medium px-2 py-1 rounded-full ml-2`}
                >
                  {recipePlan.type}
                </span>
              </div>

              <div className="mt-2 flex items-center text-sm text-gray-500">
                <span className="mr-2">⏰ {formatTime(recipePlan.time)}</span>
                <span className="mx-2">•</span>
                <span>🍴 {recipePlan.recipe.portion} porsi</span>
              </div>

              <p className="text-sm text-gray-600 mt-2 line-clamp-3 flex-grow">
                {recipePlan.recipe.description}
              </p>

              <div className="mt-3 flex items-center text-sm text-gray-500">
                <span className="inline-flex items-center mr-4">
                  ⏳ {recipePlan.recipe.time} menit
                </span>
                <span className="inline-flex items-center">
                  ⚖️ {recipePlan.recipe.weight}g
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800 pr-4">
                  {selectedRecipe.recipe.name}
                </h2>
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-4">
                <span className="mr-3 bg-[#4BA095]/10 text-[#4BA095] px-2 py-1 rounded-full">
                  {selectedRecipe.type}
                </span>
                <span>🕒 {formatTime(selectedRecipe.time)}</span>
                <span className="mx-2">•</span>
                <span>⏳ {selectedRecipe.recipe.time} menit</span>
                <span className="mx-2">•</span>
                <span>🍴 {selectedRecipe.recipe.portion} porsi</span>
              </div>

              <p className="text-gray-700 mb-6">
                {selectedRecipe.recipe.description}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3 text-[#4BA095]">
                    Bahan-bahan
                  </h3>
                  <ul className="space-y-2">
                    {selectedRecipe.recipe.ingredients.map(
                      (ingredient, index) => (
                        <li
                          key={index}
                          className="flex items-start text-gray-700"
                        >
                          <span className="text-[#4BA095] mr-2 mt-1">•</span>
                          {ingredient}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3 text-[#4BA095]">
                    Cara Membuat
                  </h3>
                  <ol className="space-y-3">
                    {selectedRecipe.recipe.step.map((step, index) => (
                      <li
                        key={index}
                        className="flex items-start text-gray-700"
                      >
                        <span className="font-medium text-[#4BA095] mr-2">
                          {index + 1}.
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 text-[#4BA095]">
                  Informasi Gizi
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#4BA095]/10 rounded-full flex items-center justify-center mr-3">
                      🔥
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Kalori</p>
                      <p className="font-medium">
                        {selectedRecipe.recipe.nutrition.calories} kcal
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#4BA095]/10 rounded-full flex items-center justify-center mr-3">
                      🍚
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Karbohidrat</p>
                      <p className="font-medium">
                        {selectedRecipe.recipe.nutrition.carb}g
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#4BA095]/10 rounded-full flex items-center justify-center mr-3">
                      🥩
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Protein</p>
                      <p className="font-medium">
                        {selectedRecipe.recipe.nutrition.protein}g
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#4BA095]/10 rounded-full flex items-center justify-center mr-3">
                      🥑
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Lemak Total</p>
                      <p className="font-medium">
                        {selectedRecipe.recipe.nutrition.totalFat}g
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealScheduleCard;
