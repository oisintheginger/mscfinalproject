### API Gateway to Trigger the Start Lambda Function

1. Navigate to the AWS API Gateway console.
2. Click on "Create API".
3. Select "REST API" (this should fit within the free tier).
4. Click "Build".
5. Set up a new resource.
6. Create a new GET method for that resource.
7. For the integration type, choose "Lambda Function".
8. Select the StartRDSInstance Lambda function.
9. Deploy the API:
	9.1 Click on "Actions" > "Deploy API".
	9.2 Choose [New Stage] and give it a name.
10. Note down the API endpoint URL. Developers can use this URL to start the RDS instance.
