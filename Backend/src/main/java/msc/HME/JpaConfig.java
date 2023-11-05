package msc.HME;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class JpaConfig {

    @Bean
    public DataSource dataSource() {
        DataSourceBuilder<?> dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.url("jdbc:mysql://myhmedb.cdc3elu6ufgt.eu-west-1.rds.amazonaws.com");
        dataSourceBuilder.username("admin");
        dataSourceBuilder.password("PassCondria123");
        return dataSourceBuilder.build();
    }
}
