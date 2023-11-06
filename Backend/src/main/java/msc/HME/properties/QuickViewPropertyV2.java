package msc.HME.properties;

import java.math.BigDecimal;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuickViewPropertyV2 {
    // TO DO: String image
    @JsonProperty
    private long propertyId;

    @JsonProperty
    private String geoLocation;

    @JsonProperty
    private BigDecimal price;

    @JsonProperty
    private int bathrooms;


    @JsonProperty
    private int bedrooms;

    @JsonProperty
    private List<String> tags;

    @JsonProperty
    private String streetAddress;

    @JsonProperty
    private String city;

    @JsonProperty
    private String state;

    @JsonProperty
    private String zipcode;

    @JsonProperty
    private String overview;

    @JsonProperty
    private String image;

    // Default constructor
    public QuickViewPropertyV2() {}

    public QuickViewPropertyV2(long propertyId, String geoLocation, BigDecimal price, int bathrooms, int bedrooms, List<String> tags, String streetAddress, String city, String state, String zipcode, String overview, String image) {
        this.propertyId = propertyId;
        this.geoLocation = geoLocation;
        this.price = price;
        this.bathrooms = bathrooms;
        this.bedrooms = bedrooms;
        this.tags = tags;
        this.streetAddress = streetAddress;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.overview = overview;
        this.image = image;
    }
}
