package msc.HME.properties;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

public class QuickViewProperty {
    // TO DO: String image
    @JsonProperty
    private int propertyId;

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

    // Default constructor
    public QuickViewProperty() {}

    // Parameterized constructor
    public QuickViewProperty(int propertyId, String longitude, String latitude, double price, List<String> tags, String address, String description) {
        this.propertyId = propertyId;
        this.longitude = longitude;
        this.latitude = latitude;
        this.price = price;
        this.tags = tags;
        this.address = address;
        this.description = description;
    }

    // Getters and setters for each field...

    public long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(int propertyId) {
        this.propertyId = propertyId;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
