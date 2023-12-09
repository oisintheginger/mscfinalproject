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

public class FavouriteRowMapper implements RowMapper<List<Favourite>>{
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public List<Favourite> mapRow(ResultSet rs, int rowNum) throws SQLException {
        String favourites = rs.getString("favourites");
        try {
            List<Favourite> favesList = objectMapper.readValue(favourites, new TypeReference<>() {
            });
            favesList.removeIf(fave -> fave.getFavourite() == null);
            favesList.removeIf(fave -> Objects.equals(fave.getFavourite(), "1"));
            return favesList;
        } catch (JsonProcessingException e) {
            throw new RowMapperProcessingException("Error processing JSON data", e);
        }

    }
}
