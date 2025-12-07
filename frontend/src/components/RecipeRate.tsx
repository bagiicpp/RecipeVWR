import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

type RecipeRatingProps = {
  id: number;
  name: string;
  setCurrentRating: (rating: number) => void;
  setRecipes: React.Dispatch<React.SetStateAction<any[]>>; // 👈 added gf
};

const RecipeRating: React.FC<RecipeRatingProps> = ({
  id,
  name,
  setCurrentRating,
  setRecipes,
}) => {
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleRate = () => {
    const username = localStorage.getItem("username");
    if (!username) {
      toast.error("You must be logged in to rate!");
      return;
    }

    toast.promise(
      axios
        .post(`http://localhost:8080/recipe/${id}/rating`, null, {
          params: { rating: selectedRating },
        })
        .then((res) => {
          setCurrentRating(res.data);

          setRecipes((prev) =>
            prev.map((r) =>
              r.id === id ? { ...r, rating: res.data } : r,
            ),
          );
        }),
      {
        loading: `Submitting rating for ${name}...`,
        success: `Successfully rated ${name}`,
        error: `Failed to rate ${name}`,
      },
    );
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        value={selectedRating}
        onChange={(e) => setSelectedRating(Number(e.target.value))}
        className="p-1 border border-gray-500 rounded"
      >
        <option value={0} disabled>
          Rate
        </option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
      <button
        onClick={handleRate}
        className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 transition"
      >
        Submit
      </button>
    </div>
  );
};

export default RecipeRating;
