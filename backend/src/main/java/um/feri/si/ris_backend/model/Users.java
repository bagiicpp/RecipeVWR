package um.feri.si.ris_backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Table(name = "users")
@Data
@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String name;
    private String surname;
    private String email;
    private String password;
    private String taste;
}
