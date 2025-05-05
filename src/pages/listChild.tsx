import { useEffect, useState } from "react";
import { getAllChildrens, getUserProfile } from "../apis/apiService";
import { NavbarUser } from "../components/navbar_user";
import { ChildrenResponse } from "../models/Recip";
import { ChildCard } from "../components/child_card";

export const ListChildView = () => {
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");
  const [name, setName] = useState("");
  const [credit, setCredit] = useState(0);
  const [childrenData, setChildrenData] = useState<ChildrenResponse[]>([]);

  useEffect(() => {
    document.title = "Home";
    //check the token and email
    if (!token || !email) {
      window.location.href = "/login";
    }
    getProfile();
    callApiGetAllChildrens()
  }, [token, email]);

  const callApiGetAllChildrens = async () => {
    try {
      const response = await getAllChildrens(token ? token : "");
      if (response.status == 200){
        console.log(response.data.data);
        setChildrenData(response.data.data);
      } 
    } catch {
      console.log("Login failed. Please check your email and password.");
    }
  };
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
    <>
      <div className="w-full min-h-screen bg-gray-100">
        <NavbarUser
          name={name}
          credit={credit.toString()} // Convert number ke string
        />
        <section className="flex flex-col items-center justify-center pt-12 px-4">
          <h1 className="text-3xl font-medium text-center mb-8">
            Pilih Anak untuk dibuatkan,{" "}
            <span className="text-3xl font-bold text-[#4BA095]">Jadwal</span>
          </h1>
        </section>
        {/* card section */}
        {/* Card section */}
        <section className="flex flex-wrap w-full px-24 py-6  gap-x-6 gap-y-4">
          {childrenData.length > 0 ? (
            childrenData.map((child) => (
              <ChildCard key={child.id} child={child } /> 
            ))
          ) : (
            <div className="w-full text-center text-white py-8">
              Belum ada data anak
            </div>
          )}
        </section>
      </div>
    </>
  );
};
