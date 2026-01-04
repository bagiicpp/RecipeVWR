import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";

type formDataType = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<formDataType>({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username.trim()) return toast.error("Username is required");
    if (!formData.password.trim()) return toast.error("Password is required");

    toast.promise(
      axios
        .post("http://localhost:8080/users/login", formData)
        .then((res) => {
          const user = res.data;
          localStorage.setItem("username", user.username);
          localStorage.setItem("taste", user.taste);
          navigate("/");
          setFormData({ username: "", password: "" });
        })
        .catch((err) => {
          console.error(err);
          toast.error("Invalid username or password");
        }),
      {
        loading: "Logging in...",
        success: "Successfully logged in!",
        error: "Invalid username or password",
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blk-5 rounded-lg py-10 px-14 space-y-6 flex flex-col max-w-md mx-auto"
    >
      <h1 className="text-xl text-center">Login</h1>

      <div>
        <label className="block mb-2 font-medium">Username</label>
        <input
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          type="text"
          placeholder="Enter your username"
          className="w-full px-3 py-2 rounded bg-blk-10 border border-border transition-all duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-[#808080]"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Password</label>
        <input
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          type="password"
          placeholder="Enter your password"
          className="w-full px-3 py-2 rounded bg-blk-10 border border-border transition-all duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-[#808080]"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-[#F5CB5C] text-gray-900 font-bold rounded hover:bg-[#c9a43e] transition-all duration-200 ease-in-out cursor-pointer"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
