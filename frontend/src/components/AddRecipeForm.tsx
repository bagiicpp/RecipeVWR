import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

type RecipeType = {
  id: number;
  name: string;
  description: string;
  category: string;
  date_of_creation: string;
  rating: number;
  taste: string;
  totalCalories?: number;
  ingredients?: RecipeIngredient[];
};
type NumericValue = {
  source: string;
  parsedValue: number;
};

type Ingredient = {
  id: number;
  name: string;
  calories100g: number | NumericValue;
  protein100g?: number | NumericValue;
  fat100g?: number | NumericValue;
};

type RecipeIngredient = {
  ingredient: Ingredient;
  quantity: number | NumericValue;
};

type AddRecipeFormType = {
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  formVisible: boolean;
  setRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>;
};

type formDataType = {
  name: string;
  description: string;
  category: string;
  taste: string;
  total_calories: number;
};

const AddRecipeForm: React.FC<AddRecipeFormType> = ({
  setFormVisible,
  setRecipes,
}) => {
  const [formData, setFormData] = useState<formDataType>({
    name: "",
    description: "",
    category: "Breakfast",
    taste: "",
    total_calories: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return toast.error("Recipe name is required");

    const currentUserId = Number(localStorage.getItem("userId"));

    const addPromise = axios
      .post(
        "http://localhost:8080/recipe/new",
        formData, // body
        { params: { userId: currentUserId } }, // query param
      ).then((res) => {
        setRecipes((prev) => [...prev, res.data]);
        setFormVisible(false);
      });

    toast.promise(addPromise, {
      loading: "Creating recipe...",
      success: "Recipe added successfully!",
      error: "Failed to add recipe",
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={() => setFormVisible(false)}
      />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-lg bg-blk-5 border border-border/50 rounded-3xl p-8 shadow-2xl space-y-6 flex flex-col"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-black text-text-base tracking-tight">
            New Recipe
          </h1>
          <button
            type="button"
            onClick={() => setFormVisible(false)}
            className="p-2 rounded-full hover:bg-blk-10 text-text-muted hover:text-[#F5CB5C] transition-all"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-muted ml-1 uppercase tracking-widest">
                Name
              </label>
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                type="text"
                placeholder="Golden Pancakes"
                className="w-full px-4 py-3 rounded-xl bg-blk-10 border border-border text-text-base focus:ring-2 focus:ring-[#F5CB5C]/20 focus:border-[#F5CB5C] outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-muted ml-1 uppercase tracking-widest">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, category: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl bg-blk-10 border border-border text-text-base focus:ring-2 focus:ring-[#F5CB5C]/20 focus:border-[#F5CB5C] outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-muted ml-1 uppercase tracking-widest">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((p) => ({ ...p, description: e.target.value }))
              }
              placeholder="Tell us about this dish..."
              className="w-full px-4 py-3 rounded-xl bg-blk-10 border border-border text-text-base focus:ring-2 focus:ring-[#F5CB5C]/20 focus:border-[#F5CB5C] outline-none transition-all h-28 resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-muted ml-1 uppercase tracking-widest">
              Taste Profile
            </label>
            <select
              value={formData.taste}
              onChange={(e) =>
                setFormData((p) => ({ ...p, taste: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-xl bg-blk-10 border border-border text-text-base focus:ring-2 focus:ring-[#F5CB5C]/20 focus:border-[#F5CB5C] outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Select flavor
              </option>
              <option value="Italian">Italian</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Chinese">Chinese</option>
              <option value="Sweet">Sweet</option>
              <option value="Healthy">Healthy</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-[#F5CB5C] text-black font-black rounded-xl shadow-lg shadow-[#F5CB5C]/10 hover:bg-[#e4bc50] hover:-translate-y-1 transition-all duration-200 mt-2 uppercase tracking-widest"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
