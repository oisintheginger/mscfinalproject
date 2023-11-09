package msc.HME.binding;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class QVPResponse {

    @JsonProperty
    private int totalPages;

    @JsonProperty
    private List<QuickViewProperty> properties;

    public QVPResponse(int totalPages, List<QuickViewProperty> properties) {
        this.totalPages = totalPages;
        this.properties = properties;
    }
}
