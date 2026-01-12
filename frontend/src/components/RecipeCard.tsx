import {
  TrashIcon,
  PencilIcon,
  EyeIcon,
  PlusIcon,
} from '@heroicons/react/16/solid';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import EditRecipeForm from './EditRecipeForm';
import { NavLink } from 'react-router-dom';
import RecipeRate from './RecipeRate';
import AddCustomIngredientForm from './AddCustomIngredientForm';

type RecipeType = {
  id: number;
  name: string;
  description: string;
  category: string;
  date_of_creation: string;
  rating: number;
  taste: string;
  ingredients?: { ingredient: { calories100g: number }; quantity: number }[];
};

type RecipeCardType = {
  id: number;
  name: string;
  description: string;
  category: string;
  date_of_creation: string;
  rating: number;
  taste: string;
  ingredients?: { ingredient: { calories100g: number }; quantity: number }[];
  setRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>;
};

const RecipeCard: React.FC<RecipeCardType> = ({
  id,
  name,
  description,
  category,
  date_of_creation,
  rating,
  taste,
  ingredients,
  setRecipes,
}) => {
  const [editRecipeForm, setEditRecipeForm] = useState(false);
  const [addIngredientForm, setAddIngredientForm] = useState(false);
  const [currentRating, setCurrentRating] = useState(
    rating ? Number(rating) : 0
  );

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  const handleEatenMeal = () => {
    const calories = (ingredients || []).reduce(
      (sum, ri) =>
        sum + ((ri.ingredient?.calories100g || 0) * (ri.quantity || 0)) / 100,
      0
    );

    const today = new Date().toISOString().slice(0, 10);

    const stored = JSON.parse(localStorage.getItem('dailyCalories') || '{}');

    stored[today] = (stored[today] || 0) + calories;

    localStorage.setItem('dailyCalories', JSON.stringify(stored));

    toast.success(`Meal added (+${calories.toFixed(0)} kcal)`);
  };

  return (
    <>
      <div className="rounded-md p-4 bg-blk-5 border border-border flex flex-col space-y-4 justify-between hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] shadow duration-200 ease-in-out relative">
        <div className="flex flex-col">
          <h1 className="text-2xl text-text-base font-bold text-center mb-4">
            {name}
          </h1>
          <h2 className="text-xl text-text-muted ">{category}</h2>
          <h2 className="text-xl text-text-muted">
            Current Average:{' '}
            {currentRating !== undefined ? currentRating : '0.0'}
          </h2>
          <h2 className="text-xl font-bold text-[#F5CB5C]">
            Calories:{' '}
            {(ingredients || [])
              .reduce(
                (sum, ri) =>
                  sum +
                  ((ri.ingredient?.calories100g || 0) * (ri.quantity || 0)) /
                    100,
                0
              )
              .toFixed(1)}{' '}
            kcal
          </h2>
          <p className="text-text-muted">{description}</p>
          <p className="text-text-muted">{taste}</p>
        </div>

        <RecipeRate
          id={id}
          name={name}
          setCurrentRating={setCurrentRating}
          setRecipes={setRecipes}
        />

        <div className="flex justify-between items-center space-x-3 pt-2 border-t border-blk-10">
          <p className="text-sm text-text-muted">{date_of_creation}</p>

          <div className="flex space-x-2">
            <div
              title="Mark as eaten"
              onClick={handleEatenMeal}
              className="px-3 h-8 bg-green-600 text-black flex items-center justify-center 
                        rounded font-bold hover:bg-green-500 cursor-pointer transition"
            >
              Ate
            </div>

            <div
              title="Add Ingredient"
              onClick={() => setAddIngredientForm(true)}
              className="w-8 h-8 bg-blk-10 flex items-center justify-center border border-border rounded hover:text-green-400 hover:shadow-[0_0_10px_rgba(74,222,128,0.2)] shadow cursor-pointer duration-200 ease-in-out"
            >
              <PlusIcon className="w-5" />
            </div>

            <NavLink to={`/recipe/${id}`}>
              <div
                title="View Details"
                className="w-8 h-8 bg-blk-10 flex items-center justify-center border border-border rounded hover:text-[#F5CB5C] hover:shadow-[0_0_10px_rgba(245,203,92,0.2)] shadow cursor-pointer duration-200 ease-in-out"
              >
                <EyeIcon className="w-5" />
              </div>
            </NavLink>

            <div
              title="Edit Recipe"
              onClick={() => setEditRecipeForm(!editRecipeForm)}
              className="w-8 h-8 bg-blk-10 flex items-center justify-center border border-border rounded hover:text-[#F5CB5C] hover:shadow-[0_0_10px_rgba(245,203,92,0.2)] shadow cursor-pointer duration-200 ease-in-out"
            >
              <PencilIcon className="w-5" />
            </div>

            <div
              title="Delete Recipe"
              onClick={() => {
                toast.promise(
                  axios
                    .delete(`http://localhost:8080/recipe/${id}`)
                    .then(() => {
                      setRecipes((prevRecipes) =>
                        prevRecipes.filter((recipe) => recipe.id !== id)
                      );
                    })
                    .catch((err) => console.error(err)),
                  {
                    loading: `Deleting ${name}...`,
                    success: `Successfully deleted ${name}`,
                    error: `An error occured while deleting ${name}`,
                  }
                );
              }}
              className="w-8 h-8 bg-blk-10 flex items-center justify-center border border-border rounded hover:text-red-400 hover:shadow-[0_0_10px_rgba(255,100,103,0.2)] cursor-pointer duration-200 ease-in-out"
            >
              <TrashIcon className="w-5" />
            </div>
          </div>
        </div>
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
        />
      )}

      {/* Render Add Ingredient Form */}
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
