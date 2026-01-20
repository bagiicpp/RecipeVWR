import { XMarkIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { useState } from "react";
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

type AddCustomIngredientFormProps = {
  recipeId: number;
  recipeName: string;
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>;
};

const AddCustomIngredientForm: React.FC<AddCustomIngredientFormProps> = ({
  recipeId,
  recipeName,
  setFormVisible,
  setRecipes,
}) => {
  const [ingredientName, setIngredientName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ingredientName || !calories || !protein || !fat || !quantity) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const payload = {
        // The key 'ingredient' must match the @RequestBody in Java
        ingredient: {
          name: ingredientName, // Ensure this is not empty!
          calories100g: Number(calories),
          protein100g: Number(protein),
          fat100g: Number(fat),
        },
        quantity: Number(quantity),
      };

      try {
        const response = await axios.post(
          `http://localhost:8080/recipe/${recipeId}/ingredients`,
          payload,
        );

        setRecipes((prevRecipes) =>
          prevRecipes.map((r) => (r.id === recipeId ? response.data : r)),
        );

        toast.success("Ingredient added and calories recalculated!");
        setFormVisible(false);
      } catch (err) {
        console.error(err);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        "Failed to add ingredient. Make sure the backend endpoint /recipe/{id}/ingredients exists.",
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 max-w-md w-full relative shadow-2xl">
        <button
          onClick={() => setFormVisible(false)}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-black text-white mb-2">Add Ingredient</h2>
        <p className="text-sm text-gray-400 mb-6">
          Adding to:{" "}
          <span className="text-[#F5CB5C] font-bold">{recipeName}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Ingredient Name
            </label>
            <input
              type="text"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#F5CB5C] focus:outline-none transition-colors placeholder:text-gray-700"
              placeholder="e.g., Chicken Breast"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Calories / 100g
              </label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#F5CB5C] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Quantity (g)
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#F5CB5C] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Protein / 100g
              </label>
              <input
                type="number"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#F5CB5C] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Fat / 100g
              </label>
              <input
                type="number"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#F5CB5C] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => setFormVisible(false)}
              className="flex-1 bg-white/5 border border-white/10 text-gray-400 hover:text-white py-3 rounded-xl transition-all font-bold uppercase tracking-wider text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#F5CB5C] hover:bg-[#F5CB5C]/90 text-black py-3 rounded-xl transition-all font-black uppercase tracking-wider text-sm shadow-lg shadow-[#F5CB5C]/20"
            >
              Add Ingredient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomIngredientForm;
