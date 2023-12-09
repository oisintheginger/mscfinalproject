package msc.HME;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
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
                logger.log("Service Unavailable: Database is currently unavailable");
            }
            PreparedStatement insertStatement = conn.prepareStatement("INSERT INTO user (id, email, searches, favourites, weights, applications) VALUES ( ?, ?, ?, ?, ?, ?);");
            List<String> data = getCognitoData(requestObject);
            insertStatement.setString(1, data.get(0));
            insertStatement.setString(2, data.get(1));
            insertStatement.setString(3, "[{\"search\":\"1\"}]");
            insertStatement.setString(4, "[{\"favourite\": \"1\"}]");
            insertStatement.setString(5, "[{\"leisure\": \"1\"}, {\"personal_care\": \"1\"}, {\"retail\": \"1\"}, {\"fitness\": \"1\"}, {\"finance\": \"1\"}, {\"transportation\": \"1\"}, {\"emergency\": \"1\"}]");
            insertStatement.setString(6, "[{\"propertyId\": \"1\", \"message\": \"1\"}]");
            int result = insertStatement.executeUpdate();

            if (result == 0) {
                logger.log("Service Unavailable: Could not add user to database");
            }

            PreparedStatement clickStatement = conn.prepareStatement("""
                INSERT INTO user_interactions (propertyID, id, click_count)
                SELECT
                    mi.propertyID,
                    ?,
                    0 AS click_count
                FROM
                    MainInformation mi;
            """);
            clickStatement.setString(1, data.get(0));
            int res = clickStatement.executeUpdate();
            if (res == 0) {
                logger.log("Service Unavailable: Could not add user click entries to database");
            }
            logger.log("User added to database");
        } catch (SQLException e) {
            logger.log(String.valueOf(e));
        } catch (Exception e) {
            logger.log("Internal Server Error");
        }
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