package centralhub.xyz.controllers;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import centralhub.xyz.dtos.*;
import centralhub.xyz.models.User;
import centralhub.xyz.services.DBService;
import centralhub.xyz.services.JWTService;
import centralhub.xyz.ext.*;

@RestController
@RequestMapping("auth")
public class AuthController {

    private PasswordAuthentication pAuthentication = new PasswordAuthentication();

    @PostMapping("/signin")
    public String signIn(@RequestBody() SignInDto data) {

        // Save user
        User user = DBService.findUserByEmail(data.getEmail());

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "userNotFound");
        }

        // Compare password!
        if (pAuthentication.authenticate(data.getPassword().toCharArray(), user.getPassword())) {
            JSONObject object = new JSONObject();
            object.put("accessToken", JWTService.sign(user.userId));
            return object.toString();
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "userNotFound");
    }
}
