import { XCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

type RecipeType = {
  id: number;
  name: string;
  description: string;
  category: string;
  date_of_creation: string;
  rating: string;
};

type AddRecipeFormType = {
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  formVisible: boolean;
  setRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>;
};

type formDataType = {
  name: string;
  description: string;
  category: string;
  taste: string;
};

const AddRecipeForm: React.FC<AddRecipeFormType> = ({
  setFormVisible,
  formVisible,
  setRecipes,
}) => {
  const [formData, setFormData] = useState<formDataType>({
    name: "",
    description: "",
    category: "Breakfast",
    taste: "",
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(formData);
        if (!formData.name.trim()) {
          toast.error("Recipe name is required");
          return;
        }

        if (!formData.category) {
          toast.error("Recipe category is required");
          return;
        }
        toast.promise(
          axios
            .post("http://localhost:8080/recipe/new", {
              name: formData.name,
              description: formData.description,
              category: formData.category,
              taste: formData.taste,
            })
            .then((res) => {
              const newRecipe: RecipeType = res.data;
              setRecipes((prev) => [...prev, newRecipe]);
              setFormVisible(false);
              setFormData({
                name: "",
                description: "",
                category: "Breakfast",
                taste: "Select taste for recipe",
              });
            })
            .catch((err) => {
              console.error(err);
            }),
          {
            loading: "Adding new recipe...",
            success: "Successfully added new recipe",
            error: "An error occured while adding recipe",
          },
        );
      }}
      className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-blk-5 rounded-lg py-10 p-14 z-10 add-recipe-form space-y-6 flex flex-col"
    >
      <div onClick={() => setFormVisible(!formVisible)}>
        <XCircleIcon className="h-7 absolute top-1/12 right-1/12 hover:text-[#F5CB5C] cursor-pointer self-end" />
      </div>

      <h1 className="text-xl text-center">Add new recipe</h1>

      <div>
        <label className="block mb-2 font-medium">Recipe Category</label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              category: e.target.value,
            }))
          }
          className="w-full bg-blk-10 border border-border px-3 py-2 rounded"
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium">Recipe Name</label>
        <input
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          type="text"
          placeholder="Enter recipe name"
          className="w-full px-3 py-2 rounded bg-blk-10 border border-border transition-all duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-[#808080]"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium" htmlFor="description">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          id="description"
          placeholder="Enter recipe description..."
          className="w-full px-3 py-2 rounded bg-blk-10 border border-border transition-all duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-[#808080]"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Taste</label>
        <select
          value={formData.taste}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              taste: e.target.value,
            }))
          }
          className="w-full bg-blk-10 border border-border px-3 py-2 rounded"
        >
          <option value="Select taste for recipe">Select taste for recipe</option>
          <option value="Italian">Italian</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Chinese">Chinese</option>
          <option value="Sweet">Sweet</option>
          <option value="Healthy">Healthy</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-[#F5CB5C] text-gray-900 font-bold rounded hover:bg-[#c9a43e] transition-all duration-200 ease-in-out cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
};

export default AddRecipeForm;
