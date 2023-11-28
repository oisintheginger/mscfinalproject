package msc.HME.controller;

import msc.HME.service.RecommentationService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/recs")
public class RecommendationController {

    private final RecommentationService recommentationService;

    public RecommendationController(RecommentationService recommentationService) {
        this.recommentationService = recommentationService;
    }
}
