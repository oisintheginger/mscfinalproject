package msc.HME.mapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import msc.HME.binding.*;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class EnquiryRowMapper implements RowMapper<List<Enquiry>>{
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public List<Enquiry> mapRow(ResultSet rs, int rowNum) throws SQLException {
        String applications = rs.getString("applications");
        try {
            return objectMapper.readValue(applications, new TypeReference<>() {
            });
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

    }
}
