package msc.HME.controller;

import msc.HME.School;
import msc.HME.properties.QuickViewPropertyV2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class TestController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public TestController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping("/test")
    public List<School> test() {
        String sql = "SELECT * FROM Schools;";
        return jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(School.class));
    }

//    @GetMapping("/testProp")
//    public List<QuickViewPropertyV2> testAll() {
//        String sql = "";
//
//        return jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(QuickViewPropertyV2.class));
//    }
}

