// // src/components/AskAIForm.tsx


// {/* OLD FORM SAVE (JAGA" KALAU LOGIC ERROR)*/}
// import React, {  useState } from "react";
// import { askAIAPI, FormData } from "../apis/apiService";
// import { RecipeResponse } from "../models/Recip";
// import Loading from "../components/loading";

// export const AskAI2: React.FC = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState<FormData>({
//     usia: "",
//     lokasi: { kota: "", provinsi: "" },
//     alergen: [""],
//     bahanTersedia: [""],
//     tipe: "",
//   });
//   const token = sessionStorage.getItem("token");
//   const [recipeResponse, setRecipeResponse] = useState<RecipeResponse>({
//     namaMakanan: "",
//     bahan: [""],
//     Langkah: [""],
//     waktu: 0,
//     porsi: 0,
//     beratgram: 0,
//     nutrisi: {
//       calories: 0,
//       carbohydrate: 0,
//       protein: 0,
//       total_fat: 0,
//       saturated_fat: 0,
//     },
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;

//     if (name.startsWith("lokasi.")) {
//       const key = name.split(".")[1] as keyof typeof formData.lokasi;
//       setFormData((prev) => ({
//         ...prev,
//         lokasi: {
//           ...prev.lokasi,
//           [key]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleArrayChange = (
//     field: "alergen" | "bahanTersedia",
//     index: number,
//     value: string
//   ) => {
//     const updatedArray = [...formData[field]];
//     updatedArray[index] = value;
//     setFormData((prev) => ({
//       ...prev,
//       [field]: updatedArray,
//     }));
//   };

//   const addArrayItem = (field: "alergen" | "bahanTersedia") => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: [...prev[field], ""],
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);
//     console.log(isLoading)
//     try {
//       const response = await askAIAPI(formData, token ? token : "");
     
//       if (response.status == 200) {
//         console.log("Response:", response);
//         setRecipeResponse(response.data.recipeData); // ⬅️ Set state agar tampil

//         console.log(response.data.recipeData);
//         setIsLoading(false);
//       }
//     } catch (error) {
//       console.error("Gagal submit:", error);
//     }
//   };

//   return (
//     <div className="w-full py-16 px-10 ">
//       <form
//         onSubmit={handleSubmit}
//         className="md:w-[60%] w-full mx-auto p-4 border-2 border-solid-gray-200 rounded-xl shadow"
//       >
//         <h2 className="text-xl font-semibold mb-4">Formulir Makanan</h2>

//         <label className="block mb-2">
//           Usia:
//           <input
//             type="number"
//             name="usia"
//             value={formData.usia}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//         </label>

//         <label className="block mb-2">
//           Kota:
//           <input
//             type="text"
//             name="lokasi.kota"
//             value={formData.lokasi.kota}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//         </label>

//         <label className="block mb-2">
//           Provinsi:
//           <input
//             type="text"
//             name="lokasi.provinsi"
//             value={formData.lokasi.provinsi}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//         </label>

//         <div className="mb-2">
//           <label>Alergen:</label>
//           {formData.alergen.map((item, index) => (
//             <input
//               key={index}
//               type="text"
//               value={item}
//               onChange={(e) =>
//                 handleArrayChange("alergen", index, e.target.value)
//               }
//               className="w-full border p-2 rounded mt-1"
//             />
//           ))}
//           <button
//             type="button"
//             onClick={() => addArrayItem("alergen")}
//             className="text-blue-500 mt-1"
//           >
//             + Tambah Alergen
//           </button>
//         </div>

//         <div className="mb-2">
//           <label>Bahan Tersedia:</label>
//           {formData.bahanTersedia.map((item, index) => (
//             <input
//               key={index}
//               type="text"
//               value={item}
//               onChange={(e) =>
//                 handleArrayChange("bahanTersedia", index, e.target.value)
//               }
//               className="w-full border p-2 rounded mt-1"
//             />
//           ))}
//           <button
//             type="button"
//             onClick={() => addArrayItem("bahanTersedia")}
//             className="text-blue-500 mt-1"
//           >
//             + Tambah Bahan
//           </button>
//         </div>

//         <label className="block mb-2">
//           Tipe:
//           <select
//             name="tipe"
//             value={formData.tipe}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           >
//             <option value="">-- Pilih Tipe --</option>
//             <option value="sarapan">Sarapan</option>
//             <option value="makan siang">Makan Siang</option>
//             <option value="makan malam">Makan Malam</option>
//           </select>
//         </label>

//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
//         >
//           Simpan
//         </button>
//       </form>
//       {/* RESPONSE */}
//       <div className="w-full  p-6 flex justify-center items-center">
//       {isLoading && <Loading />}
//       </div>

//       {/* RESPONSE */}
//       {recipeResponse.namaMakanan && (
//         <div className="md:w-[60%] w-full mx-auto mt-8 p-4 bg-green-100 rounded-xl shadow">
//           <h3 className="text-lg font-bold mb-2">Hasil Rekomendasi Makanan</h3>
//           <p>
//             <strong>Nama Makanan:</strong> {recipeResponse.namaMakanan}
//           </p>
//           <p>
//             <strong>Waktu Masak:</strong> {recipeResponse.waktu} menit
//           </p>
//           <p>
//             <strong>Porsi:</strong> {recipeResponse.porsi}
//           </p>
//           <p>
//             <strong>Berat:</strong> {recipeResponse.beratgram} gram
//           </p>

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
//       {/* RESPONSE */}

//       {/* RESPONSE */}
//     </div>
//   );
// };
