package msc.HME.controller;

import msc.HME.binding.*;
import msc.HME.service.PropertyService;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/properties")
public class PropertiesController {

    private final PropertyService propertyService;

    public PropertiesController(PropertyService propertyService) {
        this.propertyService = propertyService;
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

//    @GetMapping("/details/{id}")
//    ResponseEntity<DetailedProperty> findPropertyById(@PathVariable Integer id) {
//
//    }

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