package msc.HME;

public class QuickViewProperty {

    private final long propertyId;
    private final double longtitude;
    private final double latitude;
    private final double price;
    private final String[] tags;
    private final String address;
    private final String image;
    private final String description;

    public QuickViewProperty(long propertyId, double longtitude, double latitude, double price, String[] tags, String address, String image, String description) {
        this.propertyId = propertyId;
        this.longtitude = longtitude;
        this.latitude = latitude;
        this.price = price;
        this.tags = tags;
        this.address = address;
        this.image = image;
        this.description = description;
    }

    public long getPropertyId() {
        return propertyId;
    }

    public double getLongtitude() {
        return longtitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getPrice() {
        return price;
    }

    public String[] getTags() {
        return tags;
    }

    public String getAddress() {
        return address;
    }

    public String getImage() {
        return image;
    }

    public String getDescription() {
        return description;
    }
}