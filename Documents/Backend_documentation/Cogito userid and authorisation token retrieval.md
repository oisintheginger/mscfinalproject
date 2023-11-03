1. User ID:
   
The user ID (or sub) is a unique identifier for the user in the Cognito User Pool. You can retrieve it once the user has successfully logged in. The user ID is included in the ID Token in the payload under the key sub.

2. Authorization Token:
   
    Amazon Cognito provides different types of tokens upon successful authentication:
   
    • ID Token: Contains details about the user.
   
    • Access Token: Grants access to allowed resources.
   
    • Refresh Token: Used to retrieve new ID and access tokens without requiring the user to log in again.
   
    You can retrieve these tokens using the SDKs provided by AWS for different programming languages. Below is an example using AWS Amplify in a JavaScript application:

       import{ Auth} from'aws-amplify';
       Auth.signIn(username, password)
       .then(user=>{
       if(user.challengeName) {
       // Handle MFA or other challenges} else{
       // User is signed inconsole.log('User ID (sub):', user.attributes.sub);
       Auth.currentSession()
       .then(session=>{
       console.log('ID Token:', session.getIdToken().getJwtToken());
       console.log('Access Token:', session.getAccessToken().getJwtToken());
       console.log('Refresh Token:', session.getRefreshToken().getToken());
       })
       .catch(error=>console.error('Error fetching session:', error));
       }
       })
       .catch(error=>console.error('Error signing in:', error));
   In this example:
   
    • The signIn method is used to log in the user.
   
    • The user’s unique identifier (sub) is accessed via user.attributes.sub.

    • The currentSession method is used to retrieve the current session, which includes the ID Token, Access Token, and Refresh Token.


Here’s how you can handle the retrieval of the user ID and authorization token using the hosted UI:
3. Retrieve Tokens and User ID in Your Application
   
    For Implicit Grant:
    
    Tokens will be in the URL fragment. You can parse them directly from there.

       if(window.location.hash) {
       constparams = newURLSearchParams(window.location.hash.slice(1));
       constidToken = params.get('id_token');
       constaccessToken = params.get('access_token');
       if(idToken) {
       constpayload = JSON.parse(atob(idToken.split('.')[1]));
       constuserId = payload.sub;
       console.log('User ID:', userId);
       console.log('ID Token:', idToken);
       console.log('Access Token:', accessToken);
       }
       }
   
    For Authorization Code Grant:
   
    You need to exchange the code for tokens on your server using the /oauth2/token endpoint. Then you can parse the ID token to get the user ID.

       // This should be done on your server
       constcode = req.query.code; // Get the code from the query stringaxios.post('https://<your-domain>.auth.<region>.amazoncognito.com/oauth2/token', {
       grant_type: 'authorization_code',
       client_id: '<your-app-client-id>',
       redirect_uri: '<your-callback-url>',
       code: code
       }, {
       headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
       }).then(response=>{
       constidToken = response.data.id_token;
       constaccessToken = response.data.access_token;
       constpayload = JSON.parse(atob(idToken.split('.')[1]));
       constuserId = payload.sub;
       console.log('User ID:', userId);
       console.log('ID Token:', idToken);
       console.log('Access Token:', accessToken);
       }).catch(error=>console.error('Error exchanging code for tokens:', error));
      