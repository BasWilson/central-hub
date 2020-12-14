package centralhub.xyz.filters;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import centralhub.xyz.services.DBService;
import centralhub.xyz.services.JWTService;

@Component
@Order(1)
public class AuthenticationFilter extends GenericFilterBean {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // Check for paths that do not require auth
        if ("/users".equals(httpRequest.getRequestURI()) && httpRequest.getMethod().equals("POST")
                || "/auth/signin".equals(httpRequest.getRequestURI())) {
            chain.doFilter(request, response);
            return;
        }

        if (httpRequest.getHeader("Authorization") == null) {
            httpResponse.sendError(401);
            return;
        }

        String bearerToken = httpRequest.getHeader("Authorization").substring(7);
        try {
            String userId = JWTService.verify(bearerToken);

            if (userId == null) {
                httpResponse.sendError(401);
                return;
            }

            // Get the profile of user and assign to request
            httpRequest.setAttribute("user", DBService.findUserByUserId(userId));
        } catch (Exception e) {
            e.printStackTrace();
            httpResponse.sendError(400);
            return;
        }
        chain.doFilter(request, response);
    }
}