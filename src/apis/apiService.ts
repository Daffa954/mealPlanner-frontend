// src/api/askAI.ts
import axios from "axios";

export type FormData = {
  usia: string;
  lokasi: {
    kota: string;
    provinsi: string;
  };
  alergen: string[];
  bahanTersedia: string[];
  tipe: string;
};

export const askAIAPI = async (formData: FormData, token: string) => {
  try {
    return axios.post("http://localhost:3000/api/deepseek", formData, {
      headers: {
        "X-API-TOKEN": token,
      },
    });
  } catch (error) {
    console.error("Error calling AI API:", error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    return axios.post("http://localhost:3000/api/login", {
      email,
      password,
    });
  } catch (error) {
    console.error("Error calling AI API:", error);
    throw error;
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    return axios.post("http://localhost:3000/api/register", {
      name,
      email,
      password,
    });
  } catch (error) {
    console.error("Error calling AI API:", error);
    throw error;
  }
};
