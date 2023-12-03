package msc.HME;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {

    @Bean
    public DataSource dataSource() {
        HikariConfig hikariConfig = new HikariConfig();
        hikariConfig.setJdbcUrl("jdbc:mysql://myhmedb.cdc3elu6ufgt.eu-west-1.rds.amazonaws.com/hmedbmain");
        hikariConfig.setUsername(System.getenv("RDS_USER"));
        hikariConfig.setPassword(System.getenv("RDS_PW"));
        hikariConfig.setMaximumPoolSize(1);
        hikariConfig.setMinimumIdle(0);
        hikariConfig.setMaxLifetime(300000); // 5 minutes
        hikariConfig.setIdleTimeout(60000); // 1 minute
        hikariConfig.setLeakDetectionThreshold(300000); // Optional: helps detect connection leaks
        return new HikariDataSource(hikariConfig);
    }

    @Bean
    public JdbcTemplate jdbcTemplate() {
        return new JdbcTemplate(dataSource());
    }
}
