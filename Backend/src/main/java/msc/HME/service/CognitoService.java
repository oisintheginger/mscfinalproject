package msc.HME.service;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProvider;
import com.amazonaws.services.cognitoidp.AWSCognitoIdentityProviderClientBuilder;
import com.amazonaws.services.cognitoidp.model.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CognitoService {

    private final AWSCognitoIdentityProvider cognitoClient;

    public CognitoService() {
        this.cognitoClient = AWSCognitoIdentityProviderClientBuilder.standard()
                .withRegion(Regions.EU_WEST_1)
                .build();
    }

    public ResponseEntity<Object> updateUserEmail(String username, String newEmail) {
        AttributeType emailAttribute = new AttributeType()
                .withName("email")
                .withValue(newEmail);

        AttributeType emailVerifiedAttribute = new AttributeType()
                .withName("email_verified")
                .withValue("true");

        AdminUpdateUserAttributesRequest updateRequest = new AdminUpdateUserAttributesRequest()
                .withUserPoolId("eu-west-1_VBubqBEr4")
                .withUsername(username)
                .withUserAttributes(emailAttribute, emailVerifiedAttribute);

        try {
            cognitoClient.adminUpdateUserAttributes(updateRequest);
            return ResponseEntity.status(HttpStatus.OK).body("Account was updated successfully");
        } catch (AliasExistsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An account with the given email already exists");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Resource could not be found");
        } catch (InternalErrorException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Account could not be updated");
        }
    }

    public ResponseEntity<Object> deleteUser(String id) {
        AdminDeleteUserRequest deleteRequest = new AdminDeleteUserRequest()
                .withUserPoolId("eu-west-1_VBubqBEr4")
                .withUsername(id);

        try {
            cognitoClient.adminDeleteUser(deleteRequest);
            return ResponseEntity.status(HttpStatus.OK).body("User was deleted successfully");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource was not found");
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User was not found");
        } catch(InternalErrorException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User could not be removed");
        }
    }
}


