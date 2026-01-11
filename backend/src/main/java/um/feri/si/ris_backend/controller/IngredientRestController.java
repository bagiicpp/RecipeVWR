package um.feri.si.ris_backend.controller;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import um.feri.si.ris_backend.model.Ingredient;
import um.feri.si.ris_backend.model.Recipe;
import um.feri.si.ris_backend.model.RecipeIngredient;
import um.feri.si.ris_backend.model.RecipeIngredientId;
import um.feri.si.ris_backend.repository.IngredientRepository;
import um.feri.si.ris_backend.repository.RecipeIngredientRepository;
import um.feri.si.ris_backend.repository.RecipeRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ingredient")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class IngredientRestController {

    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;
    private final RecipeIngredientRepository recipeIngredientRepository;

    @GetMapping("/all")
    public List<Ingredient> findAll() {
        return ingredientRepository.findAll();
    }

    @PostMapping("/add-to-recipe")
    @Transactional
    public Ingredient addIngredient(@RequestBody Map<String, Object> data) {
        Ingredient ing = new Ingredient();
        ing.setName(data.get("name").toString());
        ing.setCalories100g(Double.valueOf(data.get("calories_100g").toString()));
        ing.setProtein100g(Double.valueOf(data.get("protein_100g").toString()));
        ing.setFat100g(Double.valueOf(data.get("fat_100g").toString()));

        Ingredient savedIng = ingredientRepository.save(ing);

        Long recipeId = Long.valueOf(data.get("recipeId").toString());
        RecipeIngredientId id = new RecipeIngredientId();
        id.setRecipeId(recipeId);
        id.setIngredientId(savedIng.getId());

        RecipeIngredient link = new RecipeIngredient();
        link.setId(id); // Use the composite ID object here
        link.setQuantity(Double.valueOf(data.get("quantity").toString()));

        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));

        link.setRecipe(recipe);
        link.setIngredient(savedIng);

        recipeIngredientRepository.save(link);

        return savedIng;
    }
}