package msc.HME.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
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
        List<QuickViewProperty> paginatedProperties = properties.subList((page-1)*size, (page-1)*size+(size-1));
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
                List<Double> scores = propertyService.getPersonalScores(userId, id.toString());
                if (scores != null && scores.size() == 8) {
                    property.setEmergency_score(scores.get(0));
                    property.setFinance_score(scores.get(1));
                    property.setFitness_score(scores.get(2));
                    property.setLeisure_score(scores.get(3));
                    property.setPersonal_care_score(scores.get(4));
                    property.setRetail_score(scores.get(5));
                    property.setTransportation_score(scores.get(6));
                    property.setServicesOverallScore(scores.get(7));
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid scores data");
                }
            }
            return ResponseEntity.status(HttpStatus.OK).body(property);
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
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

}