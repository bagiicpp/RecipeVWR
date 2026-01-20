import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import {
  EyeIcon,
  EyeSlashIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

type formDataType = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<formDataType>({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username.trim()) return toast.error("Username is required");
    if (!formData.password.trim()) return toast.error("Password is required");

    const loginPromise = axios
      .post("http://localhost:8080/users/login", formData)
      .then((res) => {
        const user = res.data;

        localStorage.setItem("userId", user.id);
        localStorage.setItem("username", user.username);
        localStorage.setItem(
          "dailyCalorieLimit",
          user.dailyCalorieLimit?.toString() || "0",
        );

        localStorage.setItem("taste", user.taste);

        navigate("/");
        setFormData({ username: "", password: "" });
        return res;
      });

    toast.promise(loginPromise, {
      loading: "Authenticating...",
      success: "Welcome back!",
      error: (err) => err.response?.data?.message || "Invalid credentials",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4 relative">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-blk-5 border border-border/50 rounded-2xl p-8 lg:p-12 shadow-2xl space-y-8 relative"
      >
        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 flex items-center text-sm text-text-muted hover:text-[#F5CB5C] cursor-pointer transition-colors group"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="space-y-2 text-center pt-4">
          <h1 className="text-3xl font-bold tracking-tight text-text-base">
            Welcome back
          </h1>
          <p className="text-sm text-text-muted">
            Enter your details to access your recipes
          </p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-base ml-1">
              Username
            </label>
            <input
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
              type="text"
              placeholder="johndoe"
              className="w-full px-4 py-3 rounded-xl bg-blk-10 border border-border text-text-base transition-all focus:outline-none focus:ring-2 focus:ring-[#F5CB5C]/20 focus:border-[#F5CB5C] placeholder:text-text-muted/50"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-text-base">
                Password
              </label>
            </div>
            <div className="relative">
              <input
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-blk-10 border border-border text-text-base transition-all focus:outline-none focus:ring-2 focus:ring-[#F5CB5C]/20 focus:border-[#F5CB5C] placeholder:text-text-muted/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-base transition-colors"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-[#F5CB5C] text-black font-bold rounded-xl shadow-lg shadow-[#F5CB5C]/10 hover:bg-[#e4bc50] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
        >
          Sign In
        </button>

        <p className="text-center text-sm text-text-muted">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-[#F5CB5C] font-semibold hover:underline cursor-pointer"
          >
            Create one
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
