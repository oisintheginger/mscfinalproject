package msc.HME.properties;

import net.datafaker.Faker;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

@Component
public class JsonPlaceholderService {
    Faker faker = new Faker(new Locale("ie"));

    public List<QuickViewProperty> loadProperties() {
        List<QuickViewProperty> properties = new ArrayList<>();

        for (int i = 0; i < 50; i++) {
            int id = i+1;
            String longitude = faker.address().longitude();
            String latitude = faker.address().latitude();
            double price = faker.random().nextInt(500, 5000);
            List<String> tags = new ArrayList<>();
            tags.add("example1");
            tags.add("example2");
            tags.add("example3");
            String address = faker.address().fullAddress();
            // String image = ;
            String description = faker.lorem().paragraph();
            QuickViewProperty property = new QuickViewProperty(id, longitude, latitude, price, tags, address, description);
            properties.add(property);
        }

        return properties;
    }

    public DetailedProperty loadDetailedProperty(int id) {
        double price = faker.random().nextInt(500, 5000);
        String longitude = faker.address().longitude();
        String latitude = faker.address().latitude();
        int bed = faker.random().nextInt(1, 10);
        int bath = faker.random().nextInt(1, 10);
        String[] random = {"apartment", "townhouse", "house", "studio"};
        String type = random[faker.random().nextInt(0,4)];
        String address = faker.address().streetAddress();
        String zipcode = faker.address().zipCode();
        // String image = ;
        String description = faker.lorem().paragraph(15);
        Date randomPastDate = faker.date().past(365, TimeUnit.DAYS);
        LocalDate posted = randomPastDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date randomDate = faker.date().past(60, TimeUnit.DAYS);
        LocalDate updated = randomDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        float score = faker.random().nextInt(0,10);
        return new DetailedProperty(id, price, bed, bath, type, address, zipcode, longitude, latitude, description, true, posted, updated, score);
    }

}
