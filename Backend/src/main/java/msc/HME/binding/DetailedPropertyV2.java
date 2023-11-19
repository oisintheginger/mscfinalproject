
package msc.HME.binding;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class DetailedPropertyV2 {

    @JsonProperty
    private int propertyId;

    @JsonProperty
    private double price;

    @JsonProperty
    private int bedrooms;

    @JsonProperty
    private int bathrooms;

    @JsonProperty
    private String propertyType;

    @JsonProperty
    private String streetAddress;

    @JsonProperty
    private String zipcode;

    @JsonProperty
    private String geolocation;

    @JsonProperty
    private String description;

    @JsonProperty
    private boolean petsAllowed;

    @JsonProperty
    private LocalDate lastUpdated;

    @JsonProperty
    private LocalDate datePosted;

    @JsonProperty
    private int safetyScore;

    @JsonProperty
    private int servicesScore;

    @JsonProperty
    private String[] images;
    // private String atAGlanceFacts; maybe use a structured object or Map instead of a raw JSON string

    public DetailedPropertyV2() {}

    public DetailedPropertyV2(int propertyId, double price, int bedrooms, int bathrooms, String propertyType, String streetAddress, String zipcode, String geolocation, String description, boolean petsAllowed, LocalDate lastUpdated, LocalDate datePosted, String[] images) {
        this.propertyId = propertyId;
        this.price = price;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.propertyType = propertyType;
        this.streetAddress = streetAddress;
        this.zipcode = zipcode;
        this.geolocation = geolocation;
        this.description = description;
        this.petsAllowed = petsAllowed;
        this.lastUpdated = lastUpdated;
        this.datePosted = datePosted;
        this.images = images;
    }

}

