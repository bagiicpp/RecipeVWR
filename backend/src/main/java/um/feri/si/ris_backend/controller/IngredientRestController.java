package um.feri.si.ris_backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import um.feri.si.ris_backend.model.Ingredient;
import um.feri.si.ris_backend.repository.IngredientRepository;

import java.util.List;

@RestController
@RequestMapping("/ingredient")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class IngredientRestController {

    private final IngredientRepository ingredientRepository;

    @GetMapping("/all")
    public List<Ingredient> findAll() {
        return ingredientRepository.findAll();
    }

    @PostMapping("/new")
    public Ingredient addNew(@RequestBody Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }
}