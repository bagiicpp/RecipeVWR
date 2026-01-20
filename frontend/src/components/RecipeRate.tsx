import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";

type RecipeRatingProps = {
  id: number;
  name: string;
  setCurrentRating: (rating: number) => void;
  setRecipes: React.Dispatch<React.SetStateAction<any[]>>;
};

const RecipeRating: React.FC<RecipeRatingProps> = ({
  id,
  name,
  setCurrentRating,
  setRecipes,
}) => {
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleRate = (rating: number) => {
    const username = localStorage.getItem("username");
    if (!username) {
      toast.error("Sign in to rate recipes!", {
        description: "We need to know who's cooking."
      });
      return;
    }

    setSelectedRating(rating);

    const ratePromise = axios
      .post(`http://localhost:8080/recipe/${id}/rating`, null, {
        params: { rating },
      })
      .then((res) => {
        setCurrentRating(res.data);
        setRecipes((prev) =>
          prev.map((r) => (r.id === id ? { ...r, rating: res.data } : r))
        );
      });

    toast.promise(ratePromise, {
      loading: `Rating ${name}...`,
      success: `You gave ${name} ${rating} stars!`,
      error: `Failed to submit rating`,
    });
  };

  return (
    <div className="group flex flex-col items-center sm:items-start space-y-2">
      <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] ml-1">
        Rate this dish
      </span>
      
      <div className="flex items-center p-1.5 bg-blk-10 border border-border/50 rounded-2xl shadow-inner backdrop-blur-sm">
        <div className="flex items-center px-2 space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => handleRate(star)}
              className="relative p-1 transition-transform active:scale-90 hover:scale-110"
            >
              {star <= (hoveredRating || selectedRating) ? (
                <StarIcon className="w-6 h-6 text-[#F5CB5C] drop-shadow-[0_0_8px_rgba(245,203,92,0.4)]" />
              ) : (
                <StarOutline className="w-6 h-6 text-text-muted/40 hover:text-text-muted" />
              )}
            </button>
          ))}
        </div>

        {/* Dynamic Label */}
        <div className="min-w-[45px] px-3 border-l border-border/50 text-center">
          <span className="text-sm font-black text-[#F5CB5C]">
            {hoveredRating || selectedRating || "—"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeRating;
