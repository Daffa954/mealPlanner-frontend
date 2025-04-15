import Navbar from "../components/navbar";
import imgAset from "../assets/aset2Compress.jpg";
import { useEffect } from "react";
import { TeamCard } from "../components/team_card";
import placeholder from "../assets/placeholder.jpg";
export function Home() {
  const teams = [
    {
      name: "Daffa Khoirul Faiz",
      role: "Chief Technology Officer",
      image: placeholder,
    },
    {
      name: "Jevoncius Fernando W",
      role: "Chief Technology Officer",
      image: placeholder,
    },
    {
      name: "Matthew Fernando A",
      role: "Chief Technology Officer",
      image: placeholder,
    },
    {
      name: "Shafira Rizki Amelia",
      role: "Chief Technology Officer",
      image: placeholder,
    },
  ];
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <>
      <header className="w-full ">
        <Navbar />
        {/* hero */}
        <div className="w-full h-[100vh] flex items-center justify-center  bg-[#F9F6F1] p-4">
          <div className="max-w-4xl text-center">
            <h1 className="text-7xl text-[#333333] font-bold leading-tight">
              Masak Aman untuk <span className="text-[#4BA095]">Si Kecil</span>
            </h1>
            <p className="mt-4 text-black text-2xl">
              Dibantu AI Deepseek, Disesuaikan Kebutuhan Gizi Anak Dapatkan
              resep bergizi sesuai usia dan alergi anak, langsung dari AI.
              Mudah, cepat, dan penuh cinta.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <button className="bg-[#F5B947] text-white px-6 py-3 rounded-md hover:bg-yellow-500">
                Coba gratis
              </button>
              <button className="border border-[#4BA095] text-[#4BA095] px-6 py-3 rounded-md hover:bg-[#4BA095] hover:text-white transition">
                Detail harga
              </button>
            </div>
          </div>
        </div>
        {/* hero */}
      </header>
      <main className="md:px-28 px-10 py-10 space-y-8">
        {/* about */}
        <section className="w-full py-16  text-gray-700">
          <div className="max-w-5xl ">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#4BA095] mb-6">
              About Our Product
            </h1>
            <p className="text-xl leading-relaxed">
              Kami percaya setiap anak berhak mendapatkan makanan sehat dan
              aman, apapun kondisi dan keterbatasan bahan di rumah. Dengan
              teknologi AI, kami bantu orang tua menyusun menu harian yang
              sesuai dengan usia, alergi, dan bahan lokal — tanpa repot, tanpa
              bingung.
            </p>

            <p className="text-xl mt-6 font-semibold">Fitur utama:</p>
            <ul className="mt-4 space-y-3 list-none">
              <li className="flex items-start gap-2">
                <span>🎯</span>
                <span>
                  <strong>Personalisasi Resep:</strong> Sesuai usia anak,
                  lokasi, alergi, dan bahan yang tersedia.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span>🛡️</span>
                <span>
                  <strong>Keamanan Pangan:</strong> Menghindari bahan yang
                  menyebabkan alergi.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span>🥬</span>
                <span>
                  <strong>Gunakan Bahan Yang Ada:</strong> Menyesuaikan dengan
                  ketersediaan bahan pengguna.
                </span>
              </li>

              <li className="flex items-start gap-2">
                <span>⚡</span>
                <span>
                  <strong>Cepat & Praktis:</strong> Resep langsung jadi tanpa
                  perlu browsing berjam-jam.
                </span>
              </li>
            </ul>
          </div>
        </section>
        {/* about */}

        {/* alasan mengapa menggunakan */}
        <section className="w-full bg-[#4BA095] py-8 md:px-6 px-3  text-white rounded-3xl shadow-lg">
          <div className="text-center  w-full px-3">
            <h1 className="text-4xl font-bold ">
              Kenapa Harus Menggunakan Meal Planner
            </h1>
            <p className="text-xl mt-4">
              Temukan berbagai resep dengan bahan yang mudah ditemukan dan
              sesuai dengan kebutuhan gizi anak Anda
            </p>
          </div>
          <div className="flex lg:flex-row flex-col mt-8 w-full justify-between px-6 gap-4">
            <div className="w-full lg:w-[50%] ">
              <div className=" py-6 border-b-2 border-white">
                <h2 className="text-2xl font-extrabold text-white">
                  Mudah dan Praktis
                </h2>
                <p className="mt-2 text-gray-700 ">
                  Dapatkan resep yang sesuai dengan kebutuhan gizi anak Anda
                </p>
              </div>
              <div className=" py-6 border-b-2 border-white">
                <h2 className="text-2xl font-bold text-white">
                  Bahan Mudah Didapat
                </h2>
                <p className="mt-2 text-gray-700">
                  Temukan berbagai resep dengan bahan yang mudah ditemukan
                </p>
              </div>
              <div className=" py-6  border-b-2 border-white">
                <h2 className="text-2xl font-bold text-white">
                  Tidak Perlu Khawatir Alergi Anak
                </h2>
                <p className="mt-2 text-gray-700">
                  Dapatkan resep yang sesuai dengan alergi anak Anda
                </p>
              </div>
            </div>
            <div className="w-full lg:w-[45%]  flex items-center justify-center">
              <img
                src={imgAset}
                alt="gambar"
                className="rounded-2xl  shadow-xl "
              />
            </div>
          </div>
        </section>
        {/* our teams */}
        <section className="w-full py-16  text-gray-700">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#4BA095] mb-6">
            Meet Our Team
          </h1>
          {/* card container */}
          <div className="w-full  flex-wrap flex gap-6">
            {teams.map((team, index) => (
              <TeamCard key={index} title={team.name} description={team.role}>
                <img
                  className="rounded-t-lg h-[270px] w-full object-cover"
                  src={
                    team.image ||
                    "https://via.placeholder.com/300x270?text=No+Image"
                  }
                  alt={team.name}
                />
              </TeamCard>
            ))}
          </div>
          {/* card container */}
        </section>
        {/* testimonial */}
        
      </main>
    </>
  );
}
