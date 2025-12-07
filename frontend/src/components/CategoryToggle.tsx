import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';

type HeaderType = {
  setRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>;
};

type RecipeType = {
  id: number;
  name: string;
  description: string;
  category: string;
  date_of_creation: string;
  rating: string;
};

const CategoryToggle: React.FC<HeaderType> = ({ setRecipes }) => {
  const [active, setActive] = useState('');

  return (
    <div className="flex space-x-4">
      <div
        onClick={() => {
          if (active == 'Breakfast') {
            setActive('');
            toast.promise(
              axios
                .get(`http://localhost:8080/recipe/all`)
                .then((res) => {
                  setRecipes(res.data);
                })
                .catch((err) => {
                  console.error(err);
                }),
              {
                loading: 'Getting recipes...',
                success: 'Showing all recipes!',
                error: 'An error occured',
              }
            );
          } else {
            setActive('Breakfast');
            toast.promise(
              axios
                .get(`http://localhost:8080/recipe/category/Breakfast`)
                .then((res) => {
                  setRecipes(res.data);
                })
                .catch((err) => {
                  console.error(err);
                }),
              {
                loading: 'Getting recipes...',
                success: 'Showing breakfast!',
                error: 'An error occured',
              }
            );
          }
        }}
        className={`p-4 px-6 rounded-md text-lg font-bold cursor-pointer transition-all duration-200 ${
          active === 'Breakfast'
            ? 'bg-[#F5CB5C] text-black hover:bg-[#f0b40f]'
            : 'bg-blk-10 text-white hover:bg-blk-15'
        }`}
      >
        Breakfast
      </div>
      <div
        onClick={() => {
          if (active == 'Lunch') {
            setActive('');
            toast.promise(
              axios
                .get(`http://localhost:8080/recipe/all`)
                .then((res) => {
                  setRecipes(res.data);
                })
                .catch((err) => {
                  console.error(err);
                }),
              {
                loading: 'Getting recipes...',
                success: 'Showing all recipes!',
                error: 'An error occured',
              }
            );
          } else {
            setActive('Lunch');
            toast.promise(
              axios
                .get(`http://localhost:8080/recipe/category/Lunch`)
                .then((res) => {
                  setRecipes(res.data);
                })
                .catch((err) => {
                  console.error(err);
                }),
              {
                loading: 'Getting recipes...',
                success: 'Showing lunch!',
                error: 'An error occured',
              }
            );
          }
        }}
        className={`p-4 px-6 rounded-md text-lg font-bold cursor-pointer transition-all duration-200 ${
          active === 'Lunch'
            ? 'bg-[#F5CB5C] text-black hover:bg-[#f0b40f]'
            : 'bg-blk-10 text-white hover:bg-blk-15'
        }`}
      >
        Lunch
      </div>
      <div
        onClick={() => {
          if (active == 'Dinner') {
            setActive('');
            toast.promise(
              axios
                .get(`http://localhost:8080/recipe/all`)
                .then((res) => {
                  setRecipes(res.data);
                })
                .catch((err) => {
                  console.error(err);
                }),
              {
                loading: 'Getting recipes...',
                success: 'Showing all recipes!',
                error: 'An error occured',
              }
            );
          } else {
            setActive('Dinner');
            toast.promise(
              axios
                .get(`http://localhost:8080/recipe/category/Dinner`)
                .then((res) => {
                  setRecipes(res.data);
                })
                .catch((err) => {
                  console.error(err);
                }),
              {
                loading: 'Getting recipes...',
                success: 'Showing dinner!',
                error: 'An error occured',
              }
            );
          }
        }}
        className={`p-4 px-6 rounded-md text-lg font-bold cursor-pointer transition-all duration-200 ${
          active === 'Dinner'
            ? 'bg-[#F5CB5C] text-black hover:bg-[#f0b40f]'
            : 'bg-blk-10 text-white hover:bg-blk-15'
        }`}
      >
        Dinner
      </div>
      <div
        onClick={() => {
          if (active == 'Snack') {
            setActive('');
            toast.promise(
              axios
                .get(`http://localhost:8080/recipe/all`)
                .then((res) => {
                  setRecipes(res.data);
                })
                .catch((err) => {
                  console.error(err);
                }),
              {
                loading: 'Getting recipes...',
                success: 'Showing all recipes!',
                error: 'An error occured',
              }
            );
          } else {
            setActive('Snack');
            toast.promise(
              axios
                .get(`http://localhost:8080/recipe/category/Snack`)
                .then((res) => {
                  setRecipes(res.data);
                })
                .catch((err) => {
                  console.error(err);
                }),
              {
                loading: 'Getting recipes...',
                success: 'Showing snacks!',
                error: 'An error occured',
              }
            );
          }
        }}
        className={`p-4 px-6 rounded-md text-lg font-bold cursor-pointer transition-all duration-200 ${
          active === 'Snack'
            ? 'bg-[#F5CB5C] text-black hover:bg-[#f0b40f]'
            : 'bg-blk-10 text-white hover:bg-blk-15'
        }`}
      >
        Snack
      </div>
    </div>
  );
};

export default CategoryToggle;
