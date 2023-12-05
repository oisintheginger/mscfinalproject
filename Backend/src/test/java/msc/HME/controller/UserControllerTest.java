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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
public class UserControllerTest {

    @MockBean
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @Mock
    private HttpServletRequest request;

    private MockMvc mockMvc;

    @BeforeEach
    void setup() {
        //Initialize mocks and inject them into the tested class
        userService = mock(UserService.class);
        userController = new UserController(userService);
//        request = mock(HttpServletRequest.class);
//        when(request.getHeader("Authorization")).thenReturn("validJWT");
    }

    @Test
    public void findUser_200() {
        String userId = "validUserId";
        User mockUser = new User();
        when(request.getHeader(anyString())).thenReturn("validToken");
        when(userService.validateJWT(request)).thenReturn(userId);
        when(userService.getUser(userId)).thenReturn(mockUser);

        ResponseEntity<Object> response = userController.findUser(request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockUser, response.getBody());

        verify(userService).validateJWT(request);
        verify(userService).getUser(userId);
    }

    @Test
    public void findResource_search_200() {
        String userId = "validUserId";
        String resource = "s";
        List<Search> mockResource = new ArrayList<>();
        mockResource.add(new Search());
        when(request.getHeader(anyString())).thenReturn("validToken");
        when(userService.validateJWT(request)).thenReturn(userId);
        when(userService.findSearches(userId)).thenReturn(mockResource);

        ResponseEntity<Object> response = userController.findResource(resource, request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockResource, response.getBody());

        verify(userService).validateJWT(request);
        verify(userService).findSearches(userId);
    }

    @Test
    public void findResource_fave_200() {
        String userId = "validUserId";
        String resource = "f";
        List<Favourite> mockResource = new ArrayList<>();
        mockResource.add(new Favourite());
        when(request.getHeader(anyString())).thenReturn("validToken");
        when(userService.validateJWT(request)).thenReturn(userId);
        when(userService.findFaves(userId)).thenReturn(mockResource);

        ResponseEntity<Object> response = userController.findResource(resource, request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockResource, response.getBody());

        verify(userService).validateJWT(request);
        verify(userService).findFaves(userId);
    }

    @Test
    public void findResource_application_200() {
        String userId = "validUserId";
        String resource = "a";
        List<Enquiry> mockResource = new ArrayList<>();
        mockResource.add(new Enquiry());
        when(request.getHeader(anyString())).thenReturn("validToken");
        when(userService.validateJWT(request)).thenReturn(userId);
        when(userService.findApplication(userId)).thenReturn(mockResource);

        ResponseEntity<Object> response = userController.findResource(resource, request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockResource, response.getBody());

        verify(userService).validateJWT(request);
        verify(userService).findApplication(userId);
    }

    @Test
    public void findResource_weights_200() {
        String userId = "validUserId";
        String resource = "w";
        UserWeights mockResource = new UserWeights();
        when(request.getHeader(anyString())).thenReturn("validToken");
        when(userService.validateJWT(request)).thenReturn(userId);
        when(userService.findWeights(userId)).thenReturn(mockResource);

        ResponseEntity<Object> response = userController.findResource(resource, request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockResource, response.getBody());

        verify(userService).validateJWT(request);
        verify(userService).findWeights(userId);
    }

    @Test
    public void addResource_search_200() throws Exception {
        String userId = "validUserId";
        String resource = "s";
        String searchString = "exampleSearch";

        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();

        verify(userService).validateJWT(request);
        verify(userService).addSearch(userId, searchString);

        when(request.getHeader("Authorization")).thenReturn("validJWT");
        when(userService.validateJWT(request)).thenReturn(userId);

        mockMvc.perform(post("/api/user/new/" + resource)
                        .param("searchString", searchString)
                        .header("Authorization", "validJWT")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("Search was added"));

        verify(userService).validateJWT(request);
        verify(userService).addSearch(userId, searchString);

    }

    @Test
    public void addResource_fave_200() {

    }

    @Test
    public void addResource_app_200() {

    }

    @Test
    public void addResource_weights_200() {

    }

    // addResource
    // updateEmail
    // updateResources
    // removeResources
    // removeUser

}
