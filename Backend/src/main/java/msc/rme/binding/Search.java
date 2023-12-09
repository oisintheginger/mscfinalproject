package msc.rme.binding;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Search {

    @JsonProperty
    private String search;

    public Search() {
    }

    public Search(String search) {
        this.search = search;
    }
}
