package um.feri.si.ris_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import um.feri.si.ris_backend.model.Users;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByUsername(String username);
    Optional<Users> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
