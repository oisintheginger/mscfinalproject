package msc.HME.binding;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserWeights {

    @JsonProperty
    private Integer entertainment;

    @JsonProperty
    private Integer pharmacies;

    @JsonProperty
    private Integer retail;

    @JsonProperty
    private Integer fitness;

    @JsonProperty
    private Integer financial;

    @JsonProperty
    private Integer transportation;

    @JsonProperty
    private Integer emergency;

    public UserWeights() {
    }

    public UserWeights(Integer entertainment, Integer pharmacies, Integer retail, Integer fitness, Integer financial, Integer transportation, Integer emergency) {
        this.entertainment = entertainment;
        this.pharmacies = pharmacies;
        this.retail = retail;
        this.fitness = fitness;
        this.financial = financial;
        this.transportation = transportation;
        this.emergency = emergency;
    }
}
