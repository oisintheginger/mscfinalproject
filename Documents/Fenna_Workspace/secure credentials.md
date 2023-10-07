**AWS secretsmanager**
It allows you to store, encrypt and retrieve credentials in a secure way. You can make a call to aws secretsmanager instead of hardcoding the credentials. It also supports rotating credentials. 

The first place I recommend we use this is for the cognito user pool credentials on the frontend. Additionally, it should be used any other time the frontend or backend uses credentials. 

How to use in React/nodejs
https://www.youtube.com/watch?v=Keu4kvYPnHM

How to use in springboot
https://www.youtube.com/watch?v=eierYzOAyg8

**AWS parameterstore**
It was designed to cater to a wider use case, not just secrets or passwords, but also application configuration variables like URLs, Custom settings, AMI IDs, License keys, etc. 

In React/nodejs
https://www.youtube.com/watch?v=EoumA03c2Oo

In spring boot
https://www.youtube.com/watch?v=eierYzOAyg8
    min 5:30

**Comparison**
Similarities 
- Both can leverage AWS KMS to encrypt values. 
- Both key-value store 
- You can store the secrets (in either which can be referenced in the CloudFormation template so that you just have a pointer to the value in your template instead of containing the secrets in plaintext.
- Both support versioning 

Differences 
- Cost 

SM: paid, after 30 day free trial it is 0.40$ per secret per month 

PS: For Standard parameters, No additional charge for storage and standard throughput. For higher throughput, API interactions cost is $0.05 per 10,000 API calls.
For Advanced parameters, storage cost is $0.05 per advanced parameter per month and API interactions cost is $0.05 per 10,000 API calls.

- Secrets rotation 

SM: offers ability to switch secrets at any time.

PS: you can write your own function to update credentials 

- Cross-account access

SM: Supported 

PM: not supported 

- Secret size 

SM: up to 10KB secret size

PM: standard parameters = 4KB, Advanced parameters= 8KB

- Limits 

SM: 500 000 secrets

PM: 10 000 secrets

- Multiple regions replication

SM: easily replicate across regions 

PM: not supported. 

Conclusion:
I would say we use standard parameters in the parameter store primarily because of the cost. Any of the other key differences would not affect us because of the small scale of the project.

Source:
https://medium.com/p/f02686604eae