import Navbar from "../components/navbar";
import imgAset from "../assets/aset2Compress.jpg";
import imgAsets from "../assets/bg-dapur.png";
import { useEffect } from "react";
import { TeamCard } from "../components/team_card";
import placeholder from "../assets/placeholder.jpg";
import { Card } from "../components/card_why";
import { reviews } from "../seed/reviews";
import { ReviewCard } from "../components/reviewCard";
import { Link } from "react-router-dom";
import { FooterWebsite } from "../components/footer_web";
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

  const whyChooses = [
    {
      title: "Mudah dan Praktis",
      description: "Dapatkan resep yang sesuai dengan kebutuhan gizi anak Anda",
      children: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          className="bi bi-alarm"
          viewBox="0 0 16 16"
        >
          <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z" />
          <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1" />
        </svg>
      ),
    },
    {
      title: "Bahan Mudah Didapat",
      description: "Temukan berbagai resep dengan bahan yang mudah ditemukan",
      children: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          className="bi bi-cart4"
          viewBox="0 0 16 16"
        >
          <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
        </svg>
      ),
    },
    {
      title: "Tidak Perlu Khawatir Alergi Anak",
      description: "Dapatkan resep yang sesuai dengan alergi anak Anda",
      children: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          className="bi bi-shield"
          viewBox="0 0 16 16"
        >
          <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56" />
        </svg>
      ),
    },
  ];
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <>
     
      <header className="w-full relative">
        {/* Navbar with glassmorphism effect */}
        <div className="fixed w-full z-50 backdrop-blur-md bg-white/30 shadow-sm">
          <Navbar />
        </div>

        {/* Hero section */}
        <div
          className="w-full h-screen flex items-center justify-center p-4 relative"
          style={{
            backgroundImage: `url(${imgAsets})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Content with glassmorphism */}
          <div className="max-w-4xl text-center backdrop-blur-sm bg-[#b8b8b89d] p-12 rounded-3xl border border-white/20 shadow-xl z-10 mx-4">
            <h1 className="text-6xl md:text-7xl text-[#FCD47F] font-bold leading-tight mb-4">
              Meal Planner
            </h1>
            <h2 className="text-3xl md:text-4xl text-white font-bold leading-tight mb-6 drop-shadow-md">
              Rencana Makan Sehat untuk Anak, Sesuai Selera, Kebutuhan, dan
              Kesehatan Anak!
            </h2>
            <p className="mt-4 text-white text-xl md:text-2xl font-medium drop-shadow-md">
              Dibantu AI Deepseek untuk mendapatkan resep yang sesuai untuk Anak
              Anda
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-[#7B5E3C] text-white px-8 py-3 rounded-lg hover:bg-[#9C7248] transition-all shadow-lg hover:shadow-xl">
                <Link to="/ask" className="">
                  Coba Gratis
                </Link>
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all shadow-sm">
                Detail harga
              </button>
            </div>
          </div>
        </div>
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
              {whyChooses.map((item, index) => (
                <Card
                  key={index}
                  title={item.title}
                  description={item.description}
                >
                  {item.children}
                </Card>
              ))}
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
        <section className="w-full pb-16  text-gray-700">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#4BA095] mb-6">
            Testimonial
          </h1>
          {/* card container review index 1- 12 */}
          <div className="w-full overflow-x-auto group">
            <div className="flex gap-6 w-max flex-nowrap animate-scroll-right paused-on-hover">
              {reviews.slice(0, 12).map((review, index) => (
                <ReviewCard
                  key={index}
                  name={review.name}
                  value={review.value}
                  review={review.review}
                />
              ))}
            </div>
          </div>
          {/* card container review index 1- 12*/}
          {/* card container review index 13- 25 */}
          <div className="w-full overflow-x-auto mt-4 group">
            <div className="flex gap-6 w-max flex-nowrap animate-scroll-left paused-on-hover">
              {reviews.slice(13, 24).map((review, index) => (
                <ReviewCard
                  key={index}
                  name={review.name}
                  value={review.value}
                  review={review.review}
                />
              ))}
            </div>
          </div>

          {/* card container review index 13-25*/}
        </section>
      </main>
      <FooterWebsite></FooterWebsite>
    </>
  );
}
