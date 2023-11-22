//package msc.HME.controller;
//
//import msc.HME.binding.QuickViewProperty;
//import msc.HME.service.PropertyService;
//import msc.HME.service.UserService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//import static org.mockito.Mockito.*;
//
//@WebMvcTest(PropertiesController.class)
//class PropertiesControllerTest {
//
//    @Mock
//    private PropertyService propertyService;
//
//    @Mock
//    private UserService userService;
//
//    @InjectMocks
//    private PropertiesController propertiesController;
//
//    @BeforeEach
//    void setUp() {
//        // Initialize mocks and inject them into the tested class
//        propertyService = mock(PropertyService.class);
//        userService = mock(UserService.class);
//        propertiesController = new PropertiesController(propertyService, userService);
//    }
//
//    @Test
//    public void findAll_200() {
//        // Setup
//        List<QuickViewProperty> mockProperties = new ArrayList<>();
//        mockProperties.add(new QuickViewProperty()); // Add mock QuickViewProperty objects
//        when(propertyService.getAllQVProperties()).thenReturn(mockProperties);
//
//        // Execute
//        ResponseEntity<Object> response = propertiesController.findAll(1, 50);
//
//        // Assert
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertNotNull(response.getBody());
//        // Further assertions to validate the response body can be added here
//
//        // Verify
//        verify(propertyService).getAllQVProperties();
//    }
//
//}