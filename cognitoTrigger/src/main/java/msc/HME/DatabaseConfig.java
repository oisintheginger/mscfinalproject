//package msc.HME;
//
//import org.springframework.boot.jdbc.DataSourceBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.jdbc.core.JdbcTemplate;
//
//import javax.sql.DataSource;
//
//@Configuration
//public class DatabaseConfig {
//    @Bean
//    public DataSource dataSource() {
//        DataSourceBuilder<?> dataSourceBuilder = DataSourceBuilder.create();
//        dataSourceBuilder.url("jdbc:mysql://myhmedb.cdc3elu6ufgt.eu-west-1.rds.amazonaws.com/hmedbmain");
//        dataSourceBuilder.username("admin");
//        dataSourceBuilder.password("PassCondria123");
//        return dataSourceBuilder.build();
//    }
//
//    @Bean
//    public JdbcTemplate jdbcTemplate() {
//        return new JdbcTemplate(dataSource());
//    }
//}
