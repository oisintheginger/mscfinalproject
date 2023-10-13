package msc.HME;

public record QuickViewProperty(long propertyId, double longitude, double latitude, double price, String[] tags,
                                String address, String image, String description) {

}