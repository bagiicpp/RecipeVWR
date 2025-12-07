package um.feri.si.ris_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.feri.si.ris_backend.model.Recipe;
import um.feri.si.ris_backend.repository.RecipeRatingRepository;
import um.feri.si.ris_backend.service.RecipeService;

import java.util.List;

@RestController
@RequestMapping("/recipe")
@CrossOrigin(origins = "*")
public class RecipeRestController {

    private final RecipeService recipeService;
    private final RecipeRatingRepository recipeRatingRepository;

    @Autowired
    public RecipeRestController(RecipeService recipeService,  RecipeRatingRepository recipeRatingRepository) {
        this.recipeService = recipeService;
        this.recipeRatingRepository = recipeRatingRepository;
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
    public Recipe addNew(@RequestBody Recipe recipe) {
        System.out.println(recipe);
        return recipeService.createRecipe(recipe);
    }

    @PostMapping("/edit")
    public Recipe updateRecipe(@RequestBody Recipe recipe) {
        return recipeService.updateRecipe(recipe);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        recipeService.deleteRecipe(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/category/{category}")
    public List<Recipe> getRecipesByCategory(@PathVariable String category) {
        return recipeService.getByCategory(category);
    }

    @PostMapping("/{id}/rating")
    public Double rateRecipe(@PathVariable Long id, @RequestParam Double rating) {
        return recipeService.addRating(id, rating);
    }

    @GetMapping("/{id}/rating")
    public Double getRating(@PathVariable Long id) {
        return recipeService.getRating(id);
    }

}
