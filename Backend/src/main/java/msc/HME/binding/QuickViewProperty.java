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
    private String geoLocation; //data type needs to be fixed

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
    private String description;

    @JsonProperty
    private ArrayList<String> images;

    // Default constructor
    public QuickViewProperty() {}

    public QuickViewProperty(long propertyId, String geoLocation, BigDecimal price, int bathrooms, int bedrooms, List<String> tags, String streetAddress, String zipcode, String description, ArrayList<String> images) {
        this.propertyId = propertyId;
        this.geoLocation = geoLocation;
        this.price = price;
        this.bathrooms = bathrooms;
        this.bedrooms = bedrooms;
//        this.tags = tags;
        this.streetAddress = streetAddress;
        this.zipcode = zipcode;
        this.description = description;
        this.images = images;
    }
}
