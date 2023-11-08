package msc.HME.controller;

import msc.HME.binding.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/propertiesPlaceholder")
public class PropertiesControllerPlaceholder {
    //logger refactoring?
    private final JsonPlaceholderService jsonPlaceholderService;

    public PropertiesControllerPlaceholder(JsonPlaceholderService jsonPlaceholderService) {
        this.jsonPlaceholderService = jsonPlaceholderService;
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

}