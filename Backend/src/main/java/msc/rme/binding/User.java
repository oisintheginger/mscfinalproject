package msc.rme.binding;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class User {

    @JsonProperty
    private String id;

    @JsonProperty
    private String email;

    @JsonProperty
    private List<Search> searches;

    @JsonProperty
    private List<Favourite> favourites;

    @JsonProperty
    private UserWeights weights;

    @JsonProperty
    private List<Enquiry> applications;

    public User() {
    }

    public User(String id, String email, List<Search> searches, List<Favourite> favourites, UserWeights weights, List<Enquiry> applications) {
        this.id = id;
        this.email = email;
        this.searches = searches;
        this.favourites = favourites;
        this.weights = weights;
        this.applications = applications;
    }
}