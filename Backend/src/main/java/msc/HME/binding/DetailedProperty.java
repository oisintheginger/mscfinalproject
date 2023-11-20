
package msc.HME.binding;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class DetailedProperty {

    @JsonProperty
    private Integer propertyId;

    @JsonProperty
    private Double price;

    @JsonProperty
    private Integer bedrooms;

    @JsonProperty
    private Integer bathrooms;

    @JsonProperty
    private String propertyType;

    @JsonProperty
    private String streetAddress;

    @JsonProperty
    private String zipcode;

    @JsonProperty
    private Double longitude;

    @JsonProperty
    private Double latitude;

    @JsonProperty
    private String description;

    @JsonProperty
    private String[] petsAllowed;

    @JsonProperty
    private LocalDate datePosted;

    @JsonProperty
    private String[] images;

    @JsonProperty
    private Double overallCrimeScore;

    @JsonProperty
    private Double servicesOverallScore;

    @JsonProperty
    private Integer servicesCount;

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

//    @JsonProperty
//    private Integer bankCount;
//
//    @JsonProperty
//    private Integer barCount;
//
//    @JsonProperty
//    private Integer beauty_salonCount;
//
//    @JsonProperty
//    private Double bus_stationCount;

    public DetailedProperty() {}

    public DetailedProperty(Integer propertyId, Double price, Integer bedrooms, Integer bathrooms, String propertyType, String streetAddress, String zipcode, Double longitude, Double latitude, String description, String[] petsAllowed, LocalDate datePosted, String[] images, Double overallCrimeScore, Double servicesOverallScore, Integer servicesCount, Double finance_score, Double transportation_score, Double personal_care_score, Double retail_score, Double fitness_score, Double leisure_score, Double emergency_score) {
        this.propertyId = propertyId;
        this.price = price;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.propertyType = propertyType;
        this.streetAddress = streetAddress;
        this.zipcode = zipcode;
        this.longitude = longitude;
        this.latitude = latitude;
        this.description = description;
        this.petsAllowed = petsAllowed;
        this.datePosted = datePosted;
        this.images = images;
        this.overallCrimeScore = overallCrimeScore;
        this.servicesOverallScore = servicesOverallScore;
        this.servicesCount = servicesCount;
        this.finance_score = finance_score;
        this.transportation_score = transportation_score;
        this.personal_care_score = personal_care_score;
        this.retail_score = retail_score;
        this.fitness_score = fitness_score;
        this.leisure_score = leisure_score;
        this.emergency_score = emergency_score;
    }
}

