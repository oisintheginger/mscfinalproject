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
    
    @GetMapping("/{id}/{resource}") // resource options: s, f, a, w
    public ResponseEntity<Object> findResource(@PathVariable String id, @PathVariable String resource) {
        try {
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
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource was not found");
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @PostMapping("/new/{id}/{resource}")
    public ResponseEntity<Object> addResource(@PathVariable String id, @PathVariable String resource,
                                                 @RequestParam(defaultValue = "") String searchString,
                                                 @RequestParam(defaultValue = "") String propertyId,
                                                @RequestParam(defaultValue = "") String message,
                                                @RequestParam(defaultValue = "null") String entertainment,
                                                @RequestParam(defaultValue = "null") String pharmacies,
                                                @RequestParam(defaultValue = "null") String retail,
                                              @RequestParam(defaultValue = "null") String fitness,
                                              @RequestParam(defaultValue = "null") String financial,
                                              @RequestParam(defaultValue = "null") String transportation,
                                              @RequestParam(defaultValue = "null") String emergency)
    {
        try {
            if (Objects.equals(resource, "s") && !searchString.isBlank()) {
                userService.addSearch(id, searchString);
                return ResponseEntity.status(HttpStatus.OK).body("Search was added");
            } else if (Objects.equals(resource, "f") && !propertyId.isBlank()) {
                userService.addFaves(id, propertyId);
                return ResponseEntity.status(HttpStatus.OK).body("Favourite was added");
            } else if (Objects.equals(resource, "a")  && !propertyId.isBlank() && !message.isBlank()) {
                userService.addApplication(id, propertyId, message);
                return ResponseEntity.status(HttpStatus.OK).body("Application was added");
            } else if (Objects.equals(resource, "w")) {
                userService.updateWeights(id, entertainment, pharmacies, retail, fitness, financial, transportation, emergency);
                return ResponseEntity.status(HttpStatus.OK).body("Weights were added");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Resource not correctly specified");
            }
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource could not be updated");
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    //    @PutMapping("/update/email")
    //POST user id

    //@PutMapping update resources

    @DeleteMapping("/remove/{id}/{resource}")
    public ResponseEntity<Object> removeResource(@PathVariable String id, @PathVariable String resource) {
//        try {
            if (Objects.equals(resource, "s")) {
            } else if (Objects.equals(resource, "f")) {
            } else if (Objects.equals(resource, "a")) {
            } else if (Objects.equals(resource, "w")) {
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Resource not correctly specified");
            }
//        } catch (EmptyResultDataAccessException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource was not found");
//        } catch (DataAccessException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
//        }
        return null;
    }

//    @DeleteMapping("/remove/{id}")
    //DELETE: req: user id, deleted resource (ss, fave, user weights, applications)



}
