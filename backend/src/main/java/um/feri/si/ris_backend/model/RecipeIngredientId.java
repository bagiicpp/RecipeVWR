package um.feri.si.ris_backend.model;

import jakarta.persistence.Embeddable;
import lombok.Data;
import java.io.Serializable;

@Data
@Embeddable
public class RecipeIngredientId implements Serializable {
    private Long recipeId;
    private Long ingredientId;
}