//nambah anak
//bikin jadwal

import Logo from "../assets/logo-nobg.png";
import child from "../assets/AddChild.png";
import recipe from "../assets/GenerateRecipe.png";
import schedule from "../assets/Calendar.png";
import { useEffect } from "react";


export const UserViews = () => {
  useEffect(() => {
    document.title = "Home";
    //check the token and email
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("email");
    if (!token || !email) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#7B5E3C] h-20 text-white px-6 shadow-md">
        <div className="flex h-full items-center justify-between max-w-screen-xl mx-auto">
          <div className="flex items-center">
            <div className="bg-[#FFF6E6] rounded-md">
              <img className="h-14 w-auto" src={Logo} alt="Logo" />
            </div>
          </div>
          <div className="text-right">
            <p className="text-md">namaUser</p>
            <p className="text-sm">Credit : 5</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-12 px-4">
        <h1 className="text-3xl font-medium text-center mb-8">
          Rencanakan Menu Sehat untuk Si <br />
          Kecil,{" "}
          <span className="text-3xl font-bold text-[#4BA095]">Tanpa Ribet!</span>
        </h1>
      </section>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-24 pb-12">
        {/* Card 1 */}
        <div className="bg-[#ECE3D6] rounded-xl p-6 shadow-md flex flex-col items-center">
          <img src={child} alt="Tambah Anak" className="rounded-xl w-40 h-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">Tambahkan Profil Anak</h2>
          <p className="text-center text-sm text-gray-700 mb-4">
            Masukkan usia dan alergi makanan anak Anda agar kami bisa membantu merancang menu yang aman dan sesuai tahap tumbuh kembangnya.
          </p>
          <button className="bg-[#7B5E3C] text-white px-4 py-2 rounded-md hover:bg-[#63492c]">
            Tambah Profil Anak
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-[#ECE3D6] rounded-xl p-6 shadow-md flex flex-col items-center">
          <img src={recipe} alt="Buat Resep" className="rounded-xl w-40 h-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">Buat Resep</h2>
          <p className="text-center text-sm text-gray-700 mb-4 flex-grow">
            Dapatkan rekomendasi resep yang bergizi dan ramah alergi berdasarkan profil anak Anda.
          </p>
          <button className="bg-[#7B5E3C] text-white px-4 py-2 rounded-md hover:bg-[#63492c]">
            Buat Resep
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-[#ECE3D6] rounded-xl p-6 shadow-md flex flex-col items-center">
          <img src={schedule} alt="Jadwal Menu" className="rounded-xl w-40 h-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">Jadwal Menu</h2>
          <p className="text-center text-sm text-gray-700 mb-4">
            Lihat jadwal memasak Anda dan rencanakan menu harian dengan mudah agar waktu di dapur lebih efisien dan anak tetap makan dengan senang.
          </p>
          <button className="bg-[#7B5E3C] text-white px-4 py-2 rounded-md hover:bg-[#63492c]">
            Jadwal Menu
          </button>
        </div>
      </div>
    </div>
  );
};



