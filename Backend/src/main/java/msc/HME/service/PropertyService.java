package msc.HME.service;

import msc.HME.binding.QuickViewProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

@Service
public class PropertyService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PropertyService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<QuickViewProperty> getAllQVProperties() {
        String sql = """
                SELECT mi.propertyID,\s
                       ST_X(a.geoLocation) AS latitude,\s
                       ST_Y(a.geoLocation) AS longitude,\s
                       mi.price,\s
                       mi.bathrooms,\s
                       mi.bedrooms,\s
                       a.streetAddress,\s
                       a.zipcode,\s
                       mi.overview,\s
                       GROUP_CONCAT(img.propertyURL) AS Images\s
                FROM MainInformation mi\s
                INNER JOIN Addresses a ON mi.addressID = a.addressID\s
                LEFT JOIN images img ON mi.propertyID = img.propertyID\s
                WHERE mi.availableNow = 1\s
                GROUP BY mi.propertyID;
                """;
        return jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(QuickViewProperty.class));
    }

    // get property details by id
}
