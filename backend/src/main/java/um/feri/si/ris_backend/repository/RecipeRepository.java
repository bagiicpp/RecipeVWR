package um.feri.si.ris_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import um.feri.si.ris_backend.model.Recipe;

import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> getRecipesByCategory(String category);
    List<Recipe> getRecipesByTaste(String taste);
}