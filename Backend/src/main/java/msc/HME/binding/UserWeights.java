package msc.HME.binding;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserWeights {

    @JsonProperty
    private Integer leisure;

    @JsonProperty
    private Integer personal_care;

    @JsonProperty
    private Integer retail;

    @JsonProperty
    private Integer fitness;

    @JsonProperty
    private Integer finance;

    @JsonProperty
    private Integer transportation;

    @JsonProperty
    private Integer emergency;

    public UserWeights() {
    }

    public UserWeights(Integer leisure, Integer personal_care, Integer retail, Integer fitness, Integer finance, Integer transportation, Integer emergency) {
        this.leisure = leisure;
        this.personal_care = personal_care;
        this.retail = retail;
        this.fitness = fitness;
        this.finance = finance;
        this.transportation = transportation;
        this.emergency = emergency;
    }
}