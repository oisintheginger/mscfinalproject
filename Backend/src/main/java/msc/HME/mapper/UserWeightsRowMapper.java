package msc.HME.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import msc.HME.binding.Search;
import msc.HME.binding.UserWeights;
import msc.HME.exception.RowMapperProcessingException;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class UserWeightsRowMapper implements RowMapper<UserWeights> {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public UserWeights mapRow(ResultSet rs, int rowNum) throws SQLException {
        String weights = rs.getString("weights");
        try {
            List<UserWeights> weightList = objectMapper.readValue(weights, new TypeReference<>() {
            });
            return new UserWeights(weightList.get(0).getLeisure(), weightList.get(1).getPersonal_care(), weightList.get(2).getRetail(), weightList.get(3).getFitness(), weightList.get(4).getFinance(), weightList.get(5).getTransportation(), weightList.get(6).getEmergency());
        } catch (JsonProcessingException e) {
            throw new RowMapperProcessingException("Error processing JSON data", e);
        }

    }
}