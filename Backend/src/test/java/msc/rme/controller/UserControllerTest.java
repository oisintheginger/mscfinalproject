package msc.rme.controller;

import jakarta.servlet.http.HttpServletRequest;
import msc.rme.service.UserService;
import msc.rme.binding.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @MockBean
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @Mock
    private HttpServletRequest request;

    private MockMvc mockMvc;

    private final String userId = "validUserId";

    @BeforeEach
    void setup() {
        //Initialize mocks and inject them into the tested class
        userService = mock(UserService.class);
        userController = new UserController(userService);
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void findUser_200() {

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
    void findResource_search_200() {

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
    void findResource_fave_200() {

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
    void findResource_application_200() {

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
    void findResource_weights_200() {

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
    void addResource_search_200() throws Exception {

        String resource = "s";
        String searchString = "exampleSearch";

        when(userService.validateJWT(any(HttpServletRequest.class))).thenReturn(userId);

        mockMvc.perform(post("/api/user/new/" + resource)
                        .param("searchString", searchString)
                        .header("Authorization", "validJWT")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("Search was added"));

        verify(userService).validateJWT(any(HttpServletRequest.class));
        verify(userService).addSearch(userId, searchString);
    }

    @Test
    void addResource_fave_200() throws Exception {

        String resource = "f";
        String propertyId = "exampleId";

        when(userService.validateJWT(any(HttpServletRequest.class))).thenReturn(userId);

        mockMvc.perform(post("/api/user/new/" + resource)
                        .param("propertyId", propertyId)
                        .header("Authorization", "validJWT")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("Favourite was added"));

        verify(userService).validateJWT(any(HttpServletRequest.class));
        verify(userService).addFaves(userId, propertyId);
    }

    @Test
    void addResource_app_200() throws Exception {

        String resource = "a";
        String propertyId = "exampleId";
        String message = "exampleMsg";

        when(userService.validateJWT(any(HttpServletRequest.class))).thenReturn(userId);

        mockMvc.perform(post("/api/user/new/" + resource)
                        .param("propertyId", propertyId)
                        .param("message", message)
                        .header("Authorization", "validJWT")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("Application was added"));

        verify(userService).validateJWT(any(HttpServletRequest.class));
        verify(userService).addApplication(userId, propertyId, message);
    }

    @Test
    void addResource_weights_200() throws Exception {

        String resource = "w";
        String leisure = "example";
        String personal_care = "example";
        String retail = "example";
        String fitness = "example";
        String finance = "example";
        String transportation = "example";
        String emergency = "example";

        when(userService.validateJWT(any(HttpServletRequest.class))).thenReturn(userId);

        mockMvc.perform(post("/api/user/new/" + resource)
                        .param("leisure", leisure)
                        .param("personal_care", personal_care)
                        .param("retail", retail)
                        .param("fitness", fitness)
                        .param("finance", finance)
                        .param("transportation", transportation)
                        .param("emergency", emergency)
                        .header("Authorization", "validJWT")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("Weights were added"));

        verify(userService).validateJWT(any(HttpServletRequest.class));
        verify(userService).updateWeights(userId, leisure, personal_care, retail, fitness, finance, transportation, emergency);

    }

    @Test
    void updateEmail_200() throws Exception {
        String email = "exampleEmail";

        when(userService.validateJWT(any(HttpServletRequest.class))).thenReturn(userId);

        mockMvc.perform(patch("/api/user/update/email")
                        .param("email", email)
                        .header("Authorization", "validJWT")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is2xxSuccessful());

        verify(userService).validateJWT(any(HttpServletRequest.class));
        verify(userService).updateEmail(userId, email);
    }

    @Test
    void updateResources_weights_200() throws Exception {

        String resource = "w";
        String leisure = "example";
        String personal_care = "example";
        String retail = "example";
        String fitness = "example";
        String finance = "example";
        String transportation = "example";
        String emergency = "example";

        when(userService.validateJWT(any(HttpServletRequest.class))).thenReturn(userId);

        mockMvc.perform(patch("/api/user/update/" + resource)
                        .param("leisure", leisure)
                        .param("personal_care", personal_care)
                        .param("retail", retail)
                        .param("fitness", fitness)
                        .param("finance", finance)
                        .param("transportation", transportation)
                        .param("emergency", emergency)
                        .header("Authorization", "validJWT")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("Weights were updated"));

        verify(userService).validateJWT(any(HttpServletRequest.class));
        verify(userService).updateWeights(userId, leisure, personal_care, retail, fitness, finance, transportation, emergency);
    }

    @Test
    void updateResources_search_200() throws Exception {

        String resource = "s";
        String searchString = "exampleSearch";
        String newSearchString = "exampleNewSearch";

        when(userService.validateJWT(any(HttpServletRequest.class))).thenReturn(userId);

        mockMvc.perform(patch("/api/user/update/" + resource)
                        .param("searchString", searchString)
                        .param("newSearchString", newSearchString)
                        .header("Authorization", "validJWT")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("Search was updated"));

        verify(userService).validateJWT(any(HttpServletRequest.class));
        verify(userService).addSearch(userId, newSearchString);
        verify(userService).removeSearch(userId, searchString);
    }

    @Test
    void removeResource_search_200() throws Exception {
        String resource = "s";
        String searchString = "exampleSearch";

        when(userService.validateJWT(any(HttpServletRequest.class))).thenReturn(userId);

        mockMvc.perform(delete("/api/user/remove/" + resource)
                        .param("searchString", searchString)
                        .header("Authorization", "validJWT")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("Search was removed"));

        verify(userService).validateJWT(any(HttpServletRequest.class));
        verify(userService).removeSearch(userId, searchString);
    }

    @Test
    void removeResource_fave_200() throws Exception {
        String resource = "f";
        String propertyId = "propertyId";

        when(userService.validateJWT(any(HttpServletRequest.class))).thenReturn(userId);

        mockMvc.perform(delete("/api/user/remove/" + resource)
                        .param("propertyId", propertyId)
                        .header("Authorization", "validJWT")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("Favourite was removed"));

        verify(userService).validateJWT(any(HttpServletRequest.class));
        verify(userService).removeFave(userId, propertyId);

    }

    @Test
    void removeResource_weights_200() throws Exception {
        String resource = "w";
        String leisure = "";
        String personal_care = "";
        String retail = "";
        String fitness = "";
        String finance = "";
        String transportation = "";
        String emergency = "";

        when(userService.validateJWT(any(HttpServletRequest.class))).thenReturn(userId);

        mockMvc.perform(delete("/api/user/remove/" + resource)
                        .header("Authorization", "validJWT")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("User weights were removed"));

        verify(userService).validateJWT(any(HttpServletRequest.class));
        verify(userService).updateWeights(userId, leisure, personal_care, retail, fitness, finance, transportation, emergency);
    }

    @Test
    void removeUser_200() throws Exception {
        when(userService.validateJWT(any(HttpServletRequest.class))).thenReturn(userId);

        mockMvc.perform(delete("/api/user/remove")
                        .header("Authorization", "validJWT")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is2xxSuccessful());

        verify(userService).validateJWT(any(HttpServletRequest.class));
        verify(userService).deleteUser(userId);
    }

}
