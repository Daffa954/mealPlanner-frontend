// state
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../apis/apiService";

export const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Register";
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await register(name, email, password);
      if (response.status == 200) {
        console.log(response.data);
        
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("token", response.data.response.token);
        navigate("/userView");
      }
    } catch {
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center px-5">
      <form
        className="w-full md:w-[40%] bg-white rounded-2xl shadow-xl p-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-semibold text-center text-[#7B5E3C] mb-6">
          Register
        </h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label htmlFor="" className="mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={handleNameChange}
              className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7B5E3C] focus:border-transparent transition"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Username"
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
        </div>
      </form>
    </div>
  );
};
