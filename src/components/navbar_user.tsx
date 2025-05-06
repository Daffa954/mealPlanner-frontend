// import Logo from "../assets/logo-nobg.png";

// // Perbaiki parameter dengan menggunakan props object
// export const NavbarUser = ({ name, credit }: { name: string; credit: string }) => {
//   return ( // Tambahkan return statement
//     <header className="bg-[#7B5E3C] h-20 text-white px-6 shadow-md sticky top-0 z-50">
//       <div className="flex h-full items-center justify-between max-w-screen-xl mx-auto">
//         <div className="flex items-center">
//           <div className="bg-[#FFF6E6] rounded-md">
//             <img className="h-14 w-auto" src={Logo} alt="Logo" />
//           </div>
//         </div>
//         <div className="text-right">
//           <p className="text-md font-medium">{name}</p>
//           <p className="text-sm">Credit : {credit}</p>
//         </div>
//       </div>
//     </header>
//   );
// };

import Logo from "../assets/logo-nobg.png";

export const NavbarUser = ({
  name,
  credit,
}: {
  name: string;
  credit: string;
}) => {
  return (
    <header className="bg-[#7B5E3C] h-20 text-white px-6 shadow-md sticky top-0 z-50">
      <div className="flex h-full items-center justify-between max-w-screen-xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="bg-[#FFF6E6] rounded-md">
            <img className="h-14 w-auto" src={Logo} alt="Logo" />
          </div>
        </div>
        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center gap-16 ml-6">
          <a
            href="/addChild"
            className="hover:text-[#ffe1ae] transition-colors duration-200"
          >
            Tambah Profil
          </a>
          <a
            href="/userViews"
            className="hover:text-[#ffe1ae] transition-colors duration-200"
          >
            Buat Resep
          </a>
          <a
            href="/listSchedulle"
            className="hover:text-[#ffe1ae] transition-colors duration-200"
          >
            Jadwal
          </a>
        </nav>
        {/* User Info */}
        <div className="text-right">
          <p className="text-md font-medium">{name}</p>
          <p className="text-sm">Credit : {credit}</p>
        </div>
      </div>

      {/* Mobile Menu Button (optional) */}
      <div className="md:hidden flex justify-center mt-2 pb-2">
        <div className="flex gap-4">
          <a href="/add-profile" className="text-sm hover:text-[#FFF6E6]">
            Tambah Profil
          </a>
          <a href="/create-recipe" className="text-sm hover:text-[#FFF6E6]">
            Buat Resep
          </a>
          <a href="/schedule" className="text-sm hover:text-[#FFF6E6]">
            Jadwal
          </a>
        </div>
      </div>
    </header>
  );
};
