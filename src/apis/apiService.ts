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

export const askAIAPI = async (formData: FormData) => {
  try {
    return axios.post("http://localhost:3000/api/deepseek", formData);
  } catch (error) {
    console.error("Error calling AI API:", error);
    throw error;
  }
};
