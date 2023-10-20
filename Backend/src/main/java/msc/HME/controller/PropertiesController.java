package msc.HME.controller;

import jakarta.annotation.PostConstruct;
import msc.HME.properties.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertiesController {
    //logger refactoring?
    private final JsonPlaceholderService jsonPlaceholderService;
    private List<QuickViewProperty> properties = new ArrayList<QuickViewProperty>();

    public PropertiesController(JsonPlaceholderService jsonPlaceholderService) {
        this.jsonPlaceholderService = jsonPlaceholderService;
    }

    @GetMapping
    public ResponseEntity<List<QuickViewProperty>> findAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "50") int size) { // default size hard coded for now
        if (size > properties.size() || page*size > properties.size()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(properties.subList((page-1)*10, (page-1)*10+(size-1)));
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

    // business logic to service layer -> refactoring
    @PostConstruct
    private void init() {
        if(properties.isEmpty()) {
            properties = jsonPlaceholderService.loadProperties();
        }
    }
}