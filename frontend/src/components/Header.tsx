import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AddRecipeForm from "./AddRecipeForm";
import { PlusIcon } from "@heroicons/react/16/solid";
import CategoryToggle from "./CategoryToggle";
import { NavLink, useNavigate } from "react-router-dom";

gsap.registerPlugin(useGSAP);

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

type HeaderType = {
  setRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>;
};

const Header: React.FC<HeaderType> = ({ setRecipes }) => {
  const [formVisible, setFormVisible] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useGSAP(() => {
    if (formVisible) {
      // 1. Subtle fade for the glass backdrop
      gsap.fromTo(
        ".modal-backdrop",
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
      );

      // 2. Smooth "Slide Up" for the form itself
      gsap.fromTo(
        ".add-recipe-form",
        {
          opacity: 0,
          y: 20, // Start 20px lower
          scale: 0.98, // Very slight scale increase
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power3.out", // Professional, snappy curve
        },
      );
    }
  }, [formVisible]);

  const handleLogout = () => {
    // Remove all user-related localStorage items
    localStorage.removeItem("username");
    localStorage.removeItem("taste");
    localStorage.removeItem("userId");
    localStorage.removeItem("dailyCalorieLimit"); // optional if you store it

    // Optionally clear everything (uncomment if desired)
    // localStorage.clear();

    // Redirect to homepage or login page
    navigate("/login");
  };

  return (
    <header className="bg-blk-5 border-b border-border sticky top-0 z-50">
      <div className="flex justify-between p-4 container mx-auto items-center">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-black text-text-base hover:text-[#F5CB5C] transition-colors tracking-tighter"
        >
          Recipe<span className="text-[#F5CB5C]">Vwr</span>
        </NavLink>

        {/* Center: Category Filter */}
        <CategoryToggle setRecipes={setRecipes} />

        {/* Right Side: Auth & Actions */}
        <div className="flex items-center space-x-6">
          {username ? (
            <>
              <button
                onClick={() => setFormVisible(true)}
                className="flex items-center space-x-2 group cursor-pointer bg-blk-10 px-4 py-2 rounded-xl border border-border hover:border-[#F5CB5C]/50 transition-all"
              >
                <PlusIcon className="w-5 h-5 text-[#F5CB5C]" />
                <span className="hidden md:block text-text-base font-bold text-sm">
                  New Recipe
                </span>
              </button>

              <div className="flex items-center space-x-4 pl-4 border-l border-border/50">
                <NavLink
                  to="/account"
                  className="text-xs font-bold text-text-muted hover:text-[#F5CB5C]"
                >
                  {username}
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-text-muted hover:text-red-400 transition-colors uppercase"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <NavLink
                to="/login"
                className="font-bold text-sm text-text-base hover:text-[#F5CB5C] transition-colors"
              >
                LOGIN
              </NavLink>
              <NavLink
                to="/register"
                className="bg-[#F5CB5C] text-black px-5 py-2 rounded-xl font-black text-xs hover:bg-[#e4bc50] transition-all shadow-lg shadow-[#F5CB5C]/10"
              >
                REGISTER
              </NavLink>
            </div>
          )}
        </div>
      </div>
      {formVisible && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="modal-backdrop fixed inset-0 bg-black/40 backdrop-blur-md"
            onClick={() => setFormVisible(false)}
          />

          <div className="add-recipe-form relative z-10 w-full max-w-lg">
            <AddRecipeForm
              setFormVisible={setFormVisible}
              formVisible={formVisible}
              setRecipes={setRecipes}
            />
          </div>
        </div>
      )}{" "}
    </header>
  );
};

export default Header;
