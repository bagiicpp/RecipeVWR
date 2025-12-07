package um.feri.si.ris_backend.service;

import org.springframework.stereotype.Service;
import um.feri.si.ris_backend.model.Recipe;
import um.feri.si.ris_backend.model.RecipeRating;
import um.feri.si.ris_backend.repository.RecipeRatingRepository;
import um.feri.si.ris_backend.repository.RecipeRepository;

import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final RecipeRatingRepository recipeRatingRepository;

    public RecipeService(RecipeRepository recipeRepository,  RecipeRatingRepository recipeRatingRepository) {
        this.recipeRepository = recipeRepository;
        this.recipeRatingRepository = recipeRatingRepository;
    }

    public List<Recipe> getByCategory(String category) {
        return recipeRepository.getRecipesByCategory(category);
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe getRecipeById(Long id) {
        return recipeRepository.findById(id).orElseThrow(() -> new RuntimeException("Recipe with id " + id + " not found!"));
    }

    public Recipe createRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public Recipe updateRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public Double addRating(Long recipeId, Double rating) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        RecipeRating newRating = new RecipeRating();
        newRating.setRecipe(recipe);
        newRating.setRating(rating);
        recipeRatingRepository.save(newRating);

        List<RecipeRating> ratings = recipeRatingRepository.findByRecipeId(recipeId);
        double avg = ratings.stream().mapToDouble(RecipeRating::getRating).average().orElse(0.0);

        recipe.setRating(avg);
        recipeRepository.save(recipe);

        return avg;
    }

    public Double getRating(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));
        return recipe.getRating();
    }

    public void deleteRecipe(Long id) {
        recipeRepository.deleteById(id);
    }
}
