import { XCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

type AddIngredientFormProps = {
  recipeId: number;
  recipeName: string;
  setFormVisible: (visible: boolean) => void;
  setRecipes: React.Dispatch<React.SetStateAction<any[]>>;
};

const AddIngredientForm: React.FC<AddIngredientFormProps> = ({
  recipeId,
  recipeName,
  setFormVisible,
  setRecipes,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    calories_100g: "",
    protein_100g: "0",
    fat_100g: "0",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.name || !formData.quantity || !formData.calories_100g) {
      toast.error("Please fill in Name, Quantity, and Calories");
      return;
    }

    // We send recipeId inside the object so the backend knows where to link it
    const payload = {
      recipeId: recipeId,
      name: formData.name,
      quantity: formData.quantity,
      calories_100g: formData.calories_100g,
      protein_100g: formData.protein_100g,
      fat_100g: formData.fat_100g,
    };

    toast.promise(
      axios
        .post("http://localhost:8080/ingredient/add-to-recipe", payload)
        .then((res) => {
          // Update local state so the Recipe Card calories update without a refresh
          setRecipes((prev) =>
            prev.map((r) => {
              if (r.id === recipeId) {
                const newIngredientEntry = {
                  ingredient: { calories100g: Number(formData.calories_100g) },
                  quantity: Number(formData.quantity),
                };
                return {
                  ...r,
                  ingredients: r.ingredients
                    ? [...r.ingredients, newIngredientEntry]
                    : [newIngredientEntry],
                };
              }
              return r;
            }),
          );
          setFormVisible(false);
        }),
      {
        loading: "Saving ingredient...",
        success: `Added ${formData.name} to ${recipeName}`,
        error: "Failed to save ingredient",
      },
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-blk-5 border border-border rounded-lg p-8 w-full max-w-md relative shadow-2xl flex flex-col space-y-4"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setFormVisible(false)}
          className="absolute top-4 right-4 text-text-muted hover:text-[#F5CB5C]"
        >
          <XCircleIcon className="w-8 h-8" />
        </button>

        <h2 className="text-2xl font-bold text-center text-text-base">
          Add Ingredient
        </h2>
        <p className="text-center text-text-muted text-sm pb-2">
          Adding to: <span className="text-[#F5CB5C]">{recipeName}</span>
        </p>

        {/* Name Input */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Ingredient Name
          </label>
          <input
            required
            type="text"
            placeholder="e.g. Olive Oil"
            className="w-full px-3 py-2 rounded bg-blk-10 border border-border focus:outline-none focus:ring-1 focus:ring-[#F5CB5C]"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Quantity Input */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Quantity (grams)
          </label>
          <input
            required
            type="number"
            placeholder="e.g. 15"
            className="w-full px-3 py-2 rounded bg-blk-10 border border-border focus:outline-none focus:ring-1 focus:ring-[#F5CB5C]"
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
          />
        </div>

        <div className="border-t border-border my-2"></div>
        <p className="text-[10px] text-center uppercase tracking-widest text-text-muted">
          Nutritional Values (per 100g)
        </p>

        {/* Nutritional Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block mb-1 text-[10px] font-bold text-[#F5CB5C]">
              Calories
            </label>
            <input
              required
              type="number"
              placeholder="kcal"
              className="w-full px-2 py-2 text-sm rounded bg-blk-10 border border-border"
              onChange={(e) =>
                setFormData({ ...formData, calories_100g: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-1 text-[10px] font-bold text-text-muted">
              Protein
            </label>
            <input
              type="number"
              placeholder="g"
              className="w-full px-2 py-2 text-sm rounded bg-blk-10 border border-border"
              onChange={(e) =>
                setFormData({ ...formData, protein_100g: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block mb-1 text-[10px] font-bold text-text-muted">
              Fat
            </label>
            <input
              type="number"
              placeholder="g"
              className="w-full px-2 py-2 text-sm rounded bg-blk-10 border border-border"
              onChange={(e) =>
                setFormData({ ...formData, fat_100g: e.target.value })
              }
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-[#F5CB5C] text-black font-bold rounded hover:bg-[#c9a43e] transition-colors duration-200"
        >
          Save & Link Ingredient
        </button>
      </form>
    </div>
  );
};

export default AddIngredientForm;
