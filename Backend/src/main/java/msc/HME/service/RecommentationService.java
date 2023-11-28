package msc.HME.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

@Service
public class RecommentationService {

    private final JdbcTemplate jdbcTemplate;

    private final UserService userService;

    @Autowired
    public RecommentationService(JdbcTemplate jdbcTemplate, UserService userService) {
        this.jdbcTemplate = jdbcTemplate;
        this.userService = userService;
    }

    @GetMapping
    ResponseEntity<Object> getRecs(HttpServletRequest request) {
        String id = userService.validateJWT(request);
        if (id==null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized request");
        }
        //call recommendations service method ...
        return null;
    }
}
