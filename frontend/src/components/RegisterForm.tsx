import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

type formDataType = {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  taste: string;
};

const RegisterForm = () => {
  const [formData, setFormData] = useState<formDataType>({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    taste: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim()) return toast.error("Name is required");
    if (!formData.surname.trim()) return toast.error("Surname is required");
    if (!formData.username.trim()) return toast.error("Username is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password.trim()) return toast.error("Password is required");

    toast.promise(
      axios
        .post("http://localhost:8080/users/new", formData)
        .then((res) => {
          setFormData({
            name: "",
            surname: "",
            username: "",
            email: "",
            password: "",
            taste: ""
          });
        })
        .catch((err) => {
          console.error(err);
          toast.error("An error occurred while registering");
        }),
      {
        loading: "Registering...",
        success: "Successfully registered!",
        error: "An error occurred",
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blk-5 rounded-lg py-10 px-14 space-y-6 flex flex-col max-w-md mx-auto"
    >
      <h1 className="text-xl text-center">Register</h1>

      <div>
        <label className="block mb-2 font-medium">Name</label>
        <input
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          type="text"
          placeholder="Enter your name"
          className="w-full px-3 py-2 rounded bg-blk-10 border border-border transition-all duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-[#808080]"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Surname</label>
        <input
          value={formData.surname}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, surname: e.target.value }))
          }
          type="text"
          placeholder="Enter your surname"
          className="w-full px-3 py-2 rounded bg-blk-10 border border-border transition-all duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-[#808080]"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Username</label>
        <input
          value={formData.username}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          type="text"
          placeholder="Enter username"
          className="w-full px-3 py-2 rounded bg-blk-10 border border-border transition-all duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-[#808080]"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Email</label>
        <input
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          type="email"
          placeholder="Enter your email"
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
          placeholder="Enter password"
          className="w-full px-3 py-2 rounded bg-blk-10 border border-border transition-all duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-[#808080]"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Favorite taste</label>

        <select
          value={formData.taste}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, taste: e.target.value }))
          }
          className="w-full px-3 py-2 rounded bg-blk-10 border border-border 
                    transition-all duration-200 ease-in-out
                    focus:outline-none focus:ring-1 focus:ring-[#808080]"
        >
          <option value="">Select your taste</option>
          <option value="ITALIAN">Italian</option>
          <option value="VEGETARIAN">Vegetarian</option>
          <option value="CHINESE">Chinese</option>
          <option value="SWEET">Sweet</option>
          <option value="HEALTHY">Healthy</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-[#F5CB5C] text-gray-900 font-bold rounded hover:bg-[#c9a43e] transition-all duration-200 ease-in-out cursor-pointer"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
