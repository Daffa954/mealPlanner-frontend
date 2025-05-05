import { Link } from "react-router-dom";
import { ChildrenResponse } from "../models/Recip";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ChildCardProps {
  child: ChildrenResponse;
}

export const ChildCard = ({ child }: ChildCardProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 w-[300px] h-[310px] border-2 border-gray-300 relative">
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

      <button
        onClick={() => setShowDatePicker(true)}
        className="bg-[#7B5E3C] text-white px-4 py-2 rounded-md mt-4"
      >
        Buat Jadwal Tanggal
      </button>

      {showDatePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-8">
          <div className="bg-white rounded-lg p-6 md:w-[30%] w-full"> {/* Lebar diperbesar */}
            <div className="flex justify-between items-center mb-4 ">
              <h3 className="text-xl font-semibold">
                Pilih Tanggal untuk {child.name}
              </h3>
              <button
                onClick={() => setShowDatePicker(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
        <div className="w-full flex justify-center">
        <DatePicker
              selected={selectedDate}
              onChange={(date) => date && setSelectedDate(date)}
              inline
              minDate={new Date()}
              calendarClassName=""
            />
        </div>


            <div className="mt-4 flex justify-between gap-2">
              <button
                onClick={() => setShowDatePicker(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Batal
              </button>
              <Link
                to={`/askAi/${child.id}?date=${selectedDate?.toISOString()}`}
              >
                <button
                  onClick={() => {
                    setShowDatePicker(false);
                    console.log("Tanggal dipilih:", selectedDate);
                  }}
                  className="bg-[#7B5E3C] text-white px-4 py-2 rounded-md"
                >
                  buat jadwal tanggal
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
