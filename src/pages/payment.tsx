import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavbarUser } from "../components/navbar_user";
import { FooterWebsite } from "../components/footer_web";
import { getUserProfile, paymentCredit } from "../apis/apiService";
import card from "../assets/CC.svg";

// Define types for your component
type Plan = {
  name: string;
  price: number;
  credits: number;
};

type FormData = {
  cardNumber: string;
  expirationDate: string;
  cvv: string;
};

export const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState<FormData>({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });
  const [name, setName] = useState<string>("");
  const [credit, setCredit] = useState<number>(0);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    document.title = "Pembayaran";
    if (!token) {
      navigate("/login");
    }

    // Get plan data from URL params
    const searchParams = new URLSearchParams(location.search);
    const plan = searchParams.get("plan");
    const price = searchParams.get("price");
    const credits = searchParams.get("credits");

    if (plan && price && credits) {
      setSelectedPlan({
        name: plan,
        price: parseInt(price),
        credits: parseInt(credits),
      });
      console.log("plan" + plan);
    } else {
      navigate("/");
    }

    getProfile();
  }, [token, location.search, navigate]);

  const getProfile = async () => {
    try {
      const response = await getUserProfile(token ? token : "");
      if (response.status === 200) {
        setName(response.data.data.name);
        setCredit(response.data.data.credit);
      }
    } catch {
      console.log("Failed to get profile");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Format card number with spaces every 4 digits
    if (name === "cardNumber") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    try {
      // Bersihkan data sebelum dikirim
      const payload = {
        plan: selectedPlan,
        cardData: {
          cardNumber: formData.cardNumber.replace(/\s/g, ""), // Hapus spasi
          expirationDate: formData.expirationDate,
          cvv: formData.cvv,
        },
      };

      console.log("Data yang dikirim:", payload); // Untuk debugging

      const response = await paymentCredit(token || "", payload);

      if (response.status == 200) {
        alert(`Pembayaran untuk paket ${selectedPlan.name} berhasil!`);
        getProfile();
      } else {
        alert( "Pembayaran gagal");
      }
    } catch (error: any) {
      console.error("Error detail:", error.response?.data);
      alert(
        error.response?.data?.message ||
          "Terjadi kesalahan saat memproses pembayaran"
      );
    }
  };
  if (!selectedPlan) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarUser name={name} credit={credit.toString()} />

      <section className="flex flex-col items-center justify-center pt-12 px-4 mb-20">
        <h1 className="text-3xl font-bold text-center mb-2">Pembayaran</h1>
        <p className="text-2xl font-medium text-[#4BA095] mt-8 mb-8">
          Total: Rp{selectedPlan.price.toLocaleString("id-ID")}
        </p>

        {/* New container for side-by-side layout */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-4xl">
          {/* Credit Card on the left */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              <img
                src={card}
                alt="Credit Card"
                className="w-full max-w-xs h-auto shadow-xl rounded-xl"
              />
              {/* Optional: Overlay card details dynamically */}
              {formData.cardNumber && (
                <div className="absolute top-1/2 left-0 right-0 text-center text-white font-mono">
                  {formData.cardNumber || "•••• •••• •••• ••••"}
                </div>
              )}
            </div>
          </div>

          {/* Form on the right */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Detail Kartu Kredit</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nomor Kartu
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4BA095]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label
                    htmlFor="expirationDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Masa Berlaku (MM/YY)
                  </label>
                  <input
                    type="text"
                    id="expirationDate"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4BA095]"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    CVV/CVC
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4BA095]"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#4BA095] text-white py-2 px-4 rounded-md hover:bg-[#3a7d74] focus:outline-none focus:ring-2 focus:ring-[#4BA095] focus:ring-offset-2"
              >
                Bayar Sekarang
              </button>
            </form>
          </div>
        </div>
      </section>

      <FooterWebsite />
    </div>
  );
};
