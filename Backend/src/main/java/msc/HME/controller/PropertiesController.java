package msc.HME.controller;

import msc.HME.binding.DetailedProperty;
import msc.HME.binding.JsonPlaceholderService;
import msc.HME.binding.QuickViewProperty;
import msc.HME.service.PropertyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/properties")
public class PropertiesController {

    private final PropertyService propertyService;
    private final JsonPlaceholderService jsonPlaceholderService;

    public PropertiesController(PropertyService qvpService, JsonPlaceholderService jsonPlaceholderService) {
        this.propertyService = qvpService;
        this.jsonPlaceholderService = jsonPlaceholderService;
    }

    @GetMapping
    public ResponseEntity<JSONObject> findAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "50") int size) { // default size hard coded for now
        List<QuickViewProperty> properties = propertyService.getAllQVProperties();
        ArrayList<Object> paginatedProperties = new ArrayList<>(properties.subList((page-1)*size, (page-1)*size+(size-1)));
        JSONObject result = new JSONObject();
        // to ensure the total pages is always rounded up this is used: (numerator + denominator - 1) / denominator
        result.put("totalPages", (properties.size() + size-1)/size);
        result.put("properties", paginatedProperties);
        return ResponseEntity.ok(result);
    }

//    @GetMapping("/{id}")
//    ResponseEntity<QuickViewProperty> findQVProperty(@PathVariable Long id) {
//        QuickViewProperty property = propertyService.getQVProperty(id);
//        return ResponseEntity.ok(property);
//    }

    @GetMapping("/{id}")
    ResponseEntity<DetailedProperty> findPropertyById(@PathVariable Integer id) {
        if (id <= 0) {
            return ResponseEntity.badRequest().build();
        }
        DetailedProperty property = jsonPlaceholderService.loadDetailedProperty(id);
        if (property == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(property);
    }



    // get all geolocations + property ids

//    @GetMapping("/{id}")
//    ResponseEntity<DetailedProperty> findPropertyById(@PathVariable Integer id) {
////        if (id <= 0) {
////            return ResponseEntity.badRequest().build();
////        }
////        DetailedProperty property = jsonPlaceholderService.loadDetailedProperty(id);
////        if (property == null) {
////            return ResponseEntity.notFound().build();
////        }
////        return ResponseEntity.ok(property);
//    }


}