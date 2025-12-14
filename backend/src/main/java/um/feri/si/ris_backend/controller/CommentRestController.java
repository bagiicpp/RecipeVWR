    package um.feri.si.ris_backend.controller;

    import org.springframework.web.bind.annotation.*;
    import um.feri.si.ris_backend.model.Comment;
    import um.feri.si.ris_backend.service.CommentService;

    import java.util.List;

    @RestController
    @RequestMapping("/comment")
    @CrossOrigin(origins = "*")
    public class CommentRestController {

        private final CommentService commentService;

        public CommentRestController(CommentService commentService) {
            this.commentService = commentService;
        }

        @GetMapping("/all/{recipeId}")
        public List<Comment> getAllComments(@PathVariable Long recipeId) {
            return commentService.getCommentsForRecipe(recipeId);
        }

        @PostMapping("/new/{recipeId}")
        public Comment newComment(@PathVariable Long recipeId, @RequestBody Comment comment) {
            return commentService.addComment(recipeId, comment);
        }

        @DeleteMapping("/{commentId}")
        public void deleteComment(@PathVariable Long commentId) {
            commentService.deleteCommentsForRecipe(commentId);
        }
    }
