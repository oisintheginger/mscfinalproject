package msc.HME.properties;

import net.datafaker.Faker;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Component
public class JsonPlaceholderService {
    public List<QuickViewProperty> loadProperties() {
        List<QuickViewProperty> properties = new ArrayList<>();
        Faker faker = new Faker(new Locale("ie"));

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
//            String image = ;
            String description = faker.lorem().paragraph();
            QuickViewProperty property = new QuickViewProperty(id, longitude, latitude, price, tags, address, description);
            properties.add(property);
        }

        return properties;
    }

}
