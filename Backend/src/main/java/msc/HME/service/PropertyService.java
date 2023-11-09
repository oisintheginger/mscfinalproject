package msc.HME.service;

import msc.HME.binding.GeoLocation;
import msc.HME.binding.QuickViewProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
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

    // get QVProperty by id
    public QuickViewProperty getQVProperty(Long id) {
        String sql = """
                SELECT mi.propertyID,
                    ST_X(a.geoLocation) AS latitude,
                    ST_Y(a.geoLocation) AS longitude,
                    mi.price,
                    mi.bathrooms,
                    mi.bedrooms,
                    a.streetAddress,
                    a.zipcode,
                    mi.overview,
                    GROUP_CONCAT(img.propertyURL) AS Images
                FROM MainInformation mi
                         INNER JOIN Addresses a ON mi.addressID = a.addressID
                         LEFT JOIN images img ON mi.propertyID = img.propertyID
                WHERE mi.availableNow = 1 AND mi.propertyID = ?
                GROUP BY mi.propertyID;
                """;
        return jdbcTemplate.queryForObject(
                sql,
                BeanPropertyRowMapper.newInstance(QuickViewProperty.class),
                id);
    }

    // get property details by id

    // get all geolocations and ids
    public List<GeoLocation> getGeoLocation() {
        String sql = """
                SELECT mi.propertyID,
                    ST_X(a.geoLocation) AS latitude,
                    ST_Y(a.geoLocation) AS longitude
                FROM MainInformation mi
                    INNER JOIN Addresses a ON mi.addressID = a.addressID
                WHERE mi.availableNow = 1
                GROUP BY mi.propertyID;
                
                """;
        return jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(GeoLocation.class));
    }
}
