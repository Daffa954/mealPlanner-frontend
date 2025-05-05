import { Link } from "react-router-dom";
import { ChildrenResponse } from "../models/Recip";

interface ChildCardProps {
  child: ChildrenResponse;
}

export const ChildCard = ({ child }: ChildCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 w-[300px] h-[310px] border-2 border-gray-300">
      <div className="mb-4 border-b pb-2">
        <h2 className="text-xl font-bold text-gray-800">{child.name}</h2>
        <p className="text-gray-600">Usia: {child.age} tahun</p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-gray-700 mb-2">Preferensi:</h3>
        <div className="space-y-2">
          <div>
            <span className="font-medium text-gray-600">Alergi: </span>
            {child.preference.allergens.length > 0 ? (
              <span className="text-gray-500">
                {child.preference.allergens.join(", ")}
              </span>
            ) : (
              <span className="text-gray-400">Tidak ada alergi</span>
            )}
          </div>

          <div>
            <span className="font-medium text-gray-600">Makanan favorit: </span>
            {child.preference.favoriteFoods.length > 0 ? (
              <span className="text-gray-500">
                {child.preference.favoriteFoods.join(", ")}
              </span>
            ) : (
              <span className="text-gray-400">Belum ada makanan favorit</span>
            )}
          </div>

          <div>
            <span className="font-medium text-gray-600">Lokasi: </span>
            <span className="text-gray-500">{child.preference.lokasi}</span>
          </div>
        </div>
      </div>
      <Link to={`/askAi/${child.id}`}>
        <button className="bg-[#7B5E3C] text-white px-4 py-2 rounded-md mt-4">
          buat jadwal
        </button>
      </Link>
    </div>
  );
};
