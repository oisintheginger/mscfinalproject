package msc.HME.binding;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Application {

    @JsonProperty
    private Long propertyId;

    @JsonProperty
    private String message;

    public Application() {
    }

    public Application(long propertyId, String message) {
        this.propertyId = propertyId;
        this.message = message;
    }
}
