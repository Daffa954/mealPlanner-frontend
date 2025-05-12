//nambah anak
//bikin jadwal

import child from "../assets/AddChild.png";
import recipe from "../assets/GenerateRecipe.png";
import schedule from "../assets/Calendar.png";
import { useEffect, useState } from "react";
import { getUserProfile } from "../apis/apiService";
import { Link } from "react-router-dom";
import { NavbarUser } from "../components/navbar_user";
import { FooterWebsite } from "../components/footer_web";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-24 pb-12 mb-20">
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
          <Link to="/listSchedulle" className="">
            <button className="bg-[#7B5E3C] text-white px-4 py-2 rounded-md hover:bg-[#63492c]">
              Lihat Jadwal
            </button>
          </Link>
        </div>
      </div>

      {/* Purchase Plan Section */}
      <section className="px-4 lg:px-8 pb-12 mb-20">
        <h2 className="text-3xl font-bold text-center mb-8">
          Pilih Paket yang <span className="text-[#4BA095]">Sesuai Kebutuhan</span>
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Dapatkan lebih banyak kredit untuk menghasilkan resep sehat dan bergizi untuk si kecil.
        </p>

        {/* Pricing Cards Container */}
        <div className="relative">
          <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
            {/* Free Plan Card */}
            <div className="flex-shrink-0 w-80 bg-[#ECE3D6] rounded-xl p-6 shadow-md flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">Gratis</h3>
                <span className="bg-[#4BA095] text-white text-xs px-2 py-1 rounded-full">Mulai</span>
              </div>
              <div className="mb-4">
                <span className="text-gray-500 line-through">.</span>
                <div className="flex items-end">
                  <span className="text-3xl font-bold">Rp0</span>
                  {/* <span className="text-gray-500 ml-1">/selamanya</span> */}
                </div>
              </div>
              <div className="mb-6">
                <p className="font-semibold">100 Kredit</p>
                <p className="text-sm text-gray-600">(10 resep)</p>
              </div>
              <ul className="space-y-2 mb-6 flex-grow">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#4BA095] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm">10 resep gratis</span>
                </li>
                {/* <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#4BA095] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm">1 anak</span>
                </li> */}
              </ul>
              <button className="bg-[#7B5E3C] text-white px-4 py-2 rounded-md hover:bg-[#63492c] w-full cursor-not-allowed" disabled>
                Pengguna Baru
              </button>
              <p className="text-xs text-center mt-2 text-gray-500">Cocok untuk mencoba</p>
            </div>

            {/* Basic Plan Card */}
            <div className="flex-shrink-0 w-80 bg-[#ECE3D6] rounded-xl p-6 shadow-md flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">Dasar</h3>
                <span className="bg-[#FFD700] text-[#7B5E3C] text-xs px-2 py-1 rounded-full">Populer</span>
              </div>
              <div className="mb-4">
                <span className="text-gray-500 line-through">Rp50.000</span>
                <div className="flex items-end">
                  <span className="text-3xl font-bold">Rp25.000</span>
                  {/* <span className="text-gray-500 ml-1">/bulan</span> */}
                </div>
              </div>
              <div className="mb-6">
                <p className="font-semibold">500 Kredit</p>
                <p className="text-sm text-gray-600">(50 resep)</p>
              </div>
              <ul className="space-y-2 mb-6 flex-grow">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#4BA095] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm">Generate 50 resep</span>
                </li>
                {/* <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#4BA095] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm">3 anak</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#4BA095] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm">Prioritas dukungan</span>
                </li> */}
              </ul>
              <Link to={`/payment?plan=Dasar&price=25000&credits=500`} className="w-full">
                <button className="bg-[#4BA095] text-white px-4 py-2 rounded-md hover:bg-[#3a7d74] w-full">
                  Beli Sekarang
                </button>
              </Link>
              {/* <button className="bg-[#4BA095] text-white px-4 py-2 rounded-md hover:bg-[#3a7d74] w-full">
                Beli Sekarang
              </button> */}
              <p className="text-xs text-center mt-2 text-gray-500">Cocok untuk 1 bulan</p>
            </div>

            {/* Pro Plan Card */}
            <div className="flex-shrink-0 w-80 bg-[#ECE3D6] rounded-xl p-6 shadow-md flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">Pro</h3>
                <span className="bg-[#FF6B6B] text-white text-xs px-2 py-1 rounded-full">Best Value</span>
              </div>
              <div className="mb-4">
                <span className="text-gray-500 line-through">Rp300.000</span>
                <div className="flex items-end">
                  <span className="text-3xl font-bold">Rp125.000</span>
                  {/* <span className="text-gray-500 ml-1">/bulan</span> */}
                </div>
              </div>
              <div className="mb-6">
                <p className="font-semibold">3000 Kredit</p>
                <p className="text-sm text-gray-600">(300 resep)</p>
              </div>
              <ul className="space-y-2 mb-6 flex-grow">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#4BA095] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm">Generate 300 resep</span>
                </li>
                {/* <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#4BA095] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm">5 anak</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#4BA095] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm">Prioritas dukungan</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#4BA095] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm">Analisis nutrisi</span>
                </li> */}
              </ul>
              <Link to={`/payment?plan=Pro&price=125000&credits=3000`} className="w-full">
                <button className="bg-[#4BA095] text-white px-4 py-2 rounded-md hover:bg-[#3a7d74] w-full">
                  Beli Sekarang
                </button>
              </Link>
              {/* <button className="bg-[#4BA095] text-white px-4 py-2 rounded-md hover:bg-[#3a7d74] w-full">
                Beli Sekarang
              </button> */}
              <p className="text-xs text-center mt-2 text-gray-500">Cocok untuk 6 bulan</p>
            </div>

            {/* Enterprise Plan Card (half cropped) */}
            <div className="flex-shrink-0 w-80 bg-[#ECE3D6] rounded-xl p-6 shadow-md flex flex-col mr-24">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">Enterprise</h3>
                <span className="bg-[#4ba148] text-white text-xs px-2 py-1 rounded-full">Expert</span>
              </div>
              <div className="mb-4">
                <span className="text-gray-500 line-through">Rp1.000.000</span>
                <div className="flex items-end">
                  <span className="text-3xl font-bold">Rp439.900</span>
                  {/* <span className="text-gray-500 ml-1">/bulan</span> */}
                </div>
              </div>
              <div className="mb-6">
                <p className="font-semibold">10.000 Kredit</p>
                <p className="text-sm text-gray-600">(1000 resep)</p>
              </div>
              <ul className="space-y-2 mb-6 flex-grow">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#4BA095] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm">Generate 1000 resep</span>
                </li>
                {/* <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#4BA095] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm">Anak tidak terbatas</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#4BA095] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm">Dukungan prioritas 24/7</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#4BA095] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm">Analisis nutrisi lengkap</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#4BA095] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-sm">Konsultasi ahli gizi</span>
                </li> */}
              </ul>
              <Link to={`/payment?plan=Enterprise&price=439900&credits=10000`} className="w-full">
                <button className="bg-[#4BA095] text-white px-4 py-2 rounded-md hover:bg-[#3a7d74] w-full">
                  Beli Sekarang
                </button>
              </Link>
              {/* <button className="bg-[#4BA095] text-white px-4 py-2 rounded-md hover:bg-[#3a7d74] w-full">
                Beli Sekarang
              </button> */}
              <p className="text-xs text-center mt-2 text-gray-500">Cocok untuk keluarga besar</p>
            </div>
          </div>
          
          {/* Gradient overlay to indicate scrollable content */}
          {/* <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-100 to-transparent pointer-events-none"></div> */}
        </div>
      </section>

      <FooterWebsite></FooterWebsite>
    </div>
  );
};
