package msc.HME;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class LambdaHandler implements RequestHandler<Object, Object> {

    private final DataSourceProperties db;

    public LambdaHandler() {
        this.db = new DataSourceProperties();
    }
    public LambdaHandler(DataSourceProperties db) {
        this.db = db;
    }

    @Override
    public Object handleRequest(Object requestObject, Context context) {
        LambdaLogger logger = context.getLogger();
        String jdbcUrl = "jdbc:mysql://" + db.getHost() + ":" + db.getPort() + "/" + db.getDb();

        try (Connection conn = DriverManager.getConnection(jdbcUrl, db.getUsername(), db.getPassword())) {
            if (!conn.isValid(0)) {
                logger.log(String.valueOf(ResponseEntity
                        .status(HttpStatus.SERVICE_UNAVAILABLE)
                        .body("Database is currently unavailable")));
            }
            PreparedStatement insertStatement = conn.prepareStatement("INSERT INTO user (id, email, searches, favourites, weights, applications) VALUES ( ?, ?, ?, ?, ?, ?);");
            List<String> data = getCognitoData(requestObject);
            insertStatement.setString(1, data.get(0));
            insertStatement.setString(2, data.get(1));
            insertStatement.setString(3, "[{\"search\":\"1\"}]");
            insertStatement.setString(4, "[{\"favourite\": \"1\"}]");
            insertStatement.setString(5, "[{\"entertainment\": \"null\"}, {\"pharmacies\": \"null\"}, {\"retail\": \"null\"}, {\"fitness\": \"null\"}, {\"financial\": \"null\"}, {\"transportation\": \"null\"}, {\"emergency\": \"null\"}]");
            insertStatement.setString(6, "[{\"propertyId\": \"1\", \"message\": \"1\"}]");
            int result = insertStatement.executeUpdate();

            if (result < 0) {
                logger.log(String.valueOf(ResponseEntity
                        .status(HttpStatus.SERVICE_UNAVAILABLE)
                        .body("Database is currently unavailable")));
            }
        } catch (SQLException e) {
            logger.log(String.valueOf(e));
        } catch (Exception e) {
            logger.log(String.valueOf(ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal Server Error ")));
        }
        logger.log(String.valueOf(ResponseEntity
                .status(HttpStatus.CREATED)
                .body("User Added to Database")));
        return requestObject;
    }

    private List<String> getCognitoData(Object requestObject) {
        Map requestObjectMap = (Map) requestObject;
        Map requestInfoMap = (Map) requestObjectMap.get("request");
        Map userAttributesMap = (Map) requestInfoMap.get("userAttributes");
        String userId = requestObjectMap.get("userName").toString();
        String email = userAttributesMap.get("email").toString();
        List<String> list = new ArrayList<>();
        list.add(userId);
        list.add(email);
        return list;
    }
}