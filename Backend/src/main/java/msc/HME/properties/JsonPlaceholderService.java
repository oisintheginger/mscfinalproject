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
            String[] random = {"https://photos.zillowstatic.com/fp/e3819b051b082ceecf67c8c86e47360f-p_e.jpg",
                    "https://photos.zillowstatic.com/fp/a7568313a2fe28ec2a0df7d516227dac-p_e.jpg",
                    "https://photos.zillowstatic.com/fp/fc2da78a5219a7153981fdb1dd429e8e-p_e.jpg",
                    "https://photos.zillowstatic.com/fp/01bb80ae9214483048c82a3b968377bb-p_e.jpg",
                    "https://photos.zillowstatic.com/fp/a48bfc49573a605a3acb80effb402127-p_e.jpg",
                    "https://photos.zillowstatic.com/fp/cf24caf418ad193c1e1006ccd9f9cf31-p_e.jpg",
                    "https://photos.zillowstatic.com/fp/4fe48247d917a72c5fb2962345db2dc2-p_e.jpg",
                    "https://photos.zillowstatic.com/fp/a5edf4d937f8e37d4a5e6ac736367f5f-p_e.jpg",
                    "https://photos.zillowstatic.com/fp/4992183033f22c8a28c0d6a256b27cfd-p_e.jpg",
                    "https://photos.zillowstatic.com/fp/f1a36cd4265001f7c86fe1ba38585183-p_e.jpg"};
            String image = random[faker.random().nextInt(0,9)];
            String description = faker.lorem().paragraph();
            QuickViewProperty property = new QuickViewProperty(id, longitude, latitude, price, tags, address, description, image);
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
        String[] images = {"https://photos.zillowstatic.com/fp/e3819b051b082ceecf67c8c86e47360f-p_e.jpg",
        "https://photos.zillowstatic.com/fp/a7568313a2fe28ec2a0df7d516227dac-p_e.jpg",
                "https://photos.zillowstatic.com/fp/fc2da78a5219a7153981fdb1dd429e8e-p_e.jpg",
                "https://photos.zillowstatic.com/fp/01bb80ae9214483048c82a3b968377bb-p_e.jpg",
                "https://photos.zillowstatic.com/fp/a48bfc49573a605a3acb80effb402127-p_e.jpg",
                "https://photos.zillowstatic.com/fp/cf24caf418ad193c1e1006ccd9f9cf31-p_e.jpg",
                "https://photos.zillowstatic.com/fp/4fe48247d917a72c5fb2962345db2dc2-p_e.jpg",
                "https://photos.zillowstatic.com/fp/a5edf4d937f8e37d4a5e6ac736367f5f-p_e.jpg",
                "https://photos.zillowstatic.com/fp/4992183033f22c8a28c0d6a256b27cfd-p_e.jpg",
                "https://photos.zillowstatic.com/fp/f1a36cd4265001f7c86fe1ba38585183-p_e.jpg"};
        String description = faker.lorem().paragraph(15);
        Date randomPastDate = faker.date().past(365, TimeUnit.DAYS);
        LocalDate posted = randomPastDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date randomDate = faker.date().past(60, TimeUnit.DAYS);
        LocalDate updated = randomDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        float score = faker.random().nextInt(0,10);
        return new DetailedProperty(id, price, bed, bath, type, address, zipcode, longitude, latitude, description, true, posted, updated, score, images);
    }

}
