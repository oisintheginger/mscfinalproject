package msc.HME.binding;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonalScoresResponse {

    @JsonProperty
    private Integer service_score_ID;

    @JsonProperty
    private Integer neighbourhoodID;

    @JsonProperty
    private Double emergency_score;

    @JsonProperty
    private Double finance_score;

    @JsonProperty
    private Double fitness_score;

    @JsonProperty
    private Double leisure_score;

    @JsonProperty
    private Double personal_care_score;

    @JsonProperty
    private Double retail_score;

    @JsonProperty
    private Double transportation_score;

    @JsonProperty
    private Double overall_score;

    public PersonalScoresResponse() {
    }

    public PersonalScoresResponse(Integer service_score_ID, Integer neighbourhoodID, Double emergency_score, Double finance_score, Double fitness_score, Double leisure_score, Double personal_care_score, Double retail_score, Double transportation_score, Double overall_score) {
        this.service_score_ID = service_score_ID;
        this.neighbourhoodID = neighbourhoodID;
        this.emergency_score = emergency_score;
        this.finance_score = finance_score;
        this.fitness_score = fitness_score;
        this.leisure_score = leisure_score;
        this.personal_care_score = personal_care_score;
        this.retail_score = retail_score;
        this.transportation_score = transportation_score;
        this.overall_score = overall_score;
    }
}
