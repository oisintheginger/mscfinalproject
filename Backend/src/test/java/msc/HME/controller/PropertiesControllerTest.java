package msc.HME.controller;

import jakarta.servlet.http.HttpServletRequest;
import msc.HME.binding.*;
import msc.HME.service.PropertyService;
import msc.HME.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@WebMvcTest(PropertiesController.class)
class PropertiesControllerTest {

    @MockBean
    private PropertyService propertyService;

    @MockBean
    private UserService userService;

    @InjectMocks
    private PropertiesController propertiesController;

    @BeforeEach
    void setUp() {
        // Initialize mocks and inject them into the tested class
        propertyService = mock(PropertyService.class);
        userService = mock(UserService.class);
        propertiesController = new PropertiesController(propertyService, userService);
    }

    @Test
    public void findAll_200() {
        // Setup
        List<QuickViewProperty> mockProperties = new ArrayList<>();
        mockProperties.add(new QuickViewProperty()); // Add mock QuickViewProperty objects
        when(propertyService.getAllQVProperties()).thenReturn(mockProperties);

        // Execute
        ResponseEntity<Object> response = propertiesController.findAll(1, 50);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        // Further assertions to validate the response body can be added here

        // Verify
        verify(propertyService).getAllQVProperties();
    }

    @Test
    public void batchQVP_200() {
        // Setup
        List<Long> ids = Arrays.asList(1L, 2L, 3L);
        List<QuickViewProperty> mockProperties = new ArrayList<>();
        mockProperties.add(new QuickViewProperty()); // Add mock QuickViewProperty objects
        when(propertyService.batchQVProperties(ids)).thenReturn(mockProperties);

        // Execute
        ResponseEntity<Object> response = propertiesController.batchQVP(ids);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        // Verify
        verify(propertyService).batchQVProperties(ids);
    }

    @Test
    public void findQVProperty_200() {
        // Setup
        Long id = 1L;
        QuickViewProperty mockProperty = new QuickViewProperty();
        when(propertyService.getQVProperty(id)).thenReturn(mockProperty);

        // Execute
        ResponseEntity<Object> response = propertiesController.findQVProperty(id);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        // Verify
        verify(propertyService).getQVProperty(id);
    }

    @Test
    public void findPropertyById_200() {
        // Setup
        Integer id = 1;
        DetailedProperty mockProperty = new DetailedProperty();
        HttpServletRequest mockRequest = mock(HttpServletRequest.class);
        when(propertyService.getPropertyDetails(id)).thenReturn(mockProperty);
        when(userService.validateJWT(mockRequest)).thenReturn("userId");

        // Execute
        ResponseEntity<Object> response = propertiesController.findPropertyById(id, mockRequest);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        // Verify
        verify(propertyService).getPropertyDetails(id);
        verify(userService).validateJWT(mockRequest);
    }

    @Test
    public void getAllLocations_200() {
        // Setup
        List<GeoLocation> locations = Arrays.asList(new GeoLocation(), new GeoLocation());
        when(propertyService.getGeoLocation()).thenReturn(locations);

        // Execute
        ResponseEntity<Object> response = propertiesController.getAll();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        // Verify
        verify(propertyService).getGeoLocation();
    }

}