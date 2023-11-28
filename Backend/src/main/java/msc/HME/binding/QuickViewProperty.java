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

    @JsonProperty
    private List<String> tags;

    // Default constructor
    public QuickViewProperty() {}

    public QuickViewProperty(Long propertyId, Double longitude, Double latitude, BigDecimal price, Integer bathrooms, Integer bedrooms, String streetAddress, String zipcode, String overview, ArrayList<String> images, List<String> tags) {
        this.propertyId = propertyId;
        this.longitude = longitude;
        this.latitude = latitude;
        this.price = price;
        this.bathrooms = bathrooms;
        this.bedrooms = bedrooms;
        this.streetAddress = streetAddress;
        this.zipcode = zipcode;
        this.overview = overview;
        this.images = images;
        this.tags = tags;
    }
}
