package msc.HME.binding;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserWeights {

    @JsonProperty
    private Integer one;

    @JsonProperty
    private Integer two;

    @JsonProperty
    private Integer three;

    @JsonProperty
    private Integer four;

    @JsonProperty
    private Integer five;

    @JsonProperty
    private Integer six;

    @JsonProperty
    private Integer seven;

    public UserWeights() {
    }

    public UserWeights(Integer one, Integer two, Integer three, Integer four, Integer five, Integer six, Integer seven) {
        this.one = one;
        this.two = two;
        this.three = three;
        this.four = four;
        this.five = five;
        this.six = six;
        this.seven = seven;
    }
}
