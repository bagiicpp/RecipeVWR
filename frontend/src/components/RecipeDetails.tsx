import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Recipe = {
  id: number;
  name: string;
  description: string;
  category: string;
  date_of_creation: string;
};

const RecipeDetails = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/recipe/${id}`)
      .then((res) => setRecipe(res.data))
      .catch(() => navigate("/")); 
  }, [id]);

  if (!recipe)
    return <p className="text-center text-gray-400 mt-10">Loading recipe...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-blk-5 border border-border rounded-lg space-y-6">

      <h1 className="text-4xl font-bold text-center">{recipe.name}</h1>

      <div className="flex justify-between text-gray-400">
        <p>Category: <span className="text-gray-200">{recipe.category}</span></p>
        <p>Created: {recipe.date_of_creation}</p>
      </div>

      <p className="text-lg text-gray-300 leading-relaxed">
        {recipe.description}
      </p>

    </div>
  );
};

export default RecipeDetails;
