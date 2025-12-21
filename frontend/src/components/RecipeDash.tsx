import axios from "axios";
import { useEffect } from "react";
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
};

type recipeDashType = {
  recipes: RecipeType[];
  setRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>;
};

const RecipeDash: React.FC<recipeDashType> = ({ setRecipes, recipes }) => {
  const navigate = useNavigate();

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

  useEffect(() => {
    const taste = localStorage.getItem("taste");
    if (!taste || recipes.length === 0) return;

    const filtered = recipes.filter((r) => r.taste === taste);
    if (!filtered.length) return;

    const randomRecipe = filtered[Math.floor(Math.random() * filtered.length)];

    toast(`Recommended for you: ${randomRecipe.name}`, {
      action: {
        label: "View Recipe",
        onClick: () => navigate(`/recipe/${randomRecipe.id}`),
      },
    });
  }, [recipes, navigate]);

  return (
    <div>
      <div className="grid grid-cols-5 container mx-auto gap-10 p-10">
        {recipes.length === 0 ? (
          <div className="col-span-5 text-center text-text-muted">
            No recipes found. Add some recipes to get started!
          </div>
        ) : (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              name={recipe.name}
              description={recipe.description}
              category={recipe.category}
              rating={recipe.rating}
              date_of_creation={recipe.date_of_creation}
              setRecipes={setRecipes}
              taste={recipe.taste}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RecipeDash;
