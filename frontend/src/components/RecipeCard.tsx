import { TrashIcon, PencilIcon, EyeIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import EditRecipeForm from "./EditRecipeForm";
import { NavLink } from "react-router-dom";
import RecipeRate from "./RecipeRate";

type RecipeType = {
  id: number;
  name: string;
  description: string;
  category: string;
  date_of_creation: string;
  rating: number;
};

type RecipeCardType = {
  id: number;
  name: string;
  description: string;
  category: string;
  date_of_creation: string;
  rating: number;
  setRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>;
};

const RecipeCard: React.FC<RecipeCardType> = ({
  id,
  name,
  description,
  category,
  date_of_creation,
  rating,
  setRecipes,
}) => {
  const [editRecipeForm, setEditRecipeForm] = useState(false);
  const [currentRating, setCurrentRating] = useState(
    rating ? Number(rating) : 0,
  );

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  return (
    <>
      <div className="rounded-md p-4 bg-blk-5 border border-border flex flex-col space-y-4 justify-between hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] shadow duration-200 ease-in-out">
        <div className="flex flex-col">
          <h1 className="text-2xl text-text-base font-bold text-center mb-4">
            {name}
          </h1>
          <h2 className="text-xl text-text-muted ">{category}</h2>
          <h2 className="text-xl text-text-muted">
            Current Average:{" "}
            {currentRating !== undefined ? currentRating : "0.0"}
          </h2>

          <p className="text-text-muted">{description}</p>
        </div>

        <RecipeRate
          id={id}
          name={name}
          setCurrentRating={setCurrentRating}
          setRecipes={setRecipes}
        />

        <div className="flex justify-between items-center space-x-3">
          <p>{date_of_creation}</p>
          <div className="flex space-x-3">
            <NavLink to={`/recipe/${id}`}>
              <EyeIcon
                className="w-8 bg-blk-10 p-1 border border-border rounded 
                          hover:text-[#F5CB5C] hover:shadow-[0_0_10px_rgba(245,203,92,0.2)] 
                          shadow cursor-pointer duration-200 ease-in-out"
              />
            </NavLink>
            <PencilIcon
              onClick={() => setEditRecipeForm(!editRecipeForm)}
              className="w-8 bg-blk-10 p-1 border border-border rounded hover:text-[#F5CB5C] hover:shadow-[0_0_10px_rgba(245,203,92,0.2)] shadow cursor-pointer duration-200 ease-in-out"
            />
            <TrashIcon
              onClick={() => {
                toast.promise(
                  axios
                    .delete(`http://localhost:8080/recipe/${id}`)
                    .then(() => {
                      setRecipes((prevRecipes) =>
                        prevRecipes.filter((recipe) => recipe.id !== id),
                      );
                    })
                    .catch((err) => console.error(err)),
                  {
                    loading: `Deleting ${name}...`,
                    success: `Successfully deleted ${name}`,
                    error: `An error occured while deleting ${name}`,
                  },
                );
              }}
              className="w-8 bg-blk-10 p-1 border border-border rounded hover:text-red-400 hover:shadow-[0_0_10px_rgba(255,100,103,0.2)] cursor-pointer duration-200 ease-in-out"
            />
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
    </>
  );
};

export default RecipeCard;
