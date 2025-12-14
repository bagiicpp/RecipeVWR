package um.feri.si.ris_backend;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import um.feri.si.ris_backend.model.Comment;
import um.feri.si.ris_backend.model.Recipe;
import um.feri.si.ris_backend.model.Users;
import um.feri.si.ris_backend.repository.RecipeRepository;
import um.feri.si.ris_backend.repository.UsersRepository;
import um.feri.si.ris_backend.service.CommentService;
import um.feri.si.ris_backend.service.UsersService;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RisBackendApplicationTests {

	private Users testUser;

	@Autowired
	private UsersService usersService;
	@Autowired
	private CommentService commentService;
	@Autowired
	private RecipeRepository recipeRepository;
	@Autowired
	private UsersRepository usersRepository;

	@Test
	void loginSuccess() {
		boolean loginOk = usersService.findByUsername("bagii")
				.map(u -> u.getPassword().equals("bato2005"))
				.orElse(false);

		assertTrue(loginOk);
	}

	@Test
	void loginWrongPassword() {
		boolean loginOk = usersService.findByUsername("bagii")
				.map(u -> u.getPassword().equals("16042005"))
				.orElse(false);

		assertFalse(loginOk);
	}
	@Test
	void addCommentSuccess() {
		Recipe recipe = new Recipe();
		recipe.setName("Test Recipe");
		recipe = recipeRepository.save(recipe);

		Comment coment = new Comment();
		coment.setText("Petar the Best");

		Comment savedComment = commentService.addComment(recipe.getId(), coment);

		assertNotNull(savedComment.getId());
	}

	@Test
	void addCommentFail() {
		Comment comment = new Comment();
		comment.setText("Petar the Best".repeat(1000));

		boolean valid = comment.getText().length() <= 255;

		assertFalse(valid);

	}
}
