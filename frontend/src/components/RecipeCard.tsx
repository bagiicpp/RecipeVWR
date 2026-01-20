import {
  TrashIcon,
  PencilIcon,
  EyeIcon,
  PlusIcon,
  FireIcon,
} from "@heroicons/react/16/solid";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import EditRecipeForm from "./EditRecipeForm";
import { NavLink } from "react-router-dom";
import RecipeRate from "./RecipeRate";
import AddCustomIngredientForm from "./AddCustomIngredientForm";

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

type RecipeType = {
  id: number;
  name: string;
  description: string;
  category: string;
  date_of_creation: string;
  rating: number;
  taste: string;
  totalCalories?: number;
  total_calories?: number;
  ingredients?: RecipeIngredient[];
  creator?: {
    id: number;
    username: string;
  };
};

type RecipeCardProps = RecipeType & {
  setRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>;
  setDailyCalories: React.Dispatch<React.SetStateAction<number>>;
};

const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  name,
  description,
  category,
  date_of_creation,
  rating,
  taste,
  ingredients,
  totalCalories,
  creator,
  setRecipes,
  setDailyCalories,
}) => {
  const [editRecipeForm, setEditRecipeForm] = useState(false);
  const [addIngredientForm, setAddIngredientForm] = useState(false);
  const [currentRating, setCurrentRating] = useState(rating || 0);

  const currentUsername = localStorage.getItem("username");

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  const getValue = (val: any): number => {
    if (val === null || val === undefined) return 0;
    if (typeof val === "number") return val;
    if (typeof val === "string") return parseFloat(val) || 0;
    if (typeof val === "object" && "parsedValue" in val) return val.parsedValue;
    return 0;
  };

  const backendCalories = getValue(totalCalories);

  const calories =
    backendCalories > 0
      ? backendCalories
      : (ingredients || []).reduce((sum, ri) => {
        const kcalPer100 = getValue(ri.ingredient?.calories100g);
        const weight = getValue(ri.quantity);
        return sum + (kcalPer100 * weight) / 100;
      }, 0);

  const handleEatenMeal = () => {
    const today = new Date().toISOString().slice(0, 10);
    const stored = JSON.parse(localStorage.getItem("dailyCalories") || "{}");
    stored[today] = (stored[today] || 0) + calories;
    localStorage.setItem("dailyCalories", JSON.stringify(stored));

    setDailyCalories(stored[today]);

    toast.success(`Tracked: +${calories.toFixed(0)} kcal for today`);
  };

  const handleDelete = () => {
    const currentUserId = Number(localStorage.getItem("userId"));

    toast.promise(
      axios
        .delete(`http://localhost:8080/recipe/${id}`, {
          params: { userId: currentUserId },
        })
        .then(() => {
          setRecipes((prev) => prev.filter((r) => r.id !== id));
        }),
      {
        loading: `Deleting ${name}...`,
        success: `Deleted ${name}`,
        error: `Could not delete ${name}`,
      },
    );
  };

  const handleEdit = () => setEditRecipeForm(true);

  return (
    <>
      <div className="group relative bg-black/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#F5CB5C]/30 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#F5CB5C]/5 rounded-full blur-3xl group-hover:bg-[#F5CB5C]/10 transition-colors" />

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-[#F5CB5C] font-bold">
              {category}
            </span>
            <div className="flex items-center text-[#F5CB5C] bg-[#F5CB5C]/10 px-2 py-1 rounded-lg">
              <FireIcon className="w-4 h-4 mr-1" />
              <span className="text-xs font-bold">
                {calories.toFixed(0)} kcal
              </span>
            </div>
          </div>

          <h1 className="text-2xl font-black text-white leading-tight mb-2 group-hover:text-[#F5CB5C] transition-colors">
            {name}
          </h1>
          <p className="text-sm text-gray-400 line-clamp-2 mb-2 italic">
            "{description}"
          </p>
          <p className="text-xs text-gray-400 mb-2">
            Creator: {creator?.username || "Unknown"}
          </p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-gray-400 bg-white/5 px-2 py-1 rounded-md">
              #{taste}
            </span>
            <div className="text-right text-[10px] uppercase text-gray-400 font-bold tracking-tighter">
              Avg Rating:{" "}
              <span className="text-white text-xs">
                {currentRating || "0.0"}
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-4">
          <RecipeRate
            id={id}
            name={name}
            setCurrentRating={setCurrentRating}
            setRecipes={setRecipes}
          />

          <div className="flex items-center gap-2 pt-4 border-t border-white/10">
            <button
              onClick={handleEatenMeal}
              className="flex-1 bg-green-500 hover:bg-green-400 text-black text-xs font-black py-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center uppercase tracking-wider"
            >
              I Ate This
            </button>

            <div className="flex gap-1.5">
              <NavLink
                to={`/recipe/${id}`}
                className="p-2.5 bg-white/5 border border-white/10 hover:border-[#F5CB5C] text-gray-400 hover:text-[#F5CB5C] rounded-xl transition-all"
                title="View"
              >
                <EyeIcon className="w-4 h-4" />
              </NavLink>

              {/* Only show Edit/Delete if it's your recipe */}
              {creator?.username === currentUsername && (
                <>
                  <button
                    onClick={handleEdit}
                    className="p-2.5 bg-white/5 border border-white/10 hover:border-[#F5CB5C] text-gray-400 hover:text-[#F5CB5C] rounded-xl transition-all"
                    title="Edit"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleDelete}
                    className="p-2.5 bg-white/5 border border-white/10 hover:border-red-500/50 text-gray-400 hover:text-red-400 rounded-xl transition-all"
                    title="Delete"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          <p className="text-[10px] text-center text-gray-500 pt-1 uppercase tracking-widest font-bold">
            Created: {date_of_creation}
          </p>
        </div>

        {creator?.username === currentUsername && (
          <button
            onClick={() => setAddIngredientForm(true)}
            className="absolute -right-2 -bottom-2 w-12 h-12 bg-white/5 border border-white/10 rounded-tl-3xl flex items-center justify-center text-gray-400 hover:text-green-400 transition-colors group-hover:border-[#F5CB5C]/50"
            title="Add Ingredient"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        )}
      </div>

      {editRecipeForm && (
        <EditRecipeForm
          id={id}
          name={name}
          description={description}
          category={category}
          date_of_creation={date_of_creation}
          setRecipes={setRecipes}
          setEditRecipeForm={setEditRecipeForm}
          totalCalories={totalCalories || 0}
          taste={taste}
        />
      )}

      {addIngredientForm && (
        <AddCustomIngredientForm
          recipeId={id}
          recipeName={name}
          setFormVisible={setAddIngredientForm}
          setRecipes={setRecipes}
        />
      )}
    </>
  );
};

export default RecipeCard;
