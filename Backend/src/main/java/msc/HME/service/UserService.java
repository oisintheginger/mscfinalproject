package msc.HME.service;

import msc.HME.Application;
import msc.HME.binding.Enquiry;
import msc.HME.binding.User;
import msc.HME.binding.UserWeights;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
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
            System.out.println("couldnt be found lol");
//            return new DataAccessException; /// not sure what to do her eugh
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
            System.out.println("couldnt be found lol");
//            return new DataAccessException; /// not sure what to do her eugh
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
            System.out.println("couldnt be found lol");
//            return new DataAccessException; /// not sure what to do her eugh
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
            System.out.println("couldnt be found lol");
//            return new DataAccessException; /// not sure what to do her eugh
        }
        List<String> splitWeights = List.of(weightString.split("\""));
        UserWeights result = new UserWeights(Integer.parseInt(splitWeights.get(3)), Integer.parseInt(splitWeights.get(7)), Integer.parseInt(splitWeights.get(11)), Integer.parseInt(splitWeights.get(15)), Integer.parseInt(splitWeights.get(19)), Integer.parseInt(splitWeights.get(23)), Integer.parseInt(splitWeights.get(27)));

        System.out.println(result);
        return result;
    }
}
