package um.feri.si.ris_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import um.feri.si.ris_backend.model.Users;
import um.feri.si.ris_backend.service.UsersService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UsersRestController {

    private final UsersService usersService;

    public UsersRestController(UsersService usersService) {
        this.usersService = usersService;
    }

    @PostMapping("/login")
    public Users login(@RequestBody Map<String, String> body) {
        String username = body.get("username");

        return usersService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }


    @GetMapping
    public ResponseEntity<List<Users>> getAllUsers() {
        return ResponseEntity.ok(usersService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Users> getUserById(@PathVariable Long id) {
        return usersService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/new")
    public ResponseEntity<Users> createUser(@RequestBody Users user) {
        if (usersService.usernameExists(user.getUsername())) {
            return ResponseEntity.badRequest().body(null);
        }

        if (usersService.emailExists(user.getEmail())) {
            return ResponseEntity.badRequest().body(null);
        }

        Users saved = usersService.saveUser(user);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Users> updateUser(@PathVariable Long id, @RequestBody Users userData) {
        return usersService.getUserById(id)
                .map(user -> {
                    user.setUsername(userData.getUsername());
                    user.setName(userData.getName());
                    user.setSurname(userData.getSurname());
                    user.setEmail(userData.getEmail());
                    user.setPassword(userData.getPassword());
                    return ResponseEntity.ok(usersService.saveUser(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (!usersService.getUserById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        usersService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
