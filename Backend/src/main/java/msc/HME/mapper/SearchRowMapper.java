package msc.HME.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import msc.HME.binding.*;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class SearchRowMapper implements RowMapper<List<Search>>{
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public List<Search> mapRow(ResultSet rs, int rowNum) throws SQLException {
        String searches = rs.getString("searches");
        try {
            return objectMapper.readValue(searches, new TypeReference<>() {
            });
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

    }
}
