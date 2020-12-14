
package centralhub.xyz;

import centralhub.xyz.services.DBService;

import java.sql.SQLException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@ComponentScan(basePackages = { "centralhub.xyz.controllers", "centralhub.xyz.filters" })
public class CentralHub {
  public static void main(String[] args) throws SQLException {
    SpringApplication.run(CentralHub.class, args);
    DBService.createTables();
  }
}
