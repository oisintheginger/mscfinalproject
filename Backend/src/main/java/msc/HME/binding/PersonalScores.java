package msc.HME.binding;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PersonalScores {

    @JsonProperty
    private Double servicesOverallScore;

    @JsonProperty
    private Double finance_score;

    @JsonProperty
    private Double transportation_score;

    @JsonProperty
    private Double personal_care_score;

    @JsonProperty
    private Double retail_score;

    @JsonProperty
    private Double fitness_score;

    @JsonProperty
    private Double leisure_score;

    @JsonProperty
    private Double emergency_score;

    public PersonalScores() {
    }

    public PersonalScores(Double servicesOverallScore, Double finance_score, Double transportation_score, Double personal_care_score, Double retail_score, Double fitness_score, Double leisure_score, Double emergency_score) {
        this.servicesOverallScore = servicesOverallScore;
        this.finance_score = finance_score;
        this.transportation_score = transportation_score;
        this.personal_care_score = personal_care_score;
        this.retail_score = retail_score;
        this.fitness_score = fitness_score;
        this.leisure_score = leisure_score;
        this.emergency_score = emergency_score;
    }
}
