package um.feri.si.ris_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Table(name = "recipe_ingredient")
@Entity
public class RecipeIngredient {

    @EmbeddedId
    private RecipeIngredientId id = new RecipeIngredientId();

    @ManyToOne
    @MapsId("recipeId")
    @JoinColumn(name = "recipe_id")
    @JsonIgnoreProperties("ingredients")
    private Recipe recipe;

    @ManyToOne
    @MapsId("ingredientId")
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;

    private Double quantity;

    public Double calculateCalories() {
        if (ingredient == null || ingredient.getCalories100g() == null || quantity == null) {
            return 0.0;
        }
        return (ingredient.getCalories100g() * quantity) / 100.0;
    }
}