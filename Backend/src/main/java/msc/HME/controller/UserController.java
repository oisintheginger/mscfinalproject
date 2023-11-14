package msc.HME.controller;

import msc.HME.binding.User;
import msc.HME.service.UserService;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*") // for now //secure way for user id/authorisation to send???
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findUser(@PathVariable String id) {
        try {
            User result = userService.getUser(id);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User was not found");
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    //GET req: user id, resource (ss, faves, user weights)
    @GetMapping("/{id}/{resource}") // resource options: s, f, a, w
    public ResponseEntity<Object> findResource(@PathVariable String id, @PathVariable String resource) {
//        try {
            if (Objects.equals(resource, "s")) {
                Object result = userService.findSearches(id);
                return ResponseEntity.status(HttpStatus.OK).body(result);
            } else if (Objects.equals(resource, "f")) {
                Object result = userService.findFaves(id);
                return ResponseEntity.status(HttpStatus.OK).body(result);
            } else if (Objects.equals(resource, "a")) {
                Object result = userService.findApplication(id);
                return ResponseEntity.status(HttpStatus.OK).body(result);
            } else if (Objects.equals(resource, "w")) {
                Object result = userService.findWeights(id);
                return ResponseEntity.status(HttpStatus.OK).body(result);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Resource not correctly specified");
            }
//        } catch () {
//
//        }
    }

//    @PostMapping("/update/email")
    //POST user id

//    @PostMapping("/update/resource") ???
    //POST req: user id, new resource (ss, fave, user weights, application )
    

//    @DeleteMapping("/remove") ???
    //DELETE: req: user id, deleted resource (ss, fave, user weights, applications)



}
