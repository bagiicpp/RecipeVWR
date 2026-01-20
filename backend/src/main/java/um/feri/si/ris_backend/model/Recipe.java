package um.feri.si.ris_backend.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Table(name = "recipe")
@Entity
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private LocalDate date_of_creation = LocalDate.now();
    private String category;
    private Double rating;
    private String taste;

    @Column(name = "total_calories")
    private Double totalCalories;

    @JsonProperty("totalCalories")
    public Double getTotalCalories() {
        return calculateTotalCalories();
    }

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("recipe")
    private List<Comment> comments;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("recipe")
    private List<RecipeRating> ratings;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<RecipeIngredient> ingredients;

    @ManyToOne
    @JoinColumn(name = "creator_id") // links to your creator_id column
    @JsonIgnoreProperties({"password", "email"}) // hide sensitive info
    private Users creator;

    @PrePersist
    @PreUpdate
    public void refreshCalories() {
        this.totalCalories = calculateTotalCalories();
    }

    public Double calculateTotalCalories() {
        if (ingredients == null || ingredients.isEmpty()) {
            return 0.0;
        }

        return ingredients.stream()
                .mapToDouble(ri -> {
                    // Using the method you already have in RecipeIngredient
                    return ri.calculateCalories();
                })
                .sum();
    }
}
