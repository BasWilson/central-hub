package centralhub.xyz.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

import centralhub.xyz.models.User;

public class DBService {

    private static Logger logger = Logger.getLogger(DBService.class.getName());

    private DBService() {
        try {
            // Load driver for sqlite
            Class.forName("org.sqlite.JDBC");
        } catch (ClassNotFoundException e) {
            logger.log(Level.SEVERE, e.getMessage());
        }
    }

    public static void createTables() throws SQLException {

        // Connect to the database, in this case locally with sqlite
        // Also create the statement
        try (Connection conn = DriverManager.getConnection("jdbc:sqlite:centralhub.db");
                Statement statement = conn.createStatement()) {

            // Write the statement and execute it
            statement.execute("CREATE TABLE IF NOT EXISTS users (".concat("userId text PRIMARY KEY,")
                    .concat("email text UNIQUE NOT NULL,").concat("name text NOT NULL,").concat("school text NOT NULL,")
                    .concat("lang text NOT NULL,").concat("password text NOT NULL").concat(");"));

            // Add more statements here if nescesary

        } catch (SQLException e) {
            logger.log(Level.SEVERE, e.getMessage());
        }
    }

    public static Boolean createUser(User user) {
        // Connect to the database, in this case locally with sqlite
        // Also create the statement
        try (Connection conn = DriverManager.getConnection("jdbc:sqlite:centralhub.db");
                PreparedStatement statement = conn.prepareStatement(
                        "INSERT INTO users(userId, email, name, school, lang, password) VALUES(?,?,?,?,?,?)")) {

            // Write the statement and execute it
            statement.setString(1, user.userId);
            statement.setString(2, user.email);
            statement.setString(3, user.name);
            statement.setString(4, user.school);
            statement.setString(5, user.lang);
            statement.setString(6, user.getPassword());
            statement.executeUpdate();

            return true;
        } catch (SQLException e) {
            logger.log(Level.SEVERE, e.getMessage());
            return false;
        }
    }

    public static User findUserByEmail(String email) {
        // Connect to the database, in this case locally with sqlite
        // Also create the statement
        try (Connection conn = DriverManager.getConnection("jdbc:sqlite:centralhub.db");
                PreparedStatement statement = conn.prepareStatement("SELECT * FROM users WHERE email = ?")) {

            // Write the statement and execute it
            statement.setString(1, email);
            ResultSet rs = statement.executeQuery();

            if (rs.next()) {
                return new User(rs.getString("userId"), rs.getString("email"), rs.getString("name"),
                        rs.getString("school"), rs.getString("lang"), rs.getString("password"));
            } else
                return null;
        } catch (SQLException e) {
            logger.log(Level.SEVERE, e.getMessage());
            return null;
        }
    }

    public static User findUserByUserId(String userId) {
        // Connect to the database, in this case locally with sqlite
        // Also create the statement
        try (Connection conn = DriverManager.getConnection("jdbc:sqlite:centralhub.db");
                PreparedStatement statement = conn.prepareStatement("SELECT * FROM users WHERE userId = ?")) {

            // Write the statement and execute it
            statement.setString(1, userId);
            ResultSet rs = statement.executeQuery();

            if (rs.next()) {
                return new User(rs.getString("userId"), rs.getString("email"), rs.getString("name"),
                        rs.getString("school"), rs.getString("lang"), rs.getString("password"));
            } else
                return null;
        } catch (SQLException e) {
            logger.log(Level.SEVERE, e.getMessage());
            return null;
        }
    }
}
