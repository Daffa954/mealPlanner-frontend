//nambah anak
//bikin jadwal

import child from "../assets/AddChild.png";
import recipe from "../assets/GenerateRecipe.png";
import schedule from "../assets/Calendar.png";
import { useEffect, useState } from "react";
import { getUserProfile } from "../apis/apiService";
import { Link } from "react-router-dom";
import { NavbarUser } from "../components/navbar_user";

export const UserViews = () => {
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <NavbarUser 
        name={name} 
        credit={credit.toString()} // Convert number ke string
      />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-12 px-4">
        <h1 className="text-3xl font-medium text-center mb-8">
          Rencanakan Menu Sehat untuk Si <br />
          Kecil,{" "}
          <span className="text-3xl font-bold text-[#4BA095]">
            Tanpa Ribet!
          </span>
        </h1>
      </section>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-24 pb-12">
        {/* Card 1 */}
        <div className="bg-[#ECE3D6] rounded-xl p-6 shadow-md flex flex-col items-center">
          <img
            src={child}
            alt="Tambah Anak"
            className="rounded-xl w-40 h-auto mb-4"
          />
          <h2 className="text-lg font-semibold mb-2">Tambahkan Profil Anak</h2>
          <p className="text-center text-sm text-gray-700 mb-4">
            Masukkan usia dan alergi makanan anak Anda agar kami bisa membantu
            merancang menu yang aman dan sesuai tahap tumbuh kembangnya.
          </p>
          <Link to="/addChild" className="">
            <button className="bg-[#7B5E3C] text-white px-4 py-2 rounded-md hover:bg-[#63492c]">
              Tambah Profil Anak
            </button>
          </Link>
        </div>

        {/* Card 2 */}
        <div className="bg-[#ECE3D6] rounded-xl p-6 shadow-md flex flex-col items-center">
          <img
            src={recipe}
            alt="Buat Resep"
            className="rounded-xl w-40 h-auto mb-4"
          />
          <h2 className="text-lg font-semibold mb-2">Buat Resep</h2>
          <p className="text-center text-sm text-gray-700 mb-4 flex-grow">
            Dapatkan rekomendasi resep yang bergizi dan ramah alergi berdasarkan
            profil anak Anda.
          </p>
          
          <Link to="/listChild" className="">
            <button className="bg-[#7B5E3C] text-white px-4 py-2 rounded-md hover:bg-[#63492c]">
              Buat Resep
            </button>
          </Link>
        </div>

        {/* Card 3 */}
        <div className="bg-[#ECE3D6] rounded-xl p-6 shadow-md flex flex-col items-center">
          <img
            src={schedule}
            alt="Jadwal Menu"
            className="rounded-xl w-40 h-auto mb-4"
          />
          <h2 className="text-lg font-semibold mb-2">Jadwal Menu</h2>
          <p className="text-center text-sm text-gray-700 mb-4">
            Lihat jadwal memasak Anda dan rencanakan menu harian dengan mudah
            agar waktu di dapur lebih efisien dan anak tetap makan dengan
            senang.
          </p>
          <button className="bg-[#7B5E3C] text-white px-4 py-2 rounded-md hover:bg-[#63492c]">
            Jadwal Menu
          </button>
        </div>
      </div>
    </div>
  );
};

