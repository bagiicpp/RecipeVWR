import axios from "axios";
import { useEffect, useState, useRef } from "react";
import RecipeCard from "./RecipeCard";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
  creator?: {
    id: number;
    username: string;
  };
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

type recipeDashType = {
  recipes: RecipeType[];
  setRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>;
};

const RecipeDash: React.FC<recipeDashType> = ({ setRecipes, recipes }) => {
  const navigate = useNavigate();

  const [dailyCalories, setDailyCalories] = useState<number>(0);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const stored = JSON.parse(localStorage.getItem("dailyCalories") || "{}");

    setDailyCalories(stored[today] || 0);
  }, []);

  useEffect(() => {
    console.log("Fetching recipes...");
    axios
      .get("http://localhost:8080/recipe/all")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setRecipes(res.data);
          console.log("Recipes set:", res.data);
        } else {
          console.error("Response is not an array:", res.data);
          setRecipes([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching recipes:", err);
        console.error("Error details:", err.response?.data);
        setRecipes([]);
      });
  }, [setRecipes]);

  const hasShownRecommendation = useRef(false);

  useEffect(() => {
    const taste = localStorage.getItem("taste");

    // 1. Guard clauses: Ensure we have data, a preference, and haven't shown it yet this session
    if (!taste || recipes.length === 0 || hasShownRecommendation.current)
      return;

    // 2. Filter logic
    const filtered = recipes.filter((r) => r.taste === taste);

    // 3. Fallback: If no recipes match their taste, pick from all recipes (optional)
    const pool = filtered.length > 0 ? filtered : recipes;
    const randomRecipe = pool[Math.floor(Math.random() * pool.length)];

    // 4. Trigger the toast
    toast(`Recommended for you: ${randomRecipe.name}`, {
      description: `Based on your love for ${taste} food.`,
      duration: 5000,
      action: {
        label: "View Recipe",
        onClick: () => navigate(`/recipe/${randomRecipe.id}`),
      },
    });

    // 5. Mark as shown so it doesn't re-trigger until the next full page reload
    hasShownRecommendation.current = true;
  }, [recipes, navigate]);

  return (
    <div>
      <div className="grid grid-cols-4 container mx-auto gap-10 p-10">
        {recipes.length === 0 ? (
          <div className="col-span-4 text-center text-gray-500">
            No recipes found. Add some recipes to get started!
          </div>
        ) : (
          recipes.map((recipe: RecipeType) => (
            <RecipeCard
              key={recipe.id}
              {...recipe}
              setRecipes={setRecipes}
              setDailyCalories={setDailyCalories}
            />
          ))
        )}
      </div>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-blk-5 border border-border px-8 py-4 rounded-xl shadow-lg text-center z-50">
        <p className="text-sm text-text-muted">Today's intake</p>
        <p className="text-3xl font-bold text-[#F5CB5C]">
          {dailyCalories.toFixed(0)} kcal
        </p>
        <p className="text-xs text-text-muted mt-1">
          Goal: {Number(localStorage.getItem("dailyCalorieLimit") || 0)} kcal
        </p>

        <button
          onClick={() => {
            const today = new Date().toISOString().slice(0, 10);
            const stored = JSON.parse(
              localStorage.getItem("dailyCalories") || "{}",
            );
            stored[today] = 0; // Reset today
            localStorage.setItem("dailyCalories", JSON.stringify(stored));
            setDailyCalories(0); // Update state immediately
            toast.success("Today's calories have been reset");
          }}
          className="ml-4 px-3 py-2 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-all"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default RecipeDash;
