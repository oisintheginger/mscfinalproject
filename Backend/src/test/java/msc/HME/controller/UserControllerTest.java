package msc.HME.controller;

import jakarta.servlet.http.HttpServletRequest;
import msc.HME.service.UserService;
import msc.HME.binding.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @MockBean
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @Mock
    private HttpServletRequest request;

    @BeforeEach
    void setup() {
        //Initialize mocks and inject them into the tested class
        userService = mock(UserService.class);
        userController = new UserController(userService);
    }

    @Test
    public void findUser_200() {
        // Arrange
        String userId = "validUserId";
        User mockUser = new User(); // Assuming User class has a default constructor
        when(request.getHeader(anyString())).thenReturn("validToken");
        when(userService.validateJWT(request)).thenReturn(userId);
        when(userService.getUser(userId)).thenReturn(mockUser);

        // Act
        ResponseEntity<Object> response = userController.findUser(request);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockUser, response.getBody());

        // Verify
        verify(userService).validateJWT(request);
        verify(userService).getUser(userId);
    }

    @Test
    public void findResource_search_200() {
        // Arrange
        String userId = "validUserId";
        String resource = "s"; // Example resource
        List<Search> mockResource = new ArrayList<>();
        mockResource.add(new Search());
        when(request.getHeader(anyString())).thenReturn("validToken");
        when(userService.validateJWT(request)).thenReturn(userId);
        when(userService.findSearches(userId)).thenReturn(mockResource);

        // Act
        ResponseEntity<Object> response = userController.findResource(resource, request);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockResource, response.getBody());

        // Verify
        verify(userService).validateJWT(request);
        verify(userService).findSearches(userId);
    }

    @Test
    public void findResource_fave_200() {
        // Arrange
        String userId = "validUserId";
        String resource = "f"; // Favourites resource
        List<Favourite> mockResource = new ArrayList<>();
        mockResource.add(new Favourite());
        when(request.getHeader(anyString())).thenReturn("validToken");
        when(userService.validateJWT(request)).thenReturn(userId);
        when(userService.findFaves(userId)).thenReturn(mockResource); // Corrected to use findFaves

        // Act
        ResponseEntity<Object> response = userController.findResource(resource, request);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockResource, response.getBody());

        // Verify
        verify(userService).validateJWT(request);
        verify(userService).findFaves(userId); // Corrected to use findFaves
    }

}
