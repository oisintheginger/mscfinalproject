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
        String sql = "SELECT mi.propertyID, a.geoLocation, mi.price, mi.bathrooms, mi.bedrooms, a.streetAddress, a.zipcode, mi.overview, GROUP_CONCAT(img.propertyURL) AS Images FROM MainInformation mi INNER JOIN Addresses a ON mi.addressID = a.addressID LEFT JOIN images img ON mi.propertyID = img.propertyID WHERE mi.availableNow = 1 GROUP BY mi.propertyID;";
        return jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(QuickViewProperty.class));
    }

    // get property details by id
}
