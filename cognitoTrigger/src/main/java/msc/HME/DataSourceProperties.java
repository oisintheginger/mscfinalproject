package msc.HME;

public class DataSourceProperties {

    private final String host;
    private final int port;

    private final String db;

    private final String username;

    private final String password;

    public DataSourceProperties() {
        this.host = System.getenv("RDS_HOSTNAME");
        this.port = 3306;
        this.db = System.getenv("RDS_DB");
        this.username = System.getenv("RDS_USERNAME");
        this.password = System.getenv("RDS_PW");
    }

    public DataSourceProperties(String host, int port, String db, String username, String password) {
        this.host = host;
        this.port = port;
        this.db = db;
        this.username = username;
        this.password = password;
    }

    public String getHost() {
        return host;
    }

    public int getPort() {
        return port;
    }

    public String getDb() {
        return db;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
