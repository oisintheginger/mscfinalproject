package msc.HME;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class MVCConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

}