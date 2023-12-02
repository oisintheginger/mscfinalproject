package msc.HME.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.servlet.http.HttpServletRequest;
import msc.HME.binding.Favourite;
import msc.HME.service.RecommendationService;
import msc.HME.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/recs")
public class RecommendationController {

    private final RecommendationService recommendationService;

    private final UserService userService;

    public RecommendationController(RecommendationService recommendationService, UserService userService) {
        this.recommendationService = recommendationService;
        this.userService = userService;
    }

    @GetMapping("/1")
    ResponseEntity<Object> getKNN(HttpServletRequest request) {
        try {
            String id = userService.validateJWT(request);
            if (id==null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized request");
            }
            List<Favourite> list = (List<Favourite>) userService.findFaves(id);
            List<Integer> propertyId = new ArrayList<>();
            for (Favourite favourite : list) {
                propertyId.add(Integer.valueOf(favourite.getFavourite()));
            }
            JsonNode result = recommendationService.getKnn(propertyId);
            return ResponseEntity.status(HttpStatus.OK).body(propertyId);
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid JSON format");
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getMessage());
        } catch (ResourceAccessException e) {
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body("Service unavailable or network issue");
        }
    }

}