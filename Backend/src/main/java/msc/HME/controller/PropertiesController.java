package msc.HME.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.ws.rs.QueryParam;
import msc.HME.binding.*;
import msc.HME.service.PropertyService;
import msc.HME.service.UserService;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/properties")
public class PropertiesController {

    private final PropertyService propertyService;
    private final UserService userService;

    public PropertiesController(PropertyService qvpService, UserService userService) {
        this.propertyService = qvpService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<Object> findAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "50") int size) { // default size hard coded for now
        List<QuickViewProperty> properties = propertyService.getAllQVProperties();
        int startIndex = (page - 1) * size;
        int endIndex = Math.min(startIndex + size, properties.size());
        List<QuickViewProperty> paginatedProperties = properties.subList(startIndex, endIndex);
        // to ensure the total pages is always rounded up this is used: (numerator + denominator - 1) / denominator
        int totalPages = (properties.size() + size-1)/size;
        QVPResponse result = new QVPResponse(totalPages, paginatedProperties);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/batch")
    public ResponseEntity<Object> batchQVP(@RequestParam List<Long> ids) {
        System.out.println(ids);
        if (CollectionUtils.isEmpty(ids)) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("The 'ids' parameter cannot be empty");
        }
        try {
            List<QuickViewProperty> result = propertyService.batchQVProperties(ids);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Property was not found");
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    @GetMapping("/{id}")
    ResponseEntity<Object> findQVProperty(@PathVariable Long id) {
        try {
            QuickViewProperty result = propertyService.getQVProperty(id);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Property was not found");
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }
    

    @GetMapping("/details/{id}")
    ResponseEntity<Object> findPropertyById(@PathVariable Integer id, HttpServletRequest request) {
        try {
            DetailedProperty property = propertyService.getPropertyDetails(id);
            if (property == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Property not found");
            }
            String userId = userService.validateJWT(request);
            if (userId != null) {
                propertyService.registerClick(userId, id);
            }
            return ResponseEntity.status(HttpStatus.OK).body(property);
        } catch(NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Click data could not be stored");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("details/scores/{id}")
    ResponseEntity<Object> findScoresById(@PathVariable Integer id, HttpServletRequest request) {
        try {
            PersonalScores PDscores;
            String userId = userService.validateJWT(request);
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User was not found");
            } else {
                List<Double> scores = propertyService.getPersonalScores(userId, id.toString());
                if (scores != null && scores.size() == 8) {
                    PDscores = new PersonalScores(scores.get(7), scores.get(1), scores.get(6),scores.get(4), scores.get(5), scores.get(2), scores.get(3), scores.get(0));
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid scores data");
                }
            }
            return ResponseEntity.status(HttpStatus.OK).body(PDscores);
        } catch(NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Click data could not be stored");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/locations")
    ResponseEntity<Object> getAll() {
        try {
            List<GeoLocation> locations = propertyService.getGeoLocation();
            return ResponseEntity.ok(locations);
        } catch (DataAccessException e) {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error accessing the Database");
        }
    }

    @PostMapping("/eval/{id}")
    ResponseEntity<Object> registerEval(@PathVariable Integer id, HttpServletRequest request, @RequestParam Integer feedback){
        try {
            String userId = userService.validateJWT(request);
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }
            propertyService.registerEval(id, userId, feedback);
            return ResponseEntity.status(HttpStatus.OK).body("User feedback was registered");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Unable to register feedback");
        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: Database access issue");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error: Unexpected error occurred");
        }
    }

}