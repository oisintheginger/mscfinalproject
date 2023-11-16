package msc.HME.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import msc.HME.binding.*;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

public class UserRowMapper implements RowMapper<User> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();

        String id = rs.getString("id");
        user.setId(id);

        String email = rs.getString("email");
        user.setEmail(email);

        String searches = rs.getString("searches");
        List<Search> searchList;
        String favourites = rs.getString("favourites");
        List<Favourite> favesList;
        String applications = rs.getString("applications");
        List<Enquiry> appList;
        String weights = rs.getString("weights");
        List<UserWeights> weightList;
        try {
            searchList = objectMapper.readValue(searches, new TypeReference<>() {});
            searchList.removeIf(search -> search.getSearch() == null);
            favesList = objectMapper.readValue(favourites, new TypeReference<>() {});
            favesList.removeIf(fave -> fave.getFavourite() == null);
            appList = objectMapper.readValue(applications, new TypeReference<>() {});
            weightList = objectMapper.readValue(weights, new TypeReference<>() {});
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        user.setSearches(searchList);
        user.setFavourites(favesList);
        user.setApplications(appList);
        user.setWeights(weightList.get(0));
        return user;
    }
}

