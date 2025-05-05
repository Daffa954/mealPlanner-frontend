// src/api/askAI.ts
import axios from "axios";
import {
  AddChildrenRequest,
  
  CreateScheduleRequest,
  RecipeResponse,
} from "../models/Recip";

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

export const getUserProfile = async (token: string) => {
  try {
    return axios.get("http://localhost:3000/api/getProfile", {
      headers: {
        "X-API-TOKEN": token,
      },
    });
  } catch (error) {
    console.error("Error calling AI API:", error);
    throw error;
  }
};

export const getAllChildrens = async (token: string) => {
  try {
    return axios.get("http://localhost:3000/api/getAllChildrens", {
      headers: {
        "X-API-TOKEN": token,
      },
    });
  } catch (error) {
    console.error("Error calling AI API:", error);
    throw error;
  }
};

export const getChildren = async (token: string, id: string) => {
  try {
    return axios.get(`http://localhost:3000/api/getChildren/${id}`, {
      headers: {
        "X-API-TOKEN": token,
      },
    });
  } catch (error) {
    console.error("Error calling AI API:", error);
    throw error;
  }
};

export const createRecipe = async (
  token: string,
  recipeResponse: RecipeResponse
) => {
  try {
    return axios.post("http://localhost:3000/api/addRecipe", recipeResponse, {
      headers: {
        "X-API-TOKEN": token,
      },
    });
  } catch (error) {
    console.error("Error calling AI API:", error);
    throw error;
  }
};

export const createSchedule = async (
  token: string,
  createRequest: CreateScheduleRequest
) => {
  try {
    return axios.post("http://localhost:3000/api/schedules", createRequest, {
      headers: {
        "X-API-TOKEN": token,
      },
    });
  } catch (error) {
    console.error("Error calling AI API:", error);
    throw error;
  }
};

export const addChildren = async (
  token: string,
  addChildrenRequest: AddChildrenRequest
) => {
  try {
    return axios.post(
      "http://localhost:3000/api/addChildren",
      addChildrenRequest,
      {
        headers: {
          "X-API-TOKEN": token,
        },
      }
    );
  } catch (error) {
    console.error("Error calling AI API:", error);
    throw error;
  }
};
