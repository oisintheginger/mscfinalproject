**The mistakes, errors and issues involved in connecting Spring Boot and MySQL on RDS** 

The recommendations are at the end, and feel free to skip my experience of this  journey. 
1.	Precious time was wasted at the start of the process by implementing an actuator health check endpoint to monitor the health of the database connection. Hower, the database data wasn’t returned by the endpoint. This made me realise there is probably something not right here (see figure below).
2.	Before this process, I would deploy a new version of the backend to my personal AWS account first to check it worked correctly before deploying to the project’s AWS account. This made my life more difficult with the database because there are (rightfully) protections and permissions in place. 
3.	After we quickly realised that if the database is running locally, the local IP address needs to be whitelisted. With amazon, it had to be added to the security group associated with the rds instance through the amazon console. 
4.	A few days into the process, a teammate recommended to try and connect to the database through another tool. I couldn’t connect through MySQL workbench either at first. Even though I had visually checked the username and password before, this time I copy & pasted the password from the source. Turns out I put in the incorrect password the entire time, so now I could connect through MySQL workbench. 
5.	However, I still could not connect through the spring boot application. I tried to connect through the IntelliJ data source UI tool, where I could connect as well. This determined that the issue had something to do with spring boot (configurations). 
6.	I spend (too) many hours trying different solutions from stack overflow and other articles. During this time I would get different errors:
   - Communication Link Failure: sql com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications link failure. The lastpacket sent successfully to the server was 0 milliseconds ago. The driver has not received any packets from the server.
     - Common causes for this error include incorrect database URL, the database server being down, network issues, firewall settings, or the database not accepting connections from the application's IP.
   - java.sql.SQLException: Access denied for user 'admin'@'46.7.63.23' (using password: YES)

        common causes:
     - incorrect username and password
     - user does not have permissions to connect from the host where the (spring boot) application is running 
     - missing database name
     - database server is not running or unreachable
     - the database instance requires SSL 
     - Use account is locked 
     - Using the incorrect JDBC driver 
     - Server and connector version compatibility 
     - Typo’s in the application.properties or application.yml file 
     - Incorrect or insufficient configuration
7.	In the end, the solution was to create a DataSource Bean in a JpaConfig class. A DataSource is a factory for database connections. The solution followed this article https://howtodoinjava.com/spring-boot2/datasource-configuration/. The datasource bean creates 10 connections in a connection pool by default. This can be altered through the application.properties or application.yml file (examples present in the article). The articles shows how to configure multiple data sources as well.
      
    @Configuration
    public class JpaConfig {

        @Bean
        public DataSource dataSource() {
            DataSourceBuilder<?> dataSourceBuilder = DataSourceBuilder.create();
            dataSourceBuilder.url("jdbc:mysql://[database endpoint]");
            dataSourceBuilder.username("dbuser");
            dataSourceBuilder.password("dbpassword");
            return dataSourceBuilder.build();
        }
    }
Looking back there were multiple mistakes that were made from the start:
-	Incorrect credentials 
-	Blocked IP addresses
-	Firewall settings
-	Incorrect and insufficient configurations 

Recommendations 
-	Always check whether the database is available
-	Always **always** check the logs 
-	Double and triple check the credentials 
-	Whitelist the IP address to be able to connect to the database 
-	Ensure you are using the correct (JDBC) driver to connect to the database
-	Start small if you can’t connect through the application, try to connect through other tools (such as MySQL workbench) 
  -	Make sure you got all the right dependencies installed, for this connection the following were needed:

            <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
            </dependency>

            <dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
            </dependency>

-	Check whether more configurations are needed than the standard you encounter. In this case, , the solution was to create a DataSource Bean in a JpaConfig class. As per this article, https://howtodoinjava.com/spring-boot2/datasource-configuration/
-	Unfortunately, you have to try many different things until something works 

