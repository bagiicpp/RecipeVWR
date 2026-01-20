package um.feri.si.ris_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.feri.si.ris_backend.model.Recipe;
import um.feri.si.ris_backend.model.RecipeIngredient;
import um.feri.si.ris_backend.model.Users;
import um.feri.si.ris_backend.repository.RecipeRatingRepository;
import um.feri.si.ris_backend.repository.RecipeRepository;
import um.feri.si.ris_backend.service.RecipeService;
import um.feri.si.ris_backend.service.UsersService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/recipe")
@CrossOrigin(origins = "*")
public class RecipeRestController {

    private final RecipeService recipeService;
    private final RecipeRatingRepository recipeRatingRepository;
    private final RecipeRepository recipeRepository;
    private final UsersService usersService;

    @Autowired
    public RecipeRestController(RecipeService recipeService,  RecipeRatingRepository recipeRatingRepository, RecipeRepository recipeRepository, UsersService usersService) {
        this.recipeService = recipeService;
        this.recipeRatingRepository = recipeRatingRepository;
        this.recipeRepository = recipeRepository;
        this.usersService = usersService;
    }

    @GetMapping("/all")
    public List<Recipe> findAll() {
        List<Recipe> recipes = recipeService.getAllRecipes();
        return recipes;
    }

    @GetMapping("/{id}")
    public Recipe findById(@PathVariable Long id) {
        return recipeService.getRecipeById(id);
    }

    @PostMapping("/new")
    public Recipe addNew(@RequestBody Recipe recipe, @RequestParam Long userId) {
        Users user = usersService.getUserById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return recipeService.createRecipe(recipe, user);
    }


    @PostMapping("/edit")
    public Recipe updateRecipe(@RequestBody Recipe updatedRecipe, @RequestParam Long userId) {
        return recipeService.updateRecipeIfOwner(updatedRecipe, userId);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id, @RequestParam Long userId) {
        recipeService.deleteRecipeIfOwner(id, userId);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/category/{category}")
    public List<Recipe> getRecipesByCategory(@PathVariable String category) {
        return recipeService.getByCategory(category);
    }

    @GetMapping("/taste")
    public List<Recipe> getRecipesByTaste(@RequestParam String taste) {
        return recipeService.getByTaste(taste);
    }

    @PostMapping("/{id}/rating")
    public Double rateRecipe(@PathVariable Long id, @RequestParam Double rating) {
        return recipeService.addRating(id, rating);
    }

    @GetMapping("/{id}/rating")
    public Double getRating(@PathVariable Long id) {
        return recipeService.getRating(id);
    }

    @PostMapping("/{id}/ingredients")
    public ResponseEntity<Recipe> addIngredient(@PathVariable Long id, @RequestBody RecipeIngredient recipeIngredient) {
        // ADD THIS LOG:
        System.out.println("Received Ingredient: " + recipeIngredient.getIngredient());
        if (recipeIngredient.getIngredient() != null) {
            System.out.println("Name: " + recipeIngredient.getIngredient().getName());
        }

        Recipe updatedRecipe = recipeService.addIngredientToRecipe(id, recipeIngredient);
        return ResponseEntity.ok(updatedRecipe);
    }

}
