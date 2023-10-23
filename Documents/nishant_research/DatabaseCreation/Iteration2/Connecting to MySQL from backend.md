## Connecting to MySQL from backend.

1. Add to your springboot dependencies
```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
</dependency>
```


2. Configue properties

```xlm
spring.datasource.url=jdbc:mysql://YOUR_RDS_ENDPOINT:3306/hmedbmain?useSSL=false&serverTimezone=UTC
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL5Dialect

```
endpoint
myhmedb.cdc3elu6ufgt.eu-west-1.rds.amazonaws.com