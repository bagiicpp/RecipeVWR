package um.feri.si.ris_backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import um.feri.si.ris_backend.model.Recipe;
import um.feri.si.ris_backend.repository.RecipeRepository;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RecipeCategoryTest {

    @Autowired
    private RecipeRepository recipeRepository;
    private Recipe recipe;

    @BeforeEach
    void setUp() {
        recipe = new Recipe();
        recipe.setName("Category Test Recipe");
    }

    //POSITIVE TEST
    @Test
    void saveRecipeWithValidCategory_success() {
        recipe.setCategory("Dinner");
        Recipe savedRecipe = recipeRepository.save(recipe);

        assertNotNull(savedRecipe.getId(), "Recipe ID should not be null after saving");
        assertEquals("Dinner", savedRecipe.getCategory());
    }


     //NEGATIVE TEST
    @Test
    void saveRecipeWithEmptyCategory_fail() {
        recipe.setCategory("");
        boolean isValidCategory = recipe.getCategory() != null && !recipe.getCategory().isBlank();

        assertFalse(isValidCategory, "Empty category is invalid");
    }
}

