// src/components/addChild.tsx
import React, { useEffect, useState } from "react";
import Logo from "../assets/logo-nobg.png";
import { addChildren, getUserProfile } from "../apis/apiService";

export const AddChild: React.FC = () => {
  const [name, setName] = useState("");
  const [credit, setCredit] = useState(0);
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    document.title = "Home";
    //check the token and email
    if (!token || !email) {
      window.location.href = "/login";
    }
    getProfile();
  }, [token, email]);
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
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    allergies: [""],
    favoriteFoods: [""],
    location: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,

    }));
  };

  const handleAllergyChange = (index: number, value: string) => {
    const updatedAllergies = [...formData.allergies];
    updatedAllergies[index] = value;
    setFormData((prev) => ({
      ...prev,
      allergies: updatedAllergies,
    }));
  };

  const addAllergyField = () => {
    setFormData((prev) => ({
      ...prev,
      allergies: [...prev.allergies, ""],
    }));
  };

   const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addChildren(
        token ? token : "", {
          name: formData.name,
          age: parseInt(formData.age),
          allergen: formData.allergies,
          preference: formData.favoriteFoods,
          lokasi: formData.location,
        })
      if (response.status == 200) {
        console.log("Form submitted successfully:", response.data);
        alert("Profil anak berhasil ditambahkan!");
        window.location.href = "/userViews";
      }
      else {
        console.error("Failed to submit form:", response.data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    console.log(formData);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Header - Same as before */}
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
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#7B5E3C]">
            Tambahkan Profil Anak
          </h2>

          <div className="space-y-4">
            <label className="block text-gray-700">
              Nama/Inisial:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-[#D6C5AF] p-2 rounded mt-1 bg-white text-sm sm:text-base"
                placeholder="Masukkan nama atau inisial anak"
              />
            </label>

            <label className="block text-gray-700">
              Usia (tahun):
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full border border-[#D6C5AF] p-2 rounded mt-1 bg-white text-sm sm:text-base"
                placeholder="Masukkan usia anak"
              />
            </label>

            {/* add location */}

            <label className="block text-gray-700">
              Lokasi:
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-[#D6C5AF] p-2 rounded mt-1 bg-white text-sm sm:text-base"
                placeholder="Masukkan lokasi"
              />
            </label>
            <div className="text-gray-700">
              <label>Alergi:</label>
              {formData.allergies.map((allergy, index) => (
                <input
                  key={index}
                  type="text"
                  value={allergy}
                  onChange={(e) => handleAllergyChange(index, e.target.value)}
                  className="w-full border border-[#D6C5AF] p-2 rounded mt-1 bg-white text-sm sm:text-base"
                  placeholder="Misal: kacang, susu, seafood"
                />
              ))}
              <button
                type="button"
                onClick={addAllergyField}
                className="text-[#4BA095] mt-1 text-xs sm:text-sm"
              >
                + Tambah Alergi
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#7B5E3C] text-white px-4 py-2 mt-6 rounded-md hover:bg-[#63492c] text-sm sm:text-base"
          >
            Simpan Profil
          </button>
        </form>
      </main>
    </div>
  );
};
