import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Recipe = {
  id: number;
  name: string;
  description: string;
  category: string;
  date_of_creation: string;
  rating: string;
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
  }, [id]);

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

    if (!username) {
      toast.error("You must be logged in to add a comment");
      return;
    }

    if (!newComment.trim() || !id) return;

    toast.promise(
      axios
        .post(`http://localhost:8080/comment/new/${id}`, { text: newComment })
        .then((res) => {
          setComments((prev) => [...prev, res.data]);
          setNewComment("");
        }),
      {
        loading: "Adding comment...",
        success: "Successfully added comment",
        error: "An error occurred",
      },
    );
  };

  if (!recipe)
    return <p className="text-center text-gray-400 mt-10">Loading recipe...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-blk-5 border border-border rounded-lg space-y-6">
      <h1 className="text-4xl font-bold text-center">{recipe.name}</h1>
      <h3 className="text-xl font-bold text-center">Rating: {recipe.rating}</h3>

      <div className="flex justify-between text-gray-400">
        <p>
          Category: <span className="text-gray-200">{recipe.category}</span>
        </p>
        <p>Created: {recipe.date_of_creation}</p>
      </div>

      <p className="text-lg text-gray-300 leading-relaxed">
        {recipe.description}
      </p>

      <hr className="border-gray-600" />

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Comments</h2>
        {comments.length === 0 ? (
          <p className="text-gray-400">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-2 bg-blk-10 rounded">
              <p>{comment.text}</p>
              <span className="text-gray-400 text-sm">{comment.date}</span>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex flex-col space-y-2">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="p-2 rounded bg-blk-10 border border-border text-text-base"
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-[#F5CB5C] text-black rounded hover:bg-yellow-400 transition"
        >
          Submit Comment
        </button>
      </div>
    </div>
  );
};

export default RecipeDetails;
