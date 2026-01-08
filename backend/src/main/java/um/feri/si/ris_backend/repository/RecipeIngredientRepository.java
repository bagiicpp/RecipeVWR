package um.feri.si.ris_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import um.feri.si.ris_backend.model.RecipeIngredient;
import um.feri.si.ris_backend.model.RecipeIngredientId;

public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, RecipeIngredientId> {
}