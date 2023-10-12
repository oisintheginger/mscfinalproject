**step 0**

Update node.js and npm (lol)

**step 1**

npm install amazon-cognito-identity-js

**Step 2**
I created an example for a signup form. There are similar other functions available for this react component. Use the following code for your sign up form
    
    import { CognitoUserPool } from 'amazon-cognito-identity-js';

    const AmazonCognitoIdentity = require('amazon-cognito-identity-js');    
    
    const poolData = {
        UserPoolId: 'eu-north-1_ItPdvWwXq',
        ClientId: '5eoaskcluu217r636qnef1icib',
    };
    const userPool = new CognitoUserPool(poolData);
    
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const attributeList = [];

        const dataUsername = {
            Name: 'preferred_username',
            Value: data.get('firstName') + data.get('lastName'),
        };
        const attributeUsername = new AmazonCognitoIdentity.CognitoUserAttribute(dataUsername);

        attributeList.push(attributeUsername);

        userPool.signUp(
            data.get('email'),
            data.get('password'),
            attributeList,
            null,
            (err, result) => {
                // Unsuccesfull signup
                if (err) {
                    setError(err.message);
                    return;
                }
                // Successful signup
                const cognitoUser = result.user;
                alert('Signup successful!');
            }
        );
    };

And Voila these are the results: 
![img.png](../Fenna_Workspace/images/img.png)
and in the cognito aws console:
![img_1.png](../Fenna_Workspace/images/img_1.png)

Amazon-cognito-identity react package has the following possible exports:
- AuthenticationDetails, 
- AuthenticationHelper, 
- CognitoAccessToken, 
- CognitoIdToken, 
- CognitoRefreshToken, 
- CognitoUser,
- CognitoUserAttribute,
- CognitoUserPool, 
- CognitoUserSession, 
- CookieStorage, 
- DateHelper, 
- WordArray, 
- appendToCognitoUserAgent

Some skeleton code that has not been tested to implement MFA (email):

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
        Username: 'username',
        Pool: userPool
    });

    cognitoUser.confirmRegistration('<CODE-FROM-SMS>', true, function(err, result) {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Code verification result:', result);
    });

Here are some more sources:
- https://aws.amazon.com/blogs/mobile/accessing-your-user-pools-using-the-amazon-cognito-identity-sdk-for-javascript/
- https://dev.to/aws-builders/building-robust-user-sign-up-with-aws-cognito-and-react-cfd
- https://gist.github.com/gabeweaver/d1be9f0d41069437f576c375c30e134c
- General amazon cognito documentation: https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html
- Google (sorry Brendan) or chatgpt 
