package msc.HME.binding;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Favourite {

    @JsonProperty
    private String favourite;

    public Favourite() {
    }

    public Favourite(String favourite) {
        this.favourite = favourite;
    }
}
