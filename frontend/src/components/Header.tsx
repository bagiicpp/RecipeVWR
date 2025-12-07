import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AddRecipeForm from "./AddRecipeForm";
import { PlusIcon } from "@heroicons/react/16/solid";
import CategoryToggle from "./CategoryToggle";
import { NavLink } from "react-router";

gsap.registerPlugin(useGSAP);

type RecipeType = {
  id: number;
  name: string;
  description: string;
  category: string;
  date_of_creation: string;
};

type HeaderType = {
  setRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>;
};

const Header: React.FC<HeaderType> = ({ setRecipes }) => {
  const [formVisible, setFormVisible] = useState(false);

  useGSAP(() => {
    if (formVisible) {
      gsap.fromTo(
        ".add-recipe-form",
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [formVisible]);

  return (
    <div className="bg-blk-5">
      <div className="flex justify-between p-4 container mx-auto items-center">
        <p className="text-2xl font-bold text-text-base hover:text-[#F5CB5C]">
          RecipeVwr
        </p>
        <NavLink to={"login"}>Login</NavLink>
        <CategoryToggle setRecipes={setRecipes} />
        <div className="flex items-center space-x-1 group hover:text-[#F5CB5C] cursor-pointer transition-all duration-100 ease-in">
          {localStorage.getItem("user") && (
            <>
              <PlusIcon
                onClick={() => setFormVisible(!formVisible)}
                className="w-6 self-center"
              />
              <p className="text-text-base text-xl group-hover:text-[#F5CB5C] transition-all duration-100 ease-in">
                New Recipe
              </p>
            </>
          )}
          {!localStorage.getItem("user") && (
            <>
              <NavLink to="register">REGISTER</NavLink>
              {/* <PlusIcon className="w-6 self-center" />
              <p className="text-text-base text-xl group-hover:text-[#F5CB5C] transition-all duration-100 ease-in">
                Sign in
              </p> */}
            </>
          )}
        </div>
        {formVisible && (
          <AddRecipeForm
            setFormVisible={setFormVisible}
            formVisible={formVisible}
            setRecipes={setRecipes}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
