package um.feri.si.ris_backend.service;

import org.springframework.stereotype.Service;
import um.feri.si.ris_backend.model.Users;
import um.feri.si.ris_backend.repository.UsersRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService {

    private final UsersRepository usersRepository;

    public UsersService(UsersRepository usersRepository) {this.usersRepository = usersRepository;}

    public Optional<Users> findByUsername(String username) {
        return usersRepository.findByUsername(username);
    }

    // Get all users
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    // Get user by ID
    public Optional<Users> getUserById(Long id) {
        return usersRepository.findById(id);
    }

    // Create or update user
    public Users saveUser(Users user) {
        return usersRepository.save(user);
    }

    // Delete user
    public void deleteUser(Long id) {
        usersRepository.deleteById(id);
    }

    // Find by username
    public Optional<Users> getByUsername(String username) {
        return usersRepository.findByUsername(username);
    }

    // Find by email
    public Optional<Users> getByEmail(String email) {
        return usersRepository.findByEmail(email);
    }

    // Check if username exists
    public boolean usernameExists(String username) {
        return usersRepository.existsByUsername(username);
    }

    // Check if email exists
    public boolean emailExists(String email) {
        return usersRepository.existsByEmail(email);
    }
}