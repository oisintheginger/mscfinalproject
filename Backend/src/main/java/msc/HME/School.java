package msc.HME;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class School {
    @JsonProperty
    private Integer schoolID;

    @JsonProperty
    private String school_0_name;

    @JsonProperty
    private Integer school_0_rating;

    @JsonProperty
    private Double school_0_distance;

    @JsonProperty
    private String school_0_link;

    @JsonProperty
    private String school_0_level;

    @JsonProperty
    private String school_0_grades;

    @JsonProperty
    private String school_0_type;

    @JsonProperty
    private String school_1_name;

    @JsonProperty
    private Integer school_1_rating;

    @JsonProperty
    private Double school_1_distance;

    @JsonProperty
    private String school_1_link;

    @JsonProperty
    private String school_1_level;

    @JsonProperty
    private String school_1_grades;

    @JsonProperty
    private String school_1_type;

    @JsonProperty
    private String school_2_name;

    @JsonProperty
    private Integer school_2_rating;

    @JsonProperty
    private Double school_2_distance;

    @JsonProperty
    private String school_2_link;

    @JsonProperty
    private String school_2_level;

    @JsonProperty
    private String school_2_grades;

    @JsonProperty
    private String school_2_type;


}
