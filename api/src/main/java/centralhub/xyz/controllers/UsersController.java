package centralhub.xyz.controllers;

import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;

import com.fasterxml.uuid.Generators;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import centralhub.xyz.dtos.CreateUserDto;
import centralhub.xyz.models.User;
import centralhub.xyz.objects.GenericMessage;
import centralhub.xyz.services.DBService;
import centralhub.xyz.ext.*;

@RestController
@RequestMapping("users")
public class UsersController {

    private PasswordAuthentication pAuthentication = new PasswordAuthentication();
    // private Logger logger = Logger.getLogger(UsersController.class.getName());

    @GetMapping()
    public String getSignedInUser(HttpServletRequest request) {
        return ((User) request.getAttribute("user")).getSafeUser().toString();
    }

    @GetMapping("/{userId}")
    public GenericMessage getUser(@PathVariable("userId") String userId) {
        return new GenericMessage(userId);
    }

    @PostMapping()
    public JSONObject createUser(@RequestBody() CreateUserDto data) {

        // Create user object
        User user = new User(Generators.timeBasedGenerator().generate().toString(), data.getEmail(), data.getName(),
                data.getSchool(), "NL", pAuthentication.hash(data.getPassword().toCharArray()));

        // Save user
        Boolean created = DBService.createUser(user);

        // Check if db query was unsuccessfull
        if (Boolean.FALSE.equals(created)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email in use");
        }

        // Return user object
        return user.getSafeUser();
    }
}
