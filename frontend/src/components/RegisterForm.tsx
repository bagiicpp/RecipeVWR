import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

type formDataType = {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  taste: string;
  dailyCalorieLimit: number | "";
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<formDataType>({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    taste: "",
    dailyCalorieLimit: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields: (keyof formDataType)[] = [
      "name",
      "surname",
      "username",
      "email",
      "password",
      "taste",
    ];
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        return toast.error(
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
        );
      }
    }

    const registerPromise = axios
      .post("http://localhost:8080/users/new", formData)
      .then(() => {
        setFormData({
          name: "",
          surname: "",
          username: "",
          email: "",
          password: "",
          taste: "",
          dailyCalorieLimit: "",
        });
        setTimeout(() => navigate("/login"), 1500);
      });

    toast.promise(registerPromise, {
      loading: "Creating your account...",
      success: "Successfully registered! Redirecting...",
      error: "An error occurred during registration",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-blk-5 border border-border/50 rounded-2xl p-8 lg:p-12 shadow-2xl space-y-6 relative"
      >
        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 flex items-center text-sm text-text-muted hover:text-[#F5CB5C] transition-colors group"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="space-y-2 text-center pt-4">
          <h1 className="text-3xl font-bold tracking-tight text-text-base">
            Create Account
          </h1>
          <p className="text-sm text-text-muted">
            Join RecipeVwr to start saving your favorite meals
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-base ml-1">
                Name
              </label>
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                type="text"
                placeholder="Jane"
                className="w-full px-4 py-2.5 rounded-xl bg-blk-10 border border-border text-text-base focus:ring-2 focus:ring-[#F5CB5C]/20 focus:border-[#F5CB5C] outline-none transition-all placeholder:text-text-muted/30"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-base ml-1">
                Surname
              </label>
              <input
                value={formData.surname}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, surname: e.target.value }))
                }
                type="text"
                placeholder="Doe"
                className="w-full px-4 py-2.5 rounded-xl bg-blk-10 border border-border text-text-base focus:ring-2 focus:ring-[#F5CB5C]/20 focus:border-[#F5CB5C] outline-none transition-all placeholder:text-text-muted/30"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-base ml-1">
                Username
              </label>
              <input
                value={formData.username}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, username: e.target.value }))
                }
                type="text"
                placeholder="janedoe123"
                className="w-full px-4 py-2.5 rounded-xl bg-blk-10 border border-border text-text-base focus:ring-2 focus:ring-[#F5CB5C]/20 focus:border-[#F5CB5C] outline-none transition-all placeholder:text-text-muted/30"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-base ml-1">
                Email
              </label>
              <input
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
                type="email"
                placeholder="jane@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-blk-10 border border-border text-text-base focus:ring-2 focus:ring-[#F5CB5C]/20 focus:border-[#F5CB5C] outline-none transition-all placeholder:text-text-muted/30"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-base ml-1">
              Password
            </label>
            <input
              value={formData.password}
              onChange={(e) =>
                setFormData((p) => ({ ...p, password: e.target.value }))
              }
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-blk-10 border border-border text-text-base focus:ring-2 focus:ring-[#F5CB5C]/20 focus:border-[#F5CB5C] outline-none transition-all placeholder:text-text-muted/30"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-base ml-1">
              Favorite Taste
            </label>
            <select
              value={formData.taste}
              onChange={(e) =>
                setFormData((p) => ({ ...p, taste: e.target.value }))
              }
              className="w-full px-4 py-2.5 rounded-xl bg-blk-10 border border-border text-text-base focus:ring-2 focus:ring-[#F5CB5C]/20 focus:border-[#F5CB5C] outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Select your preference
              </option>
              {["Italian", "Vegetarian", "Chinese", "Sweet", "Healthy"].map(
                (t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ),
              )}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-text-base ml-1">
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
            className="w-full px-4 py-2.5 rounded-xl bg-blk-10 border border-border text-text-base focus:ring-2 focus:ring-[#F5CB5C]/20 focus:border-[#F5CB5C] outline-none transition-all placeholder:text-text-muted/30"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-[#F5CB5C] text-black font-bold rounded-xl shadow-lg shadow-[#F5CB5C]/10 hover:bg-[#e4bc50] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 mt-4"
        >
          Create Account
        </button>

        <p className="text-center text-sm text-text-muted">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-[#F5CB5C] font-semibold hover:underline"
          >
            Log in
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
