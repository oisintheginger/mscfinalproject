package msc.rme;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

import msc.rme.controller.PingController;


@SpringBootApplication
// We use direct @Import instead of @ComponentScan to speed up cold starts
// @ComponentScan(basePackages = "msc.rme.controller")
@Import({ PingController.class })
public class Application {
    public static void main(String[] args)
    {
        SpringApplication.run(Application.class, args);
    }
}