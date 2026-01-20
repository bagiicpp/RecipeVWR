import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ChevronLeftIcon, ChatBubbleLeftRightIcon, BeakerIcon, CalendarIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

type Recipe = {
  id: number;
  name: string;
  description: string;
  category: string;
  date_of_creation: string;
  rating: string;
  ingredients?: {
    ingredient: { name: string; calories100g: number };
    quantity: number;
  }[];
};

type Comment = {
  id: number;
  text: string;
  date: string;
};

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/recipe/${id}`)
      .then((res) => setRecipe(res.data))
      .catch(() => navigate("/"));
  }, [id, navigate]);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/comment/all/${id}`)
        .then((res) => setComments(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleAddComment = () => {
    const username = localStorage.getItem("username");
    if (!username) return toast.error("You must be logged in to add a comment");
    if (!newComment.trim() || !id) return;

    toast.promise(
      axios.post(`http://localhost:8080/comment/new/${id}`, { text: newComment })
        .then((res) => {
          setComments((prev) => [...prev, res.data]);
          setNewComment("");
        }),
      {
        loading: "Posting...",
        success: "Comment shared!",
        error: "Failed to post comment",
      }
    );
  };

  if (!recipe) return (
    <div className="flex items-center justify-center min-h-[60vh]">
       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F5CB5C]"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Navigation Header */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-text-muted hover:text-[#F5CB5C] transition-colors mb-8 group"
      >
        <ChevronLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Main Content (2/3) */}
        <div className="lg:col-span-2 space-y-10">
          <section className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 rounded-full bg-[#F5CB5C]/10 text-[#F5CB5C] text-xs font-bold uppercase tracking-widest border border-[#F5CB5C]/20">
                {recipe.category}
              </span>
              <div className="flex items-center text-[#F5CB5C]">
                <StarIcon className="w-5 h-5 mr-1" />
                <span className="font-bold">{recipe.rating}</span>
              </div>
            </div>
            
            <h1 className="text-5xl font-black text-text-base leading-tight">
              {recipe.name}
            </h1>

            <div className="flex items-center text-text-muted text-sm space-x-6 pt-2">
              <div className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2" />
                {recipe.date_of_creation}
              </div>
              <div className="flex items-center">
                <BeakerIcon className="w-4 h-4 mr-2" />
                {recipe.ingredients?.length || 0} Ingredients
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-text-base uppercase tracking-widest mb-4 opacity-50">Description</h2>
            <p className="text-xl text-text-muted leading-relaxed font-light italic">
              "{recipe.description}"
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center">
                Ingredients <span className="ml-3 h-px w-24 bg-border hidden md:block"></span>
              </h2>
            </div>
            
            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recipe.ingredients.map((ri, index) => (
                  <div
                    key={index}
                    className="group flex justify-between items-center p-4 bg-blk-5 border border-border/50 rounded-2xl hover:border-[#F5CB5C]/40 transition-all duration-300"
                  >
                    <div>
                      <p className="font-bold text-text-base group-hover:text-[#F5CB5C] transition-colors">{ri.ingredient.name}</p>
                      <p className="text-[10px] text-text-muted uppercase tracking-tighter">
                        {ri.ingredient.calories100g} kcal / 100g
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#F5CB5C] font-black text-lg">{ri.quantity}g</p>
                      <p className="text-[10px] text-text-muted">
                        {Math.round((ri.ingredient.calories100g * ri.quantity) / 100)} kcal
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center border-2 border-dashed border-border rounded-2xl text-text-muted">
                No ingredients listed.
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Comments & Interaction (1/3) */}
        <div className="space-y-8">
          <div className="bg-blk-5 border border-border/50 rounded-3xl p-6 shadow-xl sticky top-8">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <ChatBubbleLeftRightIcon className="w-6 h-6 mr-2 text-[#F5CB5C]" />
              Community
            </h3>

            {/* Comment List */}
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar mb-6">
              {comments.length === 0 ? (
                <p className="text-text-muted text-center py-10 italic">No thoughts yet. Be the first!</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="p-4 bg-blk-10 rounded-2xl border border-border/30 space-y-2">
                    <p className="text-sm text-text-base leading-snug">{comment.text}</p>
                    <p className="text-[10px] text-text-muted text-right uppercase font-bold tracking-widest italic">
                      {comment.date}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Input Area */}
            <div className="space-y-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-4 rounded-2xl bg-blk-10 border border-border text-text-base focus:ring-2 focus:ring-[#F5CB5C]/20 focus:border-[#F5CB5C] outline-none transition-all text-sm resize-none h-28"
              />
              <button
                onClick={handleAddComment}
                className="w-full py-3 bg-[#F5CB5C] text-black font-bold rounded-xl hover:bg-[#e4bc50] transition-all active:scale-95 flex items-center justify-center"
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
