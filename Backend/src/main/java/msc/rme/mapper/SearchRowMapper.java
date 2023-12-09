package msc.rme.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import msc.rme.binding.*;
import msc.rme.exception.RowMapperProcessingException;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Objects;

public class SearchRowMapper implements RowMapper<List<Search>>{
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public List<Search> mapRow(ResultSet rs, int rowNum) throws SQLException {
        String searches = rs.getString("searches");
        try {
            List<Search> searchList = objectMapper.readValue(searches, new TypeReference<>() {});
            searchList.removeIf(search -> search.getSearch() == null);
            searchList.removeIf(search -> Objects.equals(search.getSearch(), "1"));
            return searchList;
        } catch (JsonProcessingException e) {
            throw new RowMapperProcessingException("Error processing JSON data", e);
        }

    }
}
