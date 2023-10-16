package msc.HME.controller;

import jakarta.annotation.PostConstruct;
import msc.HME.properties.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    List<QuickViewProperty> findAll() {
        return properties;
    }

    /*
    TO DO:
    @GetMapping("/{id}")
    Optional<QuickViewProperty> findById(@PathVariable Integer id) {
        return Optional.ofNullable(posts
                .stream()
                .filter(property -> property.id().equals(id))
                .findFirst()
                .orElseThrow(() -> new PropertyNotFoundException("Property with id: " + id + " not found.")));
    }
*/
    @PostConstruct
    private void init() {
        if(properties.isEmpty()) {
            properties = jsonPlaceholderService.loadProperties();
        }
    }
}