package um.feri.si.ris_backend.service;

import org.springframework.stereotype.Service;
import um.feri.si.ris_backend.model.Comment;
import um.feri.si.ris_backend.model.Recipe;
import um.feri.si.ris_backend.repository.CommentRepository;
import um.feri.si.ris_backend.repository.RecipeRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final RecipeRepository recipeRepository;

    public CommentService(CommentRepository commentRepository,  RecipeRepository recipeRepository) {
        this.commentRepository = commentRepository;
        this.recipeRepository = recipeRepository;
    }

    public List<Comment> getCommentsForRecipe(Long id) {
        return commentRepository.findByRecipe_Id(id);
    }

    public void deleteCommentsForRecipe(Long id) {
        commentRepository.deleteById(id);
    }

    public Comment addComment(Long recipeId, Comment comment) {
        System.out.println("Trying to fetch recipe with id = " + recipeId);
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));
        System.out.println("Found recipe: " + recipe.getName());
        comment.setRecipe(recipe);
        comment.setDate(LocalDate.now());
        return commentRepository.save(comment);
    }
}
