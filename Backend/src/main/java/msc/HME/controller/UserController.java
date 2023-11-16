package msc.HME.controller;

import msc.HME.binding.User;
import msc.HME.service.UserService;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
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
        } catch(NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource could not be found");
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/new/{id}/{resource}")
    public ResponseEntity<Object> addResource(@PathVariable String id, @PathVariable String resource,
                                              @RequestParam(required = false, defaultValue = "") String searchString,
                                              @RequestParam(required = false, defaultValue = "") String propertyId,
                                              @RequestParam(required = false, defaultValue = "") String message,
                                              @RequestParam(required = false, defaultValue = "null") String entertainment,
                                              @RequestParam(required = false, defaultValue = "null") String pharmacies,
                                              @RequestParam(required = false, defaultValue = "null") String retail,
                                              @RequestParam(required = false, defaultValue = "null") String fitness,
                                              @RequestParam(required = false, defaultValue = "null") String financial,
                                              @RequestParam(required = false, defaultValue = "null") String transportation,
                                              @RequestParam(required = false, defaultValue = "null") String emergency)
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
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource was not updated");
        } catch(NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource could not be updated");
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PatchMapping("/update/{id}/email")
    public ResponseEntity<Object> updateEmail(@PathVariable String id, @RequestParam String email) {
        try {
            return userService.updateEmail(id, email);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource could not be updated");
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PatchMapping("/update/{id}/{resource}") // s,
    public ResponseEntity<Object> updateResources(@PathVariable String id, @PathVariable String resource,
                                                  @RequestParam(required = false, defaultValue = "") String searchString,
                                                  @RequestParam(required = false, defaultValue = "") String propertyId,
                                                  @RequestParam String newVal) {
        //        try {
        if (Objects.equals(resource, "s") && !searchString.isBlank() && !newVal.isBlank()) {
            userService.addSearch(id, newVal);
            userService.removeSearch(id, searchString);
        } else if (Objects.equals(resource, "a")) {
            
        } else if (Objects.equals(resource, "w")) {

        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Resource not correctly specified");
        }
//        catch (EmptyResultDataAccessException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource was not updated");
//        } catch(NoSuchElementException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource could not be updated");
//        } catch (DataAccessException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
//        }
        return null;
    }

    @DeleteMapping("/remove/{id}/{resource}") // s f w
    public ResponseEntity<Object> removeResource(@PathVariable String id, @PathVariable String resource,
                                                 @RequestParam(required = false, defaultValue = "") String searchString,
                                                 @RequestParam(required = false, defaultValue = "") String propertyId) {
        try {
            if (Objects.equals(resource, "s") && !searchString.isBlank()) {
                userService.removeSearch(id, searchString);
                return ResponseEntity.status(HttpStatus.OK).body("Search was removed");
            } else if (Objects.equals(resource, "f") && !propertyId.isBlank()) {
                userService.removeFave(id, propertyId);
                return ResponseEntity.status(HttpStatus.OK).body("Favourite was removed");
            } else if (Objects.equals(resource, "w")) {
                userService.updateWeights(id, "", "", "", "", "", "", "");
                return ResponseEntity.status(HttpStatus.OK).body("User weights were removed");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Resource not correctly specified");
            }
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource was not removed");
        } catch(NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource could not be removed");
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/remove/{id}")
    public Object removeUser(@PathVariable String id) {
        try {
            return userService.deleteUser(id);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource could not be updated");
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}