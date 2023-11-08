package msc.HME.controller;

import msc.HME.binding.QuickViewProperty;
import msc.HME.service.PropertyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/properties")
public class PropertiesController {

    private final PropertyService QVPService;

    public PropertiesController(PropertyService qvpService) {
        QVPService = qvpService;
    }

    @GetMapping
    public ResponseEntity<List<QuickViewProperty>> findAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "50") int size) { // default size hard coded for now
        List<QuickViewProperty> properties = QVPService.getAllQVProperties();
        return ResponseEntity.ok(properties.subList((page-1)*size, (page-1)*size+(size-1)));
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