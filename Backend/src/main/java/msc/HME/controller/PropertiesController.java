package msc.HME.controller;

import jakarta.annotation.PostConstruct;
import msc.HME.properties.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.constraints.Positive;
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
    public ResponseEntity<List<QuickViewProperty>> findAll() {
        return ResponseEntity.ok(properties);
    }

    @GetMapping("/{id}")
    ResponseEntity<DetailedProperty> findPropertyById(@PathVariable @Positive Integer id) {
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