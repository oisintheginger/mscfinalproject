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

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/properties")
public class PropertiesController {

    private final PropertyService QVPService;
    private final JsonPlaceholderService jsonPlaceholderService;

    public PropertiesController(PropertyService qvpService, JsonPlaceholderService jsonPlaceholderService) {
        this.QVPService = qvpService;
        this.jsonPlaceholderService = jsonPlaceholderService;
    }

    @GetMapping
    public ResponseEntity<ArrayList<Object>> findAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "50") int size) { // default size hard coded for now
        List<QuickViewProperty> properties = QVPService.getAllQVProperties();
        ArrayList<Object> paginatedProperties = new ArrayList<>(properties.subList((page-1)*size, (page-1)*size+(size-1)));
            // to ensure the total pages is always rounded up this is used: (numerator + denominator - 1) / denominator
        paginatedProperties.add(0, "[{\"total_pages\":\""+ (properties.size() + size-1 /size) +"\"}]");
        return ResponseEntity.ok(paginatedProperties);
    }

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