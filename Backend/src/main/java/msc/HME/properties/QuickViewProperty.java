package msc.HME.properties;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuickViewProperty {
    // TO DO: String image
    @JsonProperty
    private long propertyId;

    @JsonProperty
    private String longitude;

    @JsonProperty
    private String latitude;

    @JsonProperty
    private double price;

    @JsonProperty
    private List<String> tags;

    @JsonProperty
    private String address;

    @JsonProperty
    private String description;

    @JsonProperty
    private String image;

    // Default constructor
    public QuickViewProperty() {}

    // Parameterized constructor
    public QuickViewProperty(int propertyId, String longitude, String latitude, double price, List<String> tags, String address, String description, String image) {
        this.propertyId = propertyId;
        this.longitude = longitude;
        this.latitude = latitude;
        this.price = price;
        this.tags = tags;
        this.address = address;
        this.description = description;
        this.image = image;
    }
}



































