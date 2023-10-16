package msc.HME.properties;

import java.util.List;

public record QuickViewProperty(long propertyId, String longitude, String latitude, double price, List<String> tags,
                                String address) {
//TO DO: String image, String description
}