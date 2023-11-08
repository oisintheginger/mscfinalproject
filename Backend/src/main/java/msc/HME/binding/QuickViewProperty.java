package msc.HME.binding;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuickViewProperty {
    // TO DO: String image
    @JsonProperty
    private Long propertyId;

    @JsonProperty
    private Double longitude;

    @JsonProperty
    private Double latitude;

    @JsonProperty
    private BigDecimal price;

    @JsonProperty
    private Integer bathrooms;

    @JsonProperty
    private Integer bedrooms;

//    @JsonProperty
//    private List<String> tags;

    @JsonProperty
    private String streetAddress;

    @JsonProperty
    private String zipcode;

    @JsonProperty
    private String overview;

    @JsonProperty
    private ArrayList<String> images;

    // Default constructor
    public QuickViewProperty() {}

    public QuickViewProperty(long propertyId, double longitude, double latitude, BigDecimal price, int bathrooms, int bedrooms, List<String> tags, String streetAddress, String zipcode, String overview, ArrayList<String> images) {
        this.propertyId = propertyId;
        this.longitude = longitude;
        this.latitude = latitude;
        this.price = price;
        this.bathrooms = bathrooms;
        this.bedrooms = bedrooms;
//        this.tags = tags;
        this.streetAddress = streetAddress;
        this.zipcode = zipcode;
        this.overview = overview;
        this.images = images;
    }
}
