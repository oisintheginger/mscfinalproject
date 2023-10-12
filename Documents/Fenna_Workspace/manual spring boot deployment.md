There's 2 ways to manually deploy a spring boot application to AWS api gateway and lambda

- Create a zip file and deploy through aws console
  
  https://www.youtube.com/watch?v=GGPPkUcHleQ
  
    Min 19:20
	
- Using the Serverless Application Model (SAM) from aws 
  - Install the SAM CLI 
  - Generate access credentials (aws access key id and secret access key)
  - Using the setx command set the credentials as environment variables 
  - Run sam build  in the spring boot directory (where template.yaml is present) 
  - Now there is a .aws-sam folder where you can find the compiled java application 
  - Run sam deploy (--guided) 
    - --guided if you have to configure some settings for first time deployment 
		
You can test the deployment through 
- Postman 
  - Go to api gateway in the amazon console and click your api, select the prod stage and copy past the Invoke URL. 
  - Paste this URL in postman with the correct HTTP method 
  - Click the authorization tab, and put in the aws signature (credentials) 
  - Send off the request 
- AWS lambda 
  - Using the amazon console, go to lambda and click the function
  - Scroll down and click the test tab 
  - Here you can test the lambda function directly 

Note: if there's issues in postman its always a good idea to test the application directly in lambda to determine where the issue lies. 
