// state
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile, login } from "../apis/apiService";
import { NavbarUser } from "../components/navbar_user";

export const Login = () => {
  const [nameUser, setNameUser] = useState("");
    const [credit, setCredit] = useState(0);
    const token = sessionStorage.getItem("token");
    const emailUser = sessionStorage.getItem("email");
  
    // useEffect(() => {
    //   document.title = "Home";
    //   //check the token and email
    //   if (!token || !emailUser) {
    //     window.location.href = "/login";
    //   }
    //   getProfile();
    // }, [token, emailUser]);
  
    const getProfile = async () => {
      try {
        const response = await getUserProfile(token ? token : "");
        if (response.status == 200) {
          setNameUser(response.data.data.name);
          setCredit(response.data.data.credit);
        }
      } catch {
        console.log("Login failed. Please check your email and password.");
      }
    };
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Login";
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.status == 200) {
        console.log(response.data);
        // console.log(response.data.token);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("token", response.data.response.token);
        navigate("/userViews");
      }
    } catch {
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="w-full">
          {/* Header */}
          {/* <NavbarUser
            name={nameUser}
            credit={credit.toString()} /> */}
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center px-5">
      <form
        className="w-full md:w-[40%] bg-white rounded-2xl shadow-xl p-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-semibold text-center text-[#7B5E3C] mb-6">
          Login
        </h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label htmlFor="" className="mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7B5E3C] focus:border-transparent transition"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="password"
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7B5E3C] focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            className="bg-[#7B5E3C] text-white py-3 rounded-lg hover:bg-[#9C7248] transition font-medium"
          >
            Login
          </button>
          
          <Link to="/register" className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
          </Link>
          
        </div>
      </form>
    </div>
    </div>
  );
};
