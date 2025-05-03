// src/components/AskAIForm.tsx
import React, {  useState } from "react";
import { askAIAPI, FormData } from "../apis/apiService";
import { RecipeResponse } from "../models/Recip";
import Loading from "../components/loading";
import Logo from "../assets/logo-nobg.png";

export const AskAI: React.FC = () => {
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
    namaMakanan: "",
    bahan: [""],
    Langkah: [""],
    waktu: 0,
    porsi: 0,
    beratgram: 0,
    nutrisi: {
      calories: 0,
      carbohydrate: 0,
      protein: 0,
      total_fat: 0,
      saturated_fat: 0,
    },
  });

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
    console.log(isLoading)
    try {
      const response = await askAIAPI(formData, token ? token : "");
     
      if (response.status == 200) {
        console.log("Response:", response);
        setRecipeResponse(response.data.recipeData); // ⬅️ Set state agar tampil

        console.log(response.data.recipeData);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Gagal submit:", error);
    }
  };

  {/*Responsive by DeepSeek*/}
  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#7B5E3C] h-20 text-white px-4 sm:px-6 shadow-md sticky top-0 z-50">
        <div className="flex h-full items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center">
            <div className="bg-[#FFF6E6] rounded-md">
              <img className="h-12 sm:h-14 w-auto" src={Logo} alt="Logo" />
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm sm:text-md">namaUser</p>
            <p className="text-xs sm:text-sm">Credit : 5</p>
          </div>
        </div>
      </header>
  
      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="md:w-[60%] w-full mx-auto p-4 sm:p-6 bg-[#FFF6E6] border border-[#D6C5AF] rounded-xl shadow-md"
        >
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#7B5E3C]">Formulir Makanan</h2>
  
          <div className="space-y-4">
            <label className="block text-gray-700">
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
  
            <label className="block text-gray-700">
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
                  onChange={(e) => handleArrayChange("alergen", index, e.target.value)}
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
              <label>Bahan Tersedia:</label>
              {formData.bahanTersedia.map((item, index) => (
                <input
                  key={index}
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange("bahanTersedia", index, e.target.value)}
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
          </div>
  
          <button
            type="submit"
            className="w-full bg-[#7B5E3C] text-white px-4 py-2 mt-6 rounded-md hover:bg-[#63492c] text-sm sm:text-base"
          >
            Simpan
          </button>
        </form>
  
        {/* Loading Indicator */}
        <div className="w-full p-4 sm:p-6 flex justify-center items-center">
          {isLoading && <Loading />}
        </div>
  
        {/* Response */}
        {recipeResponse.namaMakanan && (
          <div className="md:w-[60%] w-full mx-auto mt-6 sm:mt-8 p-4 sm:p-6 bg-[#FFF6E6] border border-[#D6C5AF] rounded-xl shadow-md">
            <h3 className="text-md sm:text-lg font-bold mb-2 text-[#7B5E3C]">Hasil Rekomendasi Makanan</h3>
            
            <div className="space-y-2 text-sm sm:text-base">
              <p><strong className="text-gray-700">Nama Makanan:</strong> {recipeResponse.namaMakanan}</p>
              <p><strong className="text-gray-700">Waktu Masak:</strong> {recipeResponse.waktu} menit</p>
              <p><strong className="text-gray-700">Porsi:</strong> {recipeResponse.porsi}</p>
              <p><strong className="text-gray-700">Berat:</strong> {recipeResponse.beratgram} gram</p>
            </div>
  
            <div className="mt-4 text-sm sm:text-base">
              <strong className="text-gray-700">Bahan:</strong>
              <ul className="list-disc ml-5 mt-1">
                {recipeResponse.bahan.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
  
            <div className="mt-4 text-sm sm:text-base">
              <strong className="text-gray-700">Langkah:</strong>
              <ul className="list-disc ml-5 mt-1">
                {recipeResponse.Langkah.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
  
            <div className="mt-4 text-sm sm:text-base">
              <strong className="text-gray-700">Nutrisi:</strong>
              <ul className="list-disc ml-5 mt-1">
                <li>Kalori: {recipeResponse.nutrisi.calories} kcal</li>
                <li>Karbohidrat: {recipeResponse.nutrisi.carbohydrate} g</li>
                <li>Protein: {recipeResponse.nutrisi.protein} g</li>
                <li>Lemak Total: {recipeResponse.nutrisi.total_fat} g</li>
                <li>Lemak Jenuh: {recipeResponse.nutrisi.saturated_fat} g</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
  
//   return (
    
//     <div className="w-full  bg-gray-100">
//         <header className="bg-[#7B5E3C] h-20 text-white px-6 shadow-md sticky top-0 z-50 mb-12">
//         <div className="flex h-full items-center justify-between max-w-screen-xl mx-auto">
//           <div className="flex items-center">
//             <div className="bg-[#FFF6E6] rounded-md">
//               <img className="h-14 w-auto" src={Logo} alt="Logo" />
//             </div>
//           </div>
//           <div className="text-right">
//             <p className="text-md">namaUser</p>
//             <p className="text-sm">Credit : 5</p>
//           </div>
//         </div>
//       </header>

//       <form
//         onSubmit={handleSubmit}
//         className="md:w-[60%] w-full mx-auto p-6 bg-[#FFF6E6] border border-[#D6C5AF] rounded-xl shadow-md"
//       >
//         <h2 className="text-xl font-semibold mb-4 text-[#7B5E3C]">Formulir Makanan</h2>
  
//         <label className="block mb-2 text-gray-700">
//           Usia:
//           <input
//             type="number"
//             name="usia"
//             value={formData.usia}
//             onChange={handleChange}
//             className="w-full border border-[#D6C5AF] p-2 rounded mt-1 bg-white"
//           />
//         </label>
  
//         <label className="block mb-2 text-gray-700">
//           Kota:
//           <input
//             type="text"
//             name="lokasi.kota"
//             value={formData.lokasi.kota}
//             onChange={handleChange}
//             className="w-full border border-[#D6C5AF] p-2 rounded mt-1 bg-white"
//           />
//         </label>
  
//         <label className="block mb-2 text-gray-700">
//           Provinsi:
//           <input
//             type="text"
//             name="lokasi.provinsi"
//             value={formData.lokasi.provinsi}
//             onChange={handleChange}
//             className="w-full border border-[#D6C5AF] p-2 rounded mt-1 bg-white"
//           />
//         </label>
  
//         <div className="mb-2 text-gray-700">
//           <label>Alergen:</label>
//           {formData.alergen.map((item, index) => (
//             <input
//               key={index}
//               type="text"
//               value={item}
//               onChange={(e) =>
//                 handleArrayChange("alergen", index, e.target.value)
//               }
//               className="w-full border border-[#D6C5AF] p-2 rounded mt-1 bg-white"
//             />
//           ))}
//           <button
//             type="button"
//             onClick={() => addArrayItem("alergen")}
//             className="text-[#4BA095] mt-1 text-sm"
//           >
//             + Tambah Alergen
//           </button>
//         </div>
  
//         <div className="mb-2 text-gray-700">
//           <label>Bahan Tersedia:</label>
//           {formData.bahanTersedia.map((item, index) => (
//             <input
//               key={index}
//               type="text"
//               value={item}
//               onChange={(e) =>
//                 handleArrayChange("bahanTersedia", index, e.target.value)
//               }
//               className="w-full border border-[#D6C5AF] p-2 rounded mt-1 bg-white"
//             />
//           ))}
//           <button
//             type="button"
//             onClick={() => addArrayItem("bahanTersedia")}
//             className="text-[#4BA095] mt-1 text-sm"
//           >
//             + Tambah Bahan
//           </button>
//         </div>
  
//         <label className="block mb-2 text-gray-700">
//           Tipe:
//           <select
//             name="tipe"
//             value={formData.tipe}
//             onChange={handleChange}
//             className="w-full border border-[#D6C5AF] p-2 rounded mt-1 bg-white"
//           >
//             <option value="">-- Pilih Tipe --</option>
//             <option value="sarapan">Sarapan</option>
//             <option value="makan siang">Makan Siang</option>
//             <option value="makan malam">Makan Malam</option>
//           </select>
//         </label>
  
//         <button
//           type="submit"
//           className="w-full bg-[#7B5E3C] text-white px-4 py-2 mt-4 rounded-md hover:bg-[#63492c]"
//         >
//           Simpan
//         </button>
//       </form>
  
//       {/* RESPONSE */}
//       <div className="w-full p-6 flex justify-center items-center">
//         {isLoading && <Loading />}
//       </div>
  
//       {recipeResponse.namaMakanan && (
//         <div className="md:w-[60%] w-full mx-auto mt-8 p-6 bg-[#FFF6E6] border border-[#D6C5AF] rounded-xl shadow-md">
//           <h3 className="text-lg font-bold mb-2 text-[#7B5E3C]">Hasil Rekomendasi Makanan</h3>
//           <p><strong>Nama Makanan:</strong> {recipeResponse.namaMakanan}</p>
//           <p><strong>Waktu Masak:</strong> {recipeResponse.waktu} menit</p>
//           <p><strong>Porsi:</strong> {recipeResponse.porsi}</p>
//           <p><strong>Berat:</strong> {recipeResponse.beratgram} gram</p>
  
//           <div className="mt-2">
//             <strong>Bahan:</strong>
//             <ul className="list-disc ml-5">
//               {recipeResponse.bahan.map((b, i) => (
//                 <li key={i}>{b}</li>
//               ))}
//             </ul>
//           </div>
  
//           <div className="mt-2">
//             <strong>Langkah:</strong>
//             <ul className="list-disc ml-5">
//               {recipeResponse.Langkah.map((b, i) => (
//                 <li key={i}>{b}</li>
//               ))}
//             </ul>
//           </div>
  
//           <div className="mt-2">
//             <strong>Nutrisi:</strong>
//             <ul className="list-disc ml-5">
//               <li>Kalori: {recipeResponse.nutrisi.calories} kcal</li>
//               <li>Karbohidrat: {recipeResponse.nutrisi.carbohydrate} g</li>
//               <li>Protein: {recipeResponse.nutrisi.protein} g</li>
//               <li>Lemak Total: {recipeResponse.nutrisi.total_fat} g</li>
//               <li>Lemak Jenuh: {recipeResponse.nutrisi.saturated_fat} g</li>
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
  
  
};