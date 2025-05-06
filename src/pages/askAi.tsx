// src/components/AskAIForm.tsx
import React, { useEffect, useState } from "react";
import {
  askAIAPI,
  FormData,
  getChildren,
  getUserProfile,
} from "../apis/apiService";
import { ChildrenResponse, RecipeResponse } from "../models/Recip";
import Loading from "../components/loading";
import { useParams, useSearchParams } from "react-router-dom";

import { NavbarUser } from "../components/navbar_user";
import { RecipeCard } from "../components/recipe_card";

export const AskAI: React.FC = () => {
  const { childId } = useParams<{ childId: string }>();
  const [searchParams] = useSearchParams();
  const date = searchParams.get("date");

  const email = sessionStorage.getItem("email");
  const [name, setName] = useState("");
  const [credit, setCredit] = useState(0);
  const [time, setTime] = useState("");
  const [childrenData, setChildrenData] = useState<ChildrenResponse | null>(
    null
  );
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  useEffect(() => {
    if (childrenData) {
      setFormData((prev) => ({
        ...prev,
        usia: childrenData.age.toString(),
        lokasi: {
          kota: childrenData.preference?.lokasi || "",
          provinsi: "",
        },
        alergen: childrenData.preference?.allergens || [],
      }));
    }
  }, [childrenData]);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    usia: "",
    lokasi: { kota: "", provinsi: "" },
    alergen: [""],
    bahanTersedia: [""],
    tipe: "",
  });
  const token = sessionStorage.getItem("token");
  const [recipeResponse, setRecipeResponse] = useState<RecipeResponse>({
    name: "",
    description: "",
    ingredients: [],
    step: [],
    time: 0,
    portion: 0,
    weight: 0,
    nutrition: {
      calories: 0,
      protein: 0,
      carbohydrate: 0,
      total_fat: 0,
      saturated_fat: 0,
    },
  });

  const getProfile = async () => {
    try {
      const response = await getUserProfile(token ? token : "");
      if (response.status == 200) {
        setName(response.data.data.name);
        setCredit(response.data.data.credit);
      }
    } catch {
      console.log("Login failed. Please check your email and password.");
    }
  };
  const getChildrenApi = async () => {
    if (!childId) {
      console.log("Child ID belum tersedia");
      return;
    }
    try {
      const response = await getChildren(
        token ? token : "",
        childId ? childId : ""
      );
      if (response.status == 200) {
        setChildrenData(response.data.data);
      }
    } catch {
      console.log("FAILED TO GET DATA");
    }
  };
  // Gunakan childId untuk fetch data atau operasi lainnya
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("lokasi.")) {
      const key = name.split(".")[1] as keyof typeof formData.lokasi;
      setFormData((prev) => ({
        ...prev,
        lokasi: {
          ...prev.lokasi,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleArrayChange = (
    field: "alergen" | "bahanTersedia",
    index: number,
    value: string
  ) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      [field]: updatedArray,
    }));
  };

  const addArrayItem = (field: "alergen" | "bahanTersedia") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await askAIAPI(formData, token ? token : "");
      if (response.status == 200) {
        setRecipeResponse(response.data.recipeData);
        setShowRecipeModal(true); // Tampilkan modal
      }
    } catch (error) {
      alert("Gagal submit. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchInitialData = async () => {
      if (token && email && childId && isMounted) {
        await getProfile();
        await getChildrenApi();
      }
    };

    fetchInitialData();

    return () => {
      isMounted = false;
    };
  }, [token, email, childId]);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <NavbarUser
        name={name}
        credit={credit.toString()} // Convert number ke string
      />

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 pt-11">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="md:w-[60%] w-full mx-auto p-4 sm:p-6 bg-[#FFF6E6] border border-[#D6C5AF] rounded-xl shadow-md"
        >
          <h2 className="md:text-3xl text-xl font-semibold mb-4 text-[#7B5E3C]">
            Buat Resep Untuk {childrenData?.name}
          </h2>

          <div className="space-y-4">
            <label className="hidden text-gray-700">
              Usia:
              <input
                type="number"
                name="usia"
                value={formData.usia}
                onChange={handleChange}
                className="w-full border border-[#D6C5AF] p-2 rounded mt-1 bg-white text-sm sm:text-base"
              />
            </label>

            <label className="block text-gray-700">
              Kota:
              <input
                type="text"
                name="lokasi.kota"
                value={formData.lokasi.kota}
                onChange={handleChange}
                className="w-full border border-[#D6C5AF] p-2 rounded mt-1 bg-white text-sm sm:text-base"
              />
            </label>

            <label className="hidden text-gray-700">
              Provinsi:
              <input
                type="text"
                name="lokasi.provinsi"
                value={formData.lokasi.provinsi}
                onChange={handleChange}
                className="w-full border border-[#D6C5AF] p-2 rounded mt-1 bg-white text-sm sm:text-base"
              />
            </label>

            <div className="text-gray-700">
              <label>Alergen:</label>
              {formData.alergen.map((item, index) => (
                <input
                  key={index}
                  type="text"
                  value={item}
                  onChange={(e) =>
                    handleArrayChange("alergen", index, e.target.value)
                  }
                  className="w-full border border-[#D6C5AF] p-2 rounded mt-1 bg-white text-sm sm:text-base"
                />
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("alergen")}
                className="text-[#4BA095] mt-1 text-xs sm:text-sm"
              >
                + Tambah Alergen
              </button>
            </div>

            <div className="text-gray-700">
              <label>Bahan Yang Anda Miliki Saat Ini:</label>
              {formData.bahanTersedia.map((item, index) => (
                <input
                  key={index}
                  type="text"
                  value={item}
                  onChange={(e) =>
                    handleArrayChange("bahanTersedia", index, e.target.value)
                  }
                  className="w-full border border-[#D6C5AF] p-2 rounded mt-1 bg-white text-sm sm:text-base"
                />
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("bahanTersedia")}
                className="text-[#4BA095] mt-1 text-xs sm:text-sm"
              >
                + Tambah Bahan
              </button>
            </div>

            <label className="block text-gray-700">
              Tipe:
              <select
                name="tipe"
                value={formData.tipe}
                onChange={handleChange}
                className="w-full border border-[#D6C5AF] p-2 rounded mt-1 bg-white text-sm sm:text-base"
              >
                <option value="">-- Pilih Tipe --</option>
                <option value="sarapan">Sarapan</option>
                <option value="makan siang">Makan Siang</option>
                <option value="makan malam">Makan Malam</option>
              </select>
            </label>
            <div>
          <label className=" text-gray-700">
            Jam:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-[#D6C5AF] p-2 rounded mt-1 bg-white text-sm sm:text-base"
            />
          </label>
            </div>
          </div>
         
          <button
            type="submit"
            className="w-full bg-[#7B5E3C] text-white px-4 py-2 mt-6 rounded-md hover:bg-[#63492c] text-sm sm:text-base"
          >
            Buat Resep
          </button>
        </form>

        {/* Loading Indicator */}
        <div className="w-full p-4 sm:p-6 flex justify-center items-center">
          {isLoading && <Loading />}
        </div>

        {/* Response */}
        {showRecipeModal && (
          <RecipeCard
            recipe={recipeResponse}
            onClose={() => setShowRecipeModal(false)}
            time= {time}
            type = {formData.tipe}
          />
        )}
      </main>
    </div>
  );
};
