
package msc.HME.properties;

import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonProperty;

public class DetailedProperty {
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
    private String address;
    @JsonProperty
    private String zipcode;
    @JsonProperty
    private String longitude;
    @JsonProperty
    private String latitude;
    @JsonProperty
    private String description;
    @JsonProperty
    private boolean petsAllowed;
    @JsonProperty
    private LocalDate lastUpdated;
    @JsonProperty
    private LocalDate datePosted;
    @JsonProperty
    private float TBDScore;
    @JsonProperty
    private String[] images;
    // private String atAGlanceFacts; maybe use a structured object or Map instead of a raw JSON string

    public DetailedProperty() {}

    public DetailedProperty(int propertyId, double price, int bedrooms, int bathrooms, String propertyType, String address, String zipcode, String longitude, String latitude, String description, boolean petsAllowed, LocalDate lastUpdated, LocalDate datePosted, float TBDScore, String[] images) {
        this.propertyId = propertyId;
        this.price = price;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.propertyType = propertyType;
        this.address = address;
        this.zipcode = zipcode;
        this.longitude = longitude;
        this.latitude = latitude;
        this.description = description;
        this.petsAllowed = petsAllowed;
        this.lastUpdated = lastUpdated;
        this.datePosted = datePosted;
        this.TBDScore = TBDScore;
        this.images = images;
    }

    public int getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(int propertyId) {
        this.propertyId = propertyId;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getBedrooms() {
        return bedrooms;
    }

    public void setBedrooms(int bedrooms) {
        this.bedrooms = bedrooms;
    }

    public int getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(int bathrooms) {
        this.bathrooms = bathrooms;
    }

    public String getPropertyType() {
        return propertyType;
    }

    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isPetsAllowed() {
        return petsAllowed;
    }

    public void setPetsAllowed(boolean petsAllowed) {
        this.petsAllowed = petsAllowed;
    }

    public LocalDate getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDate lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public LocalDate getDatePosted() {
        return datePosted;
    }

    public void setDatePosted(LocalDate datePosted) {
        this.datePosted = datePosted;
    }

    public float getTBDScore() {
        return TBDScore;
    }

    public void setTBDScore(float TBDScore) {
        this.TBDScore = TBDScore;
    }

    public String[] getImages() {
        return images;
    }

    public void setImages(String[] images) {
        this.images = images;
    }
}

