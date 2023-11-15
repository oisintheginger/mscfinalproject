package msc.HME.service;

import msc.HME.binding.Enquiry;
import msc.HME.binding.User;
import msc.HME.binding.UserWeights;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.*;

@Service
public class UserService {

    private final JdbcTemplate jdbcTemplate;
    private final CognitoService cognitoService;

    @Autowired
    public UserService(JdbcTemplate jdbcTemplate, CognitoService cognitoService) {
        this.jdbcTemplate = jdbcTemplate;
        this.cognitoService = cognitoService;
    }

    public User getUser(String id) {
        String sql = """
                SELECT *
                FROM user
                WHERE id = ?;
                """;
        return jdbcTemplate.queryForObject(
                sql,
                BeanPropertyRowMapper.newInstance(User.class),
                id
        );
    }

    public Object findSearches(String id) {
        String sql = """
                SELECT
                    JSON_UNQUOTE(JSON_EXTRACT(searches, '$')) AS searches
                FROM
                    user
                WHERE
                        id = ?;
                """;
        String searchString = jdbcTemplate.queryForObject(
                sql,
                String.class,
                id
        );
        if (searchString == null) {
            throw new NoSuchElementException();
        }
        List<String> splitString = List.of(searchString.split("\""));
        List<String> result = new ArrayList<>();
        for (int i = 7; i < splitString.size() ;i += 4) {
            result.add(splitString.get(i));
        }
        return result;
    }

    public Object findFaves(String id) {
        String sql = """
                SELECT
                    JSON_UNQUOTE(JSON_EXTRACT(favourites, '$')) AS all_favourites
                FROM
                	user
                WHERE
                    id = ?;
                """;
        String faveString = jdbcTemplate.queryForObject(
                sql,
                String.class,
                id
        );
        if (faveString == null) {
            throw new NoSuchElementException();
        }
        List<String> splitFaves = List.of(faveString.split("\""));
        List<String> result = new ArrayList<>();
        for (int i = 7; i < splitFaves.size() ;i += 4) {
            result.add(splitFaves.get(i));
        }
        return result;

    }

    public Object findApplication(String id) {
        String sql = """
                SELECT
                    applications
                FROM user
                WHERE id = ?
                """;
        String appString = jdbcTemplate.queryForObject(
                sql,
                String.class,
                id
        );
        if (appString == null) {
            throw new NoSuchElementException();
        }
        List<String> splitFaves = List.of(appString.split("\""));
        List<Enquiry> result = new ArrayList<>();
        for (int i = 5; i < splitFaves.size() ;i += 4) {
            Enquiry app = new Enquiry(Long.parseLong(splitFaves.get(i)), splitFaves.get(i+2));
            result.add(app);
        }
        return result;

    }

    public Object findWeights(String id) {
        String sql = """
                SELECT
                    weights
                FROM user
                WHERE id = ?
                """;

        String weightString = jdbcTemplate.queryForObject(
                sql,
                String.class,
                id
        );
        if (weightString == null) {
            throw new NoSuchElementException();
        }
        List<String> splitWeights = List.of(weightString.split("\""));
        UserWeights result = new UserWeights(Integer.parseInt(splitWeights.get(3)), Integer.parseInt(splitWeights.get(7)), Integer.parseInt(splitWeights.get(11)), Integer.parseInt(splitWeights.get(15)), Integer.parseInt(splitWeights.get(19)), Integer.parseInt(splitWeights.get(23)), Integer.parseInt(splitWeights.get(27)));

        System.out.println(result);
        return result;
    }

    public void addSearch(String id, String search) {
        String sql = """
                UPDATE user
                SET
                    searches = JSON_ARRAY_APPEND(searches, '$', JSON_OBJECT('key', ?))
                WHERE
                        id = ?
                """;
        int rows = jdbcTemplate.update(sql, search, id);
        if (rows == 0) {
            throw new NoSuchElementException();
        }
    }

    public void addFaves(String id, String propertyId) {
        String sql = """
                UPDATE user
                SET
                    favourites = JSON_ARRAY_APPEND(favourites, '$', JSON_OBJECT('newKey', ?))
                WHERE
                        id = ?
                """;
        int rows = jdbcTemplate.update(sql, propertyId, id);
        if (rows == 0) {
            throw new NoSuchElementException();
        }
    }

    public void addApplication(String id, String propertyId, String message) {
        String sql = """
                UPDATE user
                SET
                    applications = JSON_ARRAY_APPEND(applications, '$', JSON_OBJECT(?, ?))
                WHERE
                        id = ?
                """;
        int rows = jdbcTemplate.update(sql, propertyId, message, id);
        if (rows == 0) {
            throw new NoSuchElementException();
        }
    }

    public void updateWeights(String id, String entertainment, String pharmacies, String retail, String fitness, String financial, String transportation, String emergency) {
        String sql = """
                UPDATE user
                SET weights = JSON_REPLACE(weights, '$', JSON_ARRAY(JSON_OBJECT('entertainment', ?), JSON_OBJECT('pharmacies', ?), JSON_OBJECT('retail', ?), JSON_OBJECT('fitness', ?), JSON_OBJECT('financial', ?), JSON_OBJECT('transportation', ?), JSON_OBJECT('emergency', ?)))
                WHERE id = ?
                """;
        int rows = jdbcTemplate.update(sql, entertainment, pharmacies, retail, fitness, financial, transportation, emergency, id);
        if (rows == 0) {
            throw new NoSuchElementException();
        }
    }

    public ResponseEntity<Object> updateEmail(String id, String email) {
        //update cognito
        ResponseEntity<Object> result = cognitoService.updateUserEmail(id, email);
        if (result.getStatusCode().is2xxSuccessful()) {
            //update user table
            String sql = """
                    UPDATE user
                    SET
                        email = ?
                    WHERE
                            id = ?
                    """;
            int rows = jdbcTemplate.update(sql, email, id);
            if (rows == 0) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Email could not be completely removed");
            }
        }
        return result;
    }

    public ResponseEntity<Object> deleteUser(String id) {
        // delete from cognito
        ResponseEntity<Object> result = cognitoService.deleteUser(id);
        if (result.getStatusCode().is2xxSuccessful()) {
            //delete from user table
            String sql = "DELETE FROM user WHERE id=?";
            int rows = jdbcTemplate.update(sql, id);
            if (rows == 0) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User could not be completely removed");
            }
        }
        return result;

    }

    //leaves empty json object fix!
    public void removeSearch(String id, String searchString) {
        String sql = """
                UPDATE user
                SET searches = JSON_REMOVE(
                        searches,
                        JSON_UNQUOTE(JSON_SEARCH(searches, 'one', ?))
                    )
                WHERE
                        id = ?
                """;
        jdbcTemplate.update(sql, searchString, id);
    }

    //leaves empty json object fix!
    public void removeFave(String id, String propertyId) {
        String sql = """
                UPDATE user
                SET favourites = JSON_REMOVE(
                        favourites,
                        JSON_UNQUOTE(JSON_SEARCH(favourites, 'one', ?))
                    )
                WHERE
                        id = ?
                """;
        jdbcTemplate.update(sql, propertyId, id);
    }

    public void removeApplication(String id, String propertyId) {
        String sql = """
                """;
        // determine sql query
        jdbcTemplate.update(sql, propertyId, id);
    }
}