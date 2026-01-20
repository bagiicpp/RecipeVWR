package um.feri.si.ris_backend.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import um.feri.si.ris_backend.model.Recipe;
import um.feri.si.ris_backend.model.RecipeIngredient;
import um.feri.si.ris_backend.model.RecipeRating;
import um.feri.si.ris_backend.model.Users;
import um.feri.si.ris_backend.repository.RecipeRatingRepository;
import um.feri.si.ris_backend.repository.RecipeRepository;

import java.util.List;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final RecipeRatingRepository recipeRatingRepository;
    private final UsersService usersService;

    public RecipeService(RecipeRepository recipeRepository,  RecipeRatingRepository recipeRatingRepository, UsersService usersService) {
        this.recipeRepository = recipeRepository;
        this.recipeRatingRepository = recipeRatingRepository;
        this.usersService = usersService;
    }

    public List<Recipe> getByCategory(String category) {
        return recipeRepository.getRecipesByCategory(category);
    }

    public List<Recipe> getByTaste(String taste) {
        return recipeRepository.getRecipesByTaste(taste);
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe getRecipeById(Long id) {
        return recipeRepository.findById(id).orElseThrow(() -> new RuntimeException("Recipe with id " + id + " not found!"));
    }

    @Transactional
    public Recipe createRecipe(Recipe recipe, Users creator) {
        recipe.setCreator(creator); // assign the creator
        if (recipe.getIngredients() != null) {
            recipe.getIngredients().forEach(ri -> ri.setRecipe(recipe));
        }
        return recipeRepository.save(recipe);
    }


    @Transactional
    public Recipe updateRecipe(Recipe recipe) {
        if (recipe.getIngredients() != null) {
            recipe.getIngredients().forEach(ri -> ri.setRecipe(recipe));
        }
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

    // In RecipeService.java
    @Transactional
    public Recipe addIngredientToRecipe(Long recipeId, RecipeIngredient ri) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();

        ri.setRecipe(recipe);
        recipe.getIngredients().add(ri);

        // Explicitly set it here
        Double calculated = recipe.calculateTotalCalories();
        recipe.setTotalCalories(calculated);

        System.out.println("Saving recipe with calories: " + calculated); // Debug line

        return recipeRepository.save(recipe);
    }

    @Transactional
    public Recipe createRecipeWithCreator(Recipe recipe, Long userId) {
        usersService.getUserById(userId).ifPresent(recipe::setCreator);

        if (recipe.getIngredients() != null) {
            recipe.getIngredients().forEach(ri -> ri.setRecipe(recipe));
        }

        return recipeRepository.save(recipe);
    }

    @Transactional
    public Recipe updateRecipeIfOwner(Recipe updatedRecipe, Long userId) {
        Recipe existing = recipeRepository.findById(updatedRecipe.getId())
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        if (!existing.getCreator().getId().equals(userId)) {
            throw new RuntimeException("You can only edit your own recipes");
        }

        existing.setName(updatedRecipe.getName());
        existing.setDescription(updatedRecipe.getDescription());
        existing.setCategory(updatedRecipe.getCategory());
        existing.setTaste(updatedRecipe.getTaste());
        existing.setTotalCalories(existing.calculateTotalCalories());

        if (updatedRecipe.getIngredients() != null) {
            updatedRecipe.getIngredients().forEach(ri -> ri.setRecipe(existing));
            existing.setIngredients(updatedRecipe.getIngredients());
        }

        return recipeRepository.save(existing);
    }

    public void deleteRecipeIfOwner(Long recipeId, Long userId) {
        Recipe existing = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        if (!existing.getCreator().getId().equals(userId)) {
            throw new RuntimeException("You can only delete your own recipes");
        }

        recipeRepository.delete(existing);
    }


}
