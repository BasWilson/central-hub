package centralhub.xyz.models;

import org.json.JSONObject;

public class User {
    public final String userId;
    public final String email;
    public final String name;
    public final String school;
    public final String lang;
    private final String password;

    public User(String userId, String email, String name, String school, String lang, String password) {
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.school = school;
        this.lang = lang;
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public JSONObject getSafeUser() {
        JSONObject object = new JSONObject();
        object.put("userId", userId);
        object.put("email", email);
        object.put("name", name);
        object.put("school", school);
        object.put("lang", lang);

        return object;
    }
}
