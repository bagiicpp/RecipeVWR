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

type HeaderType = {
  setRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>;
};

const CategoryToggle: React.FC<HeaderType> = ({ setRecipes }) => {
  const [active, setActive] = useState<string>("");

  const categories = ["Breakfast", "Lunch", "Dinner", "Snack"];

  const handleCategoryClick = (category: string) => {
    // If clicking the already active category, reset to "All"
    const isDeactivating = active === category;
    const nextCategory = isDeactivating ? "" : category;

    setActive(nextCategory);

    const url = isDeactivating
      ? `http://localhost:8080/recipe/all`
      : `http://localhost:8080/recipe/category/${category}`;

    const loadingMsg = isDeactivating
      ? "Loading all recipes..."
      : `Fetching ${category}...`;
    const successMsg = isDeactivating
      ? "Showing all recipes"
      : `Filtered by ${category}`;

    toast.promise(
      axios.get(url).then((res) => setRecipes(res.data)),
      {
        loading: loadingMsg,
        success: successMsg,
        error: "Failed to update recipes",
      },
    );
  };

  return (
    <div className="flex items-center p-1.5 bg-blk-10 border border-border/50 rounded-2xl shadow-inner">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleCategoryClick(cat)}
          className={`
            relative px-5 py-2 text-sm font-bold rounded-xl transition-all duration-300 ease-out
            ${active === cat
              ? "bg-[#F5CB5C] text-black shadow-md scale-105 z-10"
              : "text-text-muted hover:text-text-base hover:bg-blk-15"
            }
          `}
        >
          {cat}
          {/* Subtle dot indicator for active state */}
          {active === cat && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
};

export default CategoryToggle;
