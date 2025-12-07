import { useState } from 'react';
import Header from './components/Header';
import RecipeDash from './components/RecipeDash';

type RecipeType = {
  id: number;
  name: string;
  description: string;
  category: string;
  date_of_creation: string;
  rating: number;
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
