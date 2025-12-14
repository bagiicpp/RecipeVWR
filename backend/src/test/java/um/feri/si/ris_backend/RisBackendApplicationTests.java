package um.feri.si.ris_backend;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import um.feri.si.ris_backend.model.Users;
import um.feri.si.ris_backend.repository.UsersRepository;
import um.feri.si.ris_backend.service.UsersService;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class RisBackendApplicationTests {

	private Users testUser;

	@Autowired
	private UsersService usersService;

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

}
