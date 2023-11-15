package msc.HME.binding;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class User {

    @JsonProperty
    private String id;

    @JsonProperty
    private String email;

    @JsonProperty
    private ArrayList<String> searches;

    @JsonProperty
    private ArrayList<Integer> favourites;

    @JsonProperty
    private UserWeights weights;

    @JsonProperty
    private ArrayList<Enquiry> applications;

    public User() {
    }

    public User(String id, String email, ArrayList<String> searches, ArrayList<Integer> favourites, UserWeights weights, ArrayList<Enquiry> applications) {
        this.id = id;
        this.email = email;
        this.searches = searches;
        this.favourites = favourites;
        this.weights = weights;
        this.applications = applications;
    }
}
