package msc.HME.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import msc.HME.binding.DetailedProperty;
import msc.HME.binding.GeoLocation;
import msc.HME.binding.PersonalScoresResponse;
import msc.HME.binding.QuickViewProperty;
import msc.HME.mapper.UserRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Service;
import org.springframework.jdbc.core.JdbcTemplate;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.lambda.LambdaClient;
import software.amazon.awssdk.services.lambda.model.InvokeRequest;
import software.amazon.awssdk.services.lambda.model.InvokeResponse;

import java.util.Collections;
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
                WHERE mi.availableNow = 1
                GROUP BY mi.propertyID;
                """;
        return jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(QuickViewProperty.class));
    }

    public List<QuickViewProperty> batchQVProperties(List<Long> ids) {
        String inSql = String.join(",", Collections.nCopies(ids.size(), "?"));
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
            WHERE mi.availableNow = 1 AND mi.propertyID IN (%s)
            GROUP BY mi.propertyID;
            """.formatted(inSql);
        return jdbcTemplate.query(
                sql,
                BeanPropertyRowMapper.newInstance(QuickViewProperty.class),
                ids.toArray());
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
                WHERE mi.availableNow = 1 AND mi.propertyID IN (?, ?, ?)
                GROUP BY mi.propertyID;
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
                    ss.transit_stationCount
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

    // access scores lambda function to retrieve personal services score per neighbourhood
    public void getPersonalScores(String userId, String propertyId) {

        try (LambdaClient lambdaClient = LambdaClient.builder()
                .region(Region.of("eu-west-1"))
                .build()) {

            String functionName = "UpdateUserScores";
            String payload = "{\"id\": \"" + userId + "\", \"propertyID\": \" " + propertyId + "\"}";

            InvokeRequest request = InvokeRequest.builder()
                    .functionName(functionName)
                    .payload(SdkBytes.fromUtf8String(payload))
                    .build();

            InvokeResponse response = lambdaClient.invoke(request);

            String responseString = response.payload().asUtf8String();
            System.out.println(responseString);

//            ObjectMapper objectMapper = new ObjectMapper();
//            PersonalScoresResponse result = objectMapper.readValue(responseString, PersonalScoresResponse.class);

        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
