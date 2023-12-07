package msc.HME.service;

import msc.HME.binding.DetailedProperty;
import msc.HME.binding.GeoLocation;
import msc.HME.binding.QuickViewProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.*;

@Service
public class PropertyService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PropertyService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<QuickViewProperty> getAllQVProperties(
            Double minPrice, Double maxPrice, Integer minBedrooms, Integer minBathrooms
    ) {
        List<Object> parameters = new ArrayList<>();
        StringBuilder whereClause = new StringBuilder("mi.availableNow = 1");

        if (minPrice != null) {
            whereClause.append(" AND mi.price >= ?");
            parameters.add(minPrice);
        }

        if (maxPrice != null) {
            whereClause.append(" AND mi.price <= ?");
            parameters.add(maxPrice);
        }

        if (minBedrooms != null) {
            whereClause.append(" AND mi.bedrooms >= ?");
            parameters.add(minBedrooms);
        }

        if (minBathrooms != null) {
            whereClause.append(" AND mi.bathrooms >= ?");
            parameters.add(minBathrooms);
        }

        String sql = String.format("""
            SELECT
                mi.propertyID,
                ST_X(a.geoLocation) AS latitude,
                ST_Y(a.geoLocation) AS longitude,
                mi.price,
                mi.bathrooms,
                mi.bedrooms,
                a.streetAddress,
                a.zipcode,
                mi.overview,
                GROUP_CONCAT(img.propertyURL) AS Images,
                ts.Tags
            FROM
                MainInformation mi
                    INNER JOIN
                Addresses a ON mi.addressID = a.addressID
                    LEFT JOIN
                images img ON mi.propertyID = img.propertyID
                    LEFT JOIN
                Tagstable ts ON mi.propertyID = ts.propertyID
            WHERE
                    %s
            GROUP BY
                mi.propertyID;
                """, whereClause);
        return jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(QuickViewProperty.class), parameters.toArray());
    }

    public List<QuickViewProperty> batchQVProperties(List<Long> ids) {
        String inSql = String.join(",", Collections.nCopies(ids.size(), "?"));
        String sql = """
            SELECT
                mi.propertyID,
                ST_X(a.geoLocation) AS latitude,
                ST_Y(a.geoLocation) AS longitude,
                mi.price,
                mi.bathrooms,
                mi.bedrooms,
                a.streetAddress,
                a.zipcode,
                mi.overview,
                GROUP_CONCAT(img.propertyURL) AS Images,
                ts.Tags
            FROM
                MainInformation mi
            INNER JOIN
                Addresses a ON mi.addressID = a.addressID
            LEFT JOIN
                images img ON mi.propertyID = img.propertyID
            LEFT JOIN
                Tagstable ts ON mi.propertyID = ts.propertyID
            WHERE
                mi.availableNow = 1 AND mi.propertyID IN (%s)
            GROUP BY
                mi.propertyID;
            """.formatted(inSql);
        return jdbcTemplate.query(
                sql,
                BeanPropertyRowMapper.newInstance(QuickViewProperty.class),
                ids.toArray());
    }

    // get QVProperty by id
    public QuickViewProperty getQVProperty(Long id) {
        String sql = """
            SELECT
                mi.propertyID,
                ST_X(a.geoLocation) AS latitude,
                ST_Y(a.geoLocation) AS longitude,
                mi.price,
                mi.bathrooms,
                mi.bedrooms,
                a.streetAddress,
                a.zipcode,
                mi.overview,
                GROUP_CONCAT(img.propertyURL) AS Images,
                ts.Tags
            FROM
                MainInformation mi
                    INNER JOIN
                Addresses a ON mi.addressID = a.addressID
                    LEFT JOIN
                images img ON mi.propertyID = img.propertyID
                    LEFT JOIN
                Tagstable ts ON mi.propertyID = ts.propertyID
            WHERE
                    mi.availableNow = 1 AND mi.propertyID = ?
            GROUP BY
                mi.propertyID;
                """;
        return jdbcTemplate.queryForObject(
                sql,
                BeanPropertyRowMapper.newInstance(QuickViewProperty.class),
                id);
    }

    // get property details by id
    public DetailedProperty getPropertyDetails(Integer id) {
        String sql = """
              SELECT
                  mi.propertyID,
                  mi.price,
                  mi.bedrooms,
                  mi.bathrooms,
                  mi.homeType AS propertyType,
                  a.streetAddress,
                  a.zipcode,
                  ST_X(a.geoLocation) AS latitude,
                  ST_Y(a.geoLocation) AS longitude,
                  mi.overview AS description,
                  pd.Pets AS petsAllowed,
                  mi.datePosted AS dateposted,
                  GROUP_CONCAT(img.propertyURL) AS images,
                  czs.mapped_values_sigmoid AS overallCrimeScore,
                  ss.overall_score AS servicesOverallScore,
                  ss.sum_count AS servicesCount,
                  ss.finance_score,
                  ss.transportation_score,
                  ss.personal_care_score,
                  ss.retail_score,
                  ss.fitness_score,
                  ss.leisure_score,
                  ss.emergency_score,
                  ss.bankCount,
                  ss.barCount,
                  ss.beauty_salonCount,
                  ss.bus_stationCount,
                  ss.cafeCount,
                  ss.fire_stationCount,
                  ss.gymCount,
                  ss.hospitalCount,
                  ss.night_clubCount,
                  ss.parkCount,
                  ss.pharmacyCount,
                  ss.police_stationCount,
                  ss.restaurantCount,
                  ss.supermarketCount,
                  ss.train_stationCount,
                  ss.transit_stationCount,
                  ts.Tags
              FROM
                  MainInformation mi
                      INNER JOIN
                  Addresses a ON mi.addressID = a.addressID
                      INNER JOIN
                  PropertyDetails pd ON mi.propertyDetailsID = pd.propertyDetailsID
                      LEFT JOIN
                  images img ON mi.propertyID = img.propertyID
                      LEFT JOIN
                  crime_z_scores czs ON a.neighbourhoodID = czs.neighbourhoodID
                      LEFT JOIN
                  service_scores ss ON a.neighbourhoodID = ss.neighbourhoodID
                      LEFT JOIN
                  Tagstable ts ON mi.propertyID = ts.propertyID
              WHERE
                      mi.propertyID = ?
              GROUP BY
                  mi.propertyID;
                """;
        return jdbcTemplate.queryForObject(
                sql, BeanPropertyRowMapper.newInstance(DetailedProperty.class), id
        );
    }

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

    public void registerClick(String userId, Integer propertyId) {
        String sql = """
            UPDATE user_interactions
            SET click_count = click_count + 1
            WHERE propertyID = ? AND id = ?;
            """;
        int rows = jdbcTemplate.update(sql, propertyId, userId);
        if (rows == 0) {
            throw new NoSuchElementException();
        }
    }

    public void registerEval(Integer propertyId, String userId, Integer eval) {
        String sql = """
                INSERT INTO user_feedbacks (propertyID, id, feedback)
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE feedback = ?;
                """;
        int rows = jdbcTemplate.update(sql, propertyId, userId, eval, eval);
        if (rows == 0) {
            throw new NoSuchElementException();
        }
    }
}
