import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

type FormDataType = {
  id: number;
  name: string;
  description: string;
  category: string;
  date_of_creation: string;
  totalCalories: number;
  taste: string; // ✅ add this
};

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

type EditRecipeFormType = {
  setRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>;
  setEditRecipeForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditRecipeForm: React.FC<FormDataType & EditRecipeFormType> = ({
  id,
  name,
  description,
  category,
  date_of_creation,
  totalCalories,
  setRecipes,
  setEditRecipeForm,
}) => {
  const [formData, setFormData] = useState<FormDataType>({
    id,
    name,
    description,
    category,
    date_of_creation,
    totalCalories,
    taste: "", // or pass in existing taste if you have it
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    const currentUserId = Number(localStorage.getItem("userId")); // grab current user id

    const updatePromise = axios
      .post(
        "http://localhost:8080/recipe/edit",
        {
          id: formData.id,
          name: formData.name,
          description: formData.description,
          category: formData.category,
          totalCalories: Number(formData.totalCalories), // match backend property
          taste: formData.taste,
        },
        {
          params: { userId: currentUserId }, // ✅ send userId as query param
        },
      )
      .then((res) => {
        const updatedRecipe = res.data; // backend returns updated recipe
        setRecipes((prev) =>
          prev.map((r) => (r.id === updatedRecipe.id ? updatedRecipe : r)),
        );
        setEditRecipeForm(false);
      });

    toast.promise(updatePromise, {
      loading: "Saving changes...",
      success: "Recipe updated successfully!",
      error: "Failed to update recipe",
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Glass Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={() => setEditRecipeForm(false)}
      />

      {/* Modal Card */}
      <form
        onSubmit={handleUpdate}
        className="edit-recipe-form relative w-full max-w-lg bg-blk-5 border border-border/50 rounded-3xl p-8 lg:p-10 shadow-2xl space-y-6 flex flex-col overflow-hidden"
      >
        {/* Subtle Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F5CB5C] to-transparent opacity-50" />

        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-text-base tracking-tight">
              Edit Recipe
            </h1>
            <p className="text-xs text-text-muted font-medium uppercase tracking-widest">
              Modifying: {name}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setEditRecipeForm(false)}
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
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-blk-10 border border-border text-text-base focus:ring-2 focus:ring-[#F5CB5C]/20 focus:border-[#F5CB5C] outline-none transition-all resize-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-text-muted ml-1 uppercase tracking-widest">
            Taste
          </label>
          <select
            value={formData.taste}
            onChange={(e) =>
              setFormData((p) => ({ ...p, taste: e.target.value }))
            }
            className="w-full px-4 py-3 rounded-xl bg-blk-10 border border-border text-text-base focus:ring-2 focus:ring-[#F5CB5C]/20 focus:border-[#F5CB5C] outline-none transition-all cursor-pointer"
          >
            <option value="Italian">Italian</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Chinese">Chinese</option>
            <option value="Sweet">Sweet</option>
            <option value="Healthy">Healthy</option>
          </select>
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            type="button"
            onClick={() => setEditRecipeForm(false)}
            className="flex-1 py-4 bg-blk-10 text-text-base font-bold rounded-xl border border-border hover:bg-blk-15 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-[2] py-4 bg-[#F5CB5C] text-black font-black rounded-xl shadow-lg shadow-[#F5CB5C]/10 hover:bg-[#e4bc50] hover:-translate-y-1 transition-all duration-200 uppercase tracking-widest"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm;
