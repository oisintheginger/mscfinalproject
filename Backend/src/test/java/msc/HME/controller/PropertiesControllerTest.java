package msc.HME.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import msc.HME.properties.DetailedProperty;
import msc.HME.properties.JsonPlaceholderService;
import msc.HME.properties.QuickViewProperty;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@WebMvcTest(PropertiesController.class)
class PropertiesControllerTest {

    private MockMvc mockMvc;

    @MockBean
    private JsonPlaceholderService jsonPlaceholderService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp(WebApplicationContext webApplicationContext) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }
//    @Test
//    void findAll() throws Exception {
//        List<QuickViewProperty> propertiesList = Collections.singletonList(new QuickViewProperty());
//        given(jsonPlaceholderService.loadProperties()).willReturn(propertiesList);
//
//        mockMvc.perform(get("/api/properties"))
//                .andExpect(status().isOk());
////              to be implemented when connected to db
////                .andExpect(content().json(objectMapper.writeValueAsString(propertiesList)));
//    }

    @Test
    void findAll_pagination() throws Exception {
        // Mock a larger list of properties
        List<QuickViewProperty> allProperties = new ArrayList<>();
        for (int i = 0; i < 50; i++) {
            allProperties.add(new QuickViewProperty());
        }
        given(jsonPlaceholderService.loadProperties()).willReturn(allProperties);

        // Set pagination parameters
        int page = 2;
        int size = 10;
        List<QuickViewProperty> expectedProperties = allProperties.subList((page - 1) * size, (page - 1) * size + size);

        mockMvc.perform(get("/api/properties")
                        .param("page", String.valueOf(page))
                        .param("size", String.valueOf(size)))
                .andExpect(status().isOk());
//                to be implemented with db
//                .andExpect(content().json(objectMapper.writeValueAsString(expectedProperties)));
    }


    @Test
    public void findPropertyById_200() throws Exception {
        DetailedProperty property = new DetailedProperty();
        given(jsonPlaceholderService.loadDetailedProperty(1)).willReturn(property);

        mockMvc.perform(get("/api/properties/1"))
                .andExpect(status().isOk())
                .andExpect(content().json(objectMapper.writeValueAsString(property)));
    }

    @Test
    public void findPropertyById_400() throws Exception {
        mockMvc.perform(get("/api/properties/-1"))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void findPropertyById_404() throws Exception {
        //will be implemented later when connected to db
    }
}