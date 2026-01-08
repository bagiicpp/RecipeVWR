package um.feri.si.ris_backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Table(name = "ingredient")
@Entity
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "calories_100g")
    private Double calories100g;

    @Column(name = "protein_100g")
    private Double protein100g;

    @Column(name = "fat_100g")
    private Double fat100g;
}