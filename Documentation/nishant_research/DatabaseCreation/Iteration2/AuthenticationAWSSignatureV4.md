### Authentication: AWSSignatureV4ToSign

## Calling AWS API Gateway Endpoint from Postman:

2. Go to the "Authorization" Tab of your previous endpoint:

3. Type: In the Type dropdown, select AWS Signature.
AccessKey & SecretKey: Enter the AccessKey and SecretKey of the IAM user that has permissions to invoke the API. (Remember, never hardcode these in production apps!)
AWS Region: Enter the region of your API Gateway (eu-west-1).
Service Name: Enter execute-api for API Gateway.