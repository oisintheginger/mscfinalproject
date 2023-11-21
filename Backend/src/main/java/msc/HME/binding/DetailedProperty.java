
package msc.HME.binding;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class DetailedProperty {

    @JsonProperty
    private Long propertyId;

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

    @JsonProperty
    private Integer bankCount;

    @JsonProperty
    private Integer barCount;

    @JsonProperty
    private Integer beauty_salonCount;

    @JsonProperty
    private Integer bus_stationCount;

    @JsonProperty
    private Integer cafeCount;

    @JsonProperty
    private Integer fire_stationCount;

    @JsonProperty
    private Integer gymCount;

    @JsonProperty
    private Integer hospitalCount;

    @JsonProperty
    private Integer night_clubCount;

    @JsonProperty
    private Integer parkCount;

    @JsonProperty
    private Integer pharmacyCount;

    @JsonProperty
    private Integer police_stationCount;

    @JsonProperty
    private Integer restaurantCount;

    @JsonProperty
    private Integer supermarketCount;

    @JsonProperty
    private Integer train_stationCount;

    @JsonProperty
    private Integer transit_stationCount;

    public DetailedProperty() {}

    public DetailedProperty(Long propertyId, Double price, Integer bedrooms, Integer bathrooms, String propertyType, String streetAddress, String zipcode, Double longitude, Double latitude, String description, String[] petsAllowed, LocalDate datePosted, String[] images, Double overallCrimeScore, Double servicesOverallScore, Integer servicesCount, Double finance_score, Double transportation_score, Double personal_care_score, Double retail_score, Double fitness_score, Double leisure_score, Double emergency_score, Integer bankCount, Integer barCount, Integer beauty_salonCount, Integer bus_stationCount, Integer cafeCount, Integer fire_stationCount, Integer gymCount, Integer hospitalCount, Integer night_clubCount, Integer parkCount, Integer pharmacyCount, Integer police_stationCount, Integer restaurantCount, Integer supermarketCount, Integer train_stationCount, Integer transit_stationCount) {
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
        this.bankCount = bankCount;
        this.barCount = barCount;
        this.beauty_salonCount = beauty_salonCount;
        this.bus_stationCount = bus_stationCount;
        this.cafeCount = cafeCount;
        this.fire_stationCount = fire_stationCount;
        this.gymCount = gymCount;
        this.hospitalCount = hospitalCount;
        this.night_clubCount = night_clubCount;
        this.parkCount = parkCount;
        this.pharmacyCount = pharmacyCount;
        this.police_stationCount = police_stationCount;
        this.restaurantCount = restaurantCount;
        this.supermarketCount = supermarketCount;
        this.train_stationCount = train_stationCount;
        this.transit_stationCount = transit_stationCount;
    }
}
