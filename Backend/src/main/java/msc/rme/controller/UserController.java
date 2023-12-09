package msc.rme.controller;

import jakarta.servlet.http.HttpServletRequest;
import msc.rme.binding.User;
import msc.rme.service.UserService;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;
import java.util.Objects;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    private static final String UNAUTHENTICATED = "Unauthorized request";
    private static final String NOT_SPECIFIED = "Resource not correctly specified";
    private static final String NOT_UPDATED = "Resource could not be updated";

    @GetMapping()
    public ResponseEntity<Object> findUser(HttpServletRequest request) {
        String id = userService.validateJWT(request);
        if (id==null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(UNAUTHENTICATED);
        }
        try {
            User result = userService.getUser(id);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User was not found");
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/{resource}") // resource options: s, f, a, w
    public ResponseEntity<Object> findResource(@PathVariable String resource, HttpServletRequest request) {
        String id = userService.validateJWT(request);
        if (id==null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(UNAUTHENTICATED);
        }
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
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(NOT_SPECIFIED);
            }
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource was not found");
        } catch(NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource could not be found");
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/new/{resource}")
    public ResponseEntity<Object> addResource(@PathVariable String resource, HttpServletRequest request,
                                              @RequestParam(required = false ) String searchString,
                                              @RequestParam(required = false ) String propertyId,
                                              @RequestParam(required = false ) String message,
                                              @RequestParam(required = false ) String leisure,
                                              @RequestParam(required = false ) String personal_care,
                                              @RequestParam(required = false ) String retail,
                                              @RequestParam(required = false ) String fitness,
                                              @RequestParam(required = false ) String finance,
                                              @RequestParam(required = false ) String transportation,
                                              @RequestParam(required = false ) String emergency)
    {
        String id = userService.validateJWT(request);
        if (id==null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(UNAUTHENTICATED);
        }
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
            } else if (Objects.equals(resource, "w")  && leisure != null && personal_care != null && retail != null && fitness != null && finance != null && transportation != null && emergency != null) {
                userService.updateWeights(id, leisure, personal_care, retail, fitness, finance, transportation, emergency);
                return ResponseEntity.status(HttpStatus.OK).body("Weights were added");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(NOT_SPECIFIED);
            }
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource was not updated");
        } catch(NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(NOT_UPDATED);
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PatchMapping("/update/email")
    public ResponseEntity<Object> updateEmail(@RequestParam String email, HttpServletRequest request) {
        String id = userService.validateJWT(request);
        if (id==null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(UNAUTHENTICATED);
        }
        try {
            return userService.updateEmail(id, email);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(NOT_UPDATED);
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PatchMapping("/update/{resource}") // s, w.
    public ResponseEntity<Object> updateResources(@PathVariable String resource, HttpServletRequest request,
                                                  @RequestParam(required = false) String searchString,
                                                  @RequestParam(required = false) String newSearchString,
                                                  @RequestParam(required = false ) String leisure,
                                                  @RequestParam(required = false ) String personal_care,
                                                  @RequestParam(required = false ) String retail,
                                                  @RequestParam(required = false ) String fitness,
                                                  @RequestParam(required = false ) String finance,
                                                  @RequestParam(required = false ) String transportation,
                                                  @RequestParam(required = false ) String emergency) {
        String id = userService.validateJWT(request);
        if (id==null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(UNAUTHENTICATED);
        }
        try {
            if (Objects.equals(resource, "s") && searchString != null && newSearchString != null) {
                userService.addSearch(id, newSearchString);
                userService.removeSearch(id, searchString);
                return ResponseEntity.status(HttpStatus.OK).body("Search was updated");
            } else if (Objects.equals(resource, "w") && leisure != null && personal_care != null && retail != null && fitness != null && finance != null && transportation != null && emergency != null) {
                userService.updateWeights(id, leisure, personal_care, retail, fitness, finance, transportation, emergency);
                return ResponseEntity.status(HttpStatus.OK).body("Weights were updated");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(NOT_SPECIFIED);
            }
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource was not updated");
        } catch(NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(NOT_UPDATED);
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/remove/{resource}") // s f w
    public ResponseEntity<Object> removeResource(@PathVariable String resource, HttpServletRequest request,
                                                 @RequestParam(required = false ) String searchString,
                                                 @RequestParam(required = false ) String propertyId) {
        String id = userService.validateJWT(request);
        if (id==null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(UNAUTHENTICATED);
        }
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
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(NOT_SPECIFIED);
            }
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource was not removed");
        } catch(NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource could not be removed");
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/remove")
    public Object removeUser(HttpServletRequest request) {
        String id = userService.validateJWT(request);
        if (id==null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(UNAUTHENTICATED);
        }
        try {
            return userService.deleteUser(id);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(NOT_UPDATED);
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}