import axios from "axios";
import { useEffect } from "react";
import RecipeCard from "./RecipeCard";

type RecipeType = {
  id: number;
  name: string;
  description: string;
  category: string;
  date_of_creation: string;
};

type recipeDashType = {
  recipes: RecipeType[];
  setRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>;
};

const RecipeDash: React.FC<recipeDashType> = ({ setRecipes, recipes }) => {
  useEffect(() => {
    axios
      .get("http://localhost:8080/recipe/all")
      .then((res) => {
        setRecipes(res.data);
        setRecipes(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <div className="grid grid-cols-5 container mx-auto gap-10 p-10">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            name={recipe.name}
            description={recipe.description}
            category={recipe.category}
            date_of_creation={recipe.date_of_creation}
            setRecipes={setRecipes}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeDash;
