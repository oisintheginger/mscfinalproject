package msc.rme.controller;

import jakarta.servlet.http.HttpServletRequest;
import msc.rme.binding.*;
import msc.rme.service.PropertyService;
import msc.rme.service.UserService;
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
        propertyService = mock(PropertyService.class);
        userService = mock(UserService.class);
        propertiesController = new PropertiesController(propertyService, userService);
    }

    @Test
    void findAll_200() {
        List<QuickViewProperty> mockProperties = new ArrayList<>();
        mockProperties.add(new QuickViewProperty());
        when(propertyService.getAllQVProperties(null, null, null, null)).thenReturn(mockProperties);

        ResponseEntity<Object> response = propertiesController.findAll(1, 50, null, null, null, null);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        verify(propertyService).getAllQVProperties(null, null, null, null);
    }

    @Test
    void batchQVP_200() {
        List<Long> ids = Arrays.asList(1L, 2L, 3L);
        List<QuickViewProperty> mockProperties = new ArrayList<>();
        mockProperties.add(new QuickViewProperty());
        when(propertyService.batchQVProperties(ids)).thenReturn(mockProperties);

        ResponseEntity<Object> response = propertiesController.batchQVP(ids);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        verify(propertyService).batchQVProperties(ids);
    }

    @Test
    void findQVProperty_200() {
        // Setup
        Long id = 1L;
        QuickViewProperty mockProperty = new QuickViewProperty();
        when(propertyService.getQVProperty(id)).thenReturn(mockProperty);

        ResponseEntity<Object> response = propertiesController.findQVProperty(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        verify(propertyService).getQVProperty(id);
    }

    @Test
    void findPropertyById_200() {
        // Setup
        Integer id = 1;
        DetailedProperty mockProperty = new DetailedProperty();
        HttpServletRequest mockRequest = mock(HttpServletRequest.class);
        when(propertyService.getPropertyDetails(id)).thenReturn(mockProperty);
        when(userService.validateJWT(mockRequest)).thenReturn("userId");

        ResponseEntity<Object> response = propertiesController.findPropertyById(id, mockRequest);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        verify(propertyService).getPropertyDetails(id);
        verify(userService).validateJWT(mockRequest);
    }

    @Test
    void getAllLocations_200() {
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