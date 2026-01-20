import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeftIcon,
  UserCircleIcon,
  LockClosedIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

type UserForm = {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  taste: string;
  dailyCalorieLimit: number | "";
};

const Account = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState<UserForm>({
    username: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    taste: "",
    dailyCalorieLimit: "",
  });

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8080/users/${userId}`)
      .then((res) => {
        setFormData({
          ...res.data,
          dailyCalorieLimit: res.data.dailyCalorieLimit || "",
        });
      })
      .catch(() => toast.error("Failed to load account"));
  }, [userId, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatePromise = axios
      .put(`http://localhost:8080/users/${userId}`, formData)
      .then((res) => {
        const updatedUser = res.data;

        // Update localStorage
        localStorage.setItem("username", updatedUser.username);
        localStorage.setItem("taste", updatedUser.taste);
        localStorage.setItem(
          "dailyCalorieLimit",
          updatedUser.dailyCalorieLimit?.toString() || "0",
        );

        return res;
      });

    toast.promise(updatePromise, {
      loading: "Saving changes...",
      success: "Account updated successfully",
      error: "Failed to update account",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-[#0A0A0A] text-white selection:bg-[#F5CB5C]/30">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-2xl bg-black/40 backdrop-blur-2xl
               border border-white/10 rounded-[2.5rem]
               p-8 lg:p-14 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]
               space-y-12"
      >
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute top-8 left-8 flex items-center text-[10px] font-black uppercase tracking-[0.2em]
                 text-white/40 hover:text-[#F5CB5C]
                 transition-all group"
        >
          <ChevronLeftIcon className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="relative text-center space-y-3 pt-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br from-[#F5CB5C] to-[#e4bc50] mb-4 shadow-xl shadow-[#F5CB5C]/20">
            <UserCircleIcon className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-white">
            Profile <span className="text-[#F5CB5C]">Settings</span>
          </h1>
          <p className="text-sm font-medium text-white/40 tracking-wide uppercase">
            Personalize your culinary experience
          </p>
        </div>

        {/* Form Sections */}
        <div className="space-y-8">
          {/* Username & Taste */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F5CB5C] ml-1">
                Display Name
              </label>
              <input
                value={formData.username}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, username: e.target.value }))
                }
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#F5CB5C]/50 focus:ring-1 focus:ring-[#F5CB5C]/50 transition-all placeholder:text-white/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F5CB5C] ml-1">
                Taste Preference
              </label>
              <div className="relative group">
                <select
                  value={formData.taste}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, taste: e.target.value }))
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white appearance-none cursor-pointer focus:outline-none focus:border-[#F5CB5C]/50 transition-all"
                >
                  {["Italian", "Vegetarian", "Chinese", "Sweet", "Healthy"].map(
                    (t) => (
                      <option
                        key={t}
                        value={t}
                        className="bg-[#1A1A1A] text-white"
                      >
                        {t}
                      </option>
                    ),
                  )}
                </select>
                <SparklesIcon className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5CB5C] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Real Names & Daily Calorie Limit */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">
                First Name
              </label>
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/30 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">
                Last Name
              </label>
              <input
                value={formData.surname}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, surname: e.target.value }))
                }
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/30 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">
                Daily Calorie Limit
              </label>
              <input
                type="number"
                min={0}
                value={formData.dailyCalorieLimit}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    dailyCalorieLimit: Number(e.target.value),
                  }))
                }
                placeholder="2000"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/30 transition-all"
              />
            </div>
          </div>

          {/* Email & Password */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/30 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">
                Security
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, password: e.target.value }))
                  }
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10"
                />
                <LockClosedIcon className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              </div>
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest ml-1">
                Leave blank to keep your current password
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className="w-full py-5 rounded-[2rem]
                   bg-[#F5CB5C] text-black font-black uppercase tracking-[0.25em] text-xs
                   shadow-[0_20px_40px_-10px_rgba(245,203,92,0.3)]
                   hover:bg-white hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)]
                   hover:-translate-y-1 active:scale-95
                   transition-all duration-300"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Account;
