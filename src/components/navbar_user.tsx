import Logo from "../assets/logo-nobg.png";

// Perbaiki parameter dengan menggunakan props object
export const NavbarUser = ({ name, credit }: { name: string; credit: string }) => {
  return ( // Tambahkan return statement
    <header className="bg-[#7B5E3C] h-20 text-white px-6 shadow-md">
      <div className="flex h-full items-center justify-between max-w-screen-xl mx-auto">
        <div className="flex items-center">
          <div className="bg-[#FFF6E6] rounded-md">
            <img className="h-14 w-auto" src={Logo} alt="Logo" />
          </div>
        </div>
        <div className="text-right">
          <p className="text-md">namaUser: {name}</p>
          <p className="text-sm">Credit : {credit}</p>
        </div>
      </div>
    </header>
  );
};