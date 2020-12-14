package centralhub.xyz.services;

import java.io.UnsupportedEncodingException;
import java.util.Date;

import com.auth0.jwt.*;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import centralhub.xyz.utils.DateHelpers;

public class JWTService {

    private JWTService() {
    }

    // TODO: Maybe move to a config file or env. idk
    private static final String SECRET_KEY = "ALONGASSSSSECRETTHATSHOULDBEBETTERTHANTHIS";
    private static final String USER_ID = "userId";

    // Java is gay
    public static String sign(String userId) {
        Algorithm algorithm;
        try {
            algorithm = Algorithm.HMAC256(SECRET_KEY);
            return JWT.create().withIssuer("centralhub").withClaim(USER_ID, userId)
                    .withExpiresAt(DateHelpers.addHoursToJavaUtilDate(new Date(), 24 * 7)).sign(algorithm);
        } catch (IllegalArgumentException | UnsupportedEncodingException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static String verify(String tokenToVerify) {
        Algorithm algorithm;
        try {
            algorithm = Algorithm.HMAC256(SECRET_KEY);
            DecodedJWT decoded = JWT.decode(tokenToVerify);
            JWTVerifier verifier = JWT.require(algorithm).withIssuer("centralhub")
                    .withClaim(USER_ID, decoded.getClaim(USER_ID).asString())
                    .acceptExpiresAt(decoded.getExpiresAt().getTime()).build();
            verifier.verify(tokenToVerify);
            return decoded.getClaim(USER_ID).asString();
        } catch (JWTVerificationException | IllegalArgumentException | UnsupportedEncodingException e) {
            e.printStackTrace();
            return null;
        }
    }
}
