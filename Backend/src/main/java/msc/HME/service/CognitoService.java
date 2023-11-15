package msc.HME.service;

import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

// ...

@Service
public class CognitoService {

    private final AWSCognitoIdentityProvider cognitoClient;

    public CognitoService() {
        this.cognitoClient = AWSCognitoIdentityProviderClientBuilder.standard()
                .withRegion("eu-west-1") // Specify your Cognito region
                .build();
    }

    public Object updateUserEmail(String username, String newEmail) {
        AttributeType emailAttribute = new AttributeType()
                .withName("email")
                .withValue(newEmail);

        // Create an attribute to mark the email as verified OPTION
        AttributeType emailVerifiedAttribute = new AttributeType()
                .withName("email_verified")
                .withValue("true");

        AdminUpdateUserAttributesRequest updateRequest = new AdminUpdateUserAttributesRequest()
                .withUserPoolId("eu-west-1_VBubqBEr4")
                .withUsername(username)
                .withUserAttributes(emailAttribute, emailVerifiedAttribute); // Add both attributes to the request

        try {
            return cognitoClient.adminUpdateUserAttributes(updateRequest);
        } catch (AliasExistsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An account with the given email already exists");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Resource could not be found");
        } catch (InternalErrorException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            // To fix
            System.out.println(e);
            return e;
        }
    }

    public Object deleteUser(String id) {
        AdminDeleteUserRequest deleteRequest = new AdminDeleteUserRequest()
                .withUserPoolId("eu-west-1_VBubqBEr4")
                .withUsername(id);

        try {
            return cognitoClient.adminDeleteUser(deleteRequest);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            // Handle other exceptions appropriately
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user: " + e.getMessage());
        }
    }
}


