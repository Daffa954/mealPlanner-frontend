import { useEffect, useState } from "react";
import {
  DateGroupedSchedule,
  getAllSchedules,
  getUserProfile,
  groupSchedulesByDate,
} from "../apis/apiService";
import { NavbarUser } from "../components/navbar_user";
import { Schedule, GroupedSchedule } from "../models/Recip"; // Pastikan interface GroupedSchedule ada
import MealScheduleCard from "../components/scheduleCard";
export const ListScheduleView = () => {
  const token = sessionStorage.getItem("token");
  const email = sessionStorage.getItem("email");
  const [name, setName] = useState("");
  const [credit, setCredit] = useState(0);
  const [groupedSchedules, setGroupedSchedules] = useState<
    DateGroupedSchedule[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "List Schedule";

    if (!token || !email) {
      window.location.href = "/login";
    }

    const fetchData = async () => {
      try {
        const [profileRes, schedulesRes] = await Promise.all([
          getUserProfile(token!),
          getAllSchedules(token!),
        ]);

        if (profileRes.status === 200) {
          setName(profileRes.data.data.name);
          setCredit(profileRes.data.data.credit);
        }
        // Pada saat fetch data:
        if (schedulesRes.status === 200) {
          const rawData = schedulesRes.data.schedules || [];
          const groupedData = groupSchedulesByDate(rawData);
          setGroupedSchedules(groupedData);
        }
      } catch (error) {
        setError("Gagal memuat data jadwal");
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, email]);

  return (
    <div className="w-full min-h-screen bg-gray-100 pb-8">
      <NavbarUser name={name} credit={credit.toString()} />

      <section className="flex flex-col items-center justify-center pt-12 px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl font-medium text-center mb-6 md:mb-8">
          Jadwal,{" "}
          <span className="text-2xl md:text-3xl font-bold text-[#4BA095]">
            Jadwal
          </span>
        </h1>
      </section>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-auto max-w-md text-center mb-6">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4BA095] mx-auto"></div>
        </div>
      ) : (
        // Di bagian render:
        <section className="space-y-8 px-4 md:px-8">
          {groupedSchedules.map((dateGroup) => (
            <div
              key={dateGroup.date}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              {/* Header Tanggal */}
              <div className="mb-6 border-b pb-4">
                <h2 className="text-xl font-semibold text-[#4BA095]">
                  {new Date(dateGroup.date).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h2>
              </div>

              {/* List Anak dalam Tanggal Tersebut */}
              <div className="space-y-6">
                {dateGroup.children.map((childGroup) => (
                  <div
                    key={childGroup.child.id}
                    className="border-b last:border-b-0 pb-6 last:pb-0"
                  >
                    {/* Header Anak */}
                    <div className="mb-4">
                      <h3 className="font-medium text-gray-800">
                        {childGroup.child.name}
                        <span className="ml-2 text-sm text-gray-500">
                          ({childGroup.child.age} tahun)
                        </span>
                      </h3>
                    </div>

                    {/* List Jadwal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {childGroup.schedules.map((schedule) => (
                        <MealScheduleCard
                          key={schedule.id}
                          schedule={schedule}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
