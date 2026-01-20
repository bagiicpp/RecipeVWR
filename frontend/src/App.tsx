import { useState } from "react";
import Header from "./components/Header";
import RecipeDash from "./components/RecipeDash";

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

function App() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);

  return (
    <>
      <Header setRecipes={setRecipes} />
      <RecipeDash recipes={recipes} setRecipes={setRecipes} />
    </>
  );
}

export default App;
