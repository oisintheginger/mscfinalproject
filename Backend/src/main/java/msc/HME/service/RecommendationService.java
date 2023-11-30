package msc.HME.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Service
public class RecommendationService {

    private final JdbcTemplate jdbcTemplate;
    private final RestTemplate restTemplate;
    @Autowired
    public RecommendationService(JdbcTemplate jdbcTemplate, RestTemplate restTemplate) {
        this.jdbcTemplate = jdbcTemplate;
        this.restTemplate = restTemplate;
    }

    public String getCosSimilarity(String userId) {
        String apiUrl = "https://kcxecfvcyg.execute-api.eu-west-1.amazonaws.com/Prod/";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestBody = "{\"id\":\"" + userId + "\"}";

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        String result = restTemplate.postForObject(apiUrl, request, String.class);

        System.out.println("Response from API Gateway: " + result);
        return result;
    }

    public JsonNode getKnn(List<Integer> ids) throws JsonProcessingException {
        String apiUrl = "http://34.240.63.53:5000/recommend";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        ObjectMapper mapper = new ObjectMapper();
        String requestBody = mapper.writeValueAsString(Map.of("property_ids", ids));
        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        String result = restTemplate.postForObject(apiUrl, request, String.class);

        JsonNode jsonObj = mapper.readTree(result);

        return jsonObj.get("recommended_property_ids");
    }

}
