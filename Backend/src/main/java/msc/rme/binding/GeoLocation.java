package msc.rme.binding;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GeoLocation {

    @JsonProperty
    private Long propertyId;

    @JsonProperty
    private Double longitude;

    @JsonProperty
    private Double latitude;

    public GeoLocation() {}

    public GeoLocation(long propertyId, double longitude, Double latitude) {
        this.propertyId = propertyId;
        this.longitude = longitude;
        this.latitude = latitude;
    }
}
