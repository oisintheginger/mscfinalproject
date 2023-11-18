package msc.HME.binding;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.lang.reflect.Array;
import java.util.ArrayList;
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

    public User(String id, String email, ArrayList<Search> searches, ArrayList<Favourite> favourites, UserWeights weights, ArrayList<Enquiry> applications) {
        this.id = id;
        this.email = email;
        this.searches = searches;
        this.favourites = favourites;
        this.weights = weights;
        this.applications = applications;
    }
}