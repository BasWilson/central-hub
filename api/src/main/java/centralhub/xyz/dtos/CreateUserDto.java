package centralhub.xyz.dtos;

public class CreateUserDto {
    private String email, name, school, password;

    public String getEmail() {
        return this.email;
    }

    public String getName() {
        return this.name;
    }

    public String getSchool() {
        return this.school;
    }

    public String getPassword() {
        return this.password;
    }
}
