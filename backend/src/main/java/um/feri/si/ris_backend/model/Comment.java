package um.feri.si.ris_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

@Entity
@Data
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String text;
    private LocalDate date = LocalDate.now();

    @ManyToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;
}
