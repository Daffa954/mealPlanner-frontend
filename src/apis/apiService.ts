// src/api/askAI.ts
import axios from "axios";
import {
  AddChildrenRequest,
  Child,
  CreateScheduleRequest,
  RecipeResponse,
  Schedule,
  PaymentRequest,
  Plan,
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
export const generateBeforeAPI = async (token: string) => {
  try {
    return axios.get("http://localhost:3000/api/generateBeforeChecking", {
      headers: {
        "X-API-TOKEN": token,
      },
    });
  } catch (error) {
    console.error("Error calling AI API:", error);
    throw error;
  }
};
export const generateAfterAPI = async (token: string) => {
  try {
    return axios.get("http://localhost:3000/api/generateAfterChecking", {
      headers: {
        "X-API-TOKEN": token,
      },
    });
  } catch (error) {
    console.error("Error calling AI API:", error);
    throw error;
  }
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

export const getAllSchedules = async (token: string) => {
  try {
    return axios.get("http://localhost:3000/api/schedules", {
      headers: {
        "X-API-TOKEN": token,
      },
    });
  } catch (error) {
    console.error("Error calling AI API:", error);
    throw error;
  }
};
// export const paymentCredit = async (token: string, paymentRequest: PaymentRequest) => {
//   try {
//     return axios.post(
//       "http://localhost:3000/api/payment",
//       {
//         paymentRequest,
//       },
//       {
//         headers: {
//           "X-API-TOKEN": token,
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Error calling AI API:", error);
//     throw error;
//   }
// }
// apiService.ts
export const paymentCredit = async (
  token: string,
  data: {
    plan: Plan;
    cardData: {
      cardNumber: string;
      expirationDate: string;
      cvv: string;
    };
  }
) => {
  const response = await axios.post("http://localhost:3000/api/payment", data, {
    headers: {
      "X-API-TOKEN": token,
    },
  });
  return response;
};
// utils/sorting.ts
export interface DateGroupedSchedule {
  date: string;
  children: {
    child: Child;
    schedules: Schedule[];
  }[];
}

export const groupSchedulesByDate = (
  schedules: Schedule[]
): DateGroupedSchedule[] => {
  // 1. Group by date
  const groupedByDate = schedules.reduce((acc, schedule) => {
    const dateKey = new Date(schedule.date).toISOString().split("T")[0]; // Normalisasi tanggal
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(schedule);
    return acc;
  }, {} as Record<string, Schedule[]>);

  // 2. Sort dates
  const sortedDates = Object.keys(groupedByDate).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  // 3. Group by child within each date
  return sortedDates.map((date) => {
    const schedulesForDate = groupedByDate[date];

    // Group by child
    const groupedByChild = schedulesForDate.reduce((acc, schedule) => {
      const childId = schedule.childId;
      if (!acc[childId]) {
        acc[childId] = {
          child: schedule.child,
          schedules: [],
        };
      }
      acc[childId].schedules.push(schedule);
      return acc;
    }, {} as Record<number, { child: Child; schedules: Schedule[] }>);

    return {
      date,
      children: Object.values(groupedByChild).sort((a, b) =>
        a.child.name.localeCompare(b.child.name)
      ),
    };
  });
};
