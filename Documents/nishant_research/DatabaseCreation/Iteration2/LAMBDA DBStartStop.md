## LAMBDA: DBStartStop
### Set Up Lambda Function to Start RDS
1. Navigate to the AWS Lambda console.
2. Click on "Create function".
3. Select "Author from scratch".
4. Fill in the following details:
 	- Name: StartRDSInstance
 	- Runtime: Python 3.x
	- Role: Choose an existing role (or create a new 	one with AmazonRDSFullAccess permissions).
5. Click "Create function".
6.Once created, replace the default code in the Lambda

```python
import boto3

def lambda_handler(event, context):
    rds = boto3.client('rds')
    response = rds.start_db_instance(DBInstanceIdentifier='myhmedb')
    return {
        'statusCode': 200,
        'body': 'RDS instance starting...'
    }

```
7. Save the function.

### Set Up Lambda Function to Stop RDS on Inactivity
1. Create another Lambda function named StopRDSInstance.
2. Use the same permissions and runtime as before.
3. Once the function is created, replace the default code 

```python
import boto3

def lambda_handler(event, context):
    rds = boto3.client('rds')
    response = rds.stop_db_instance(DBInstanceIdentifier='myhmedb')
    return {
        'statusCode': 200,
        'body': 'RDS instance stopping...'
    }
```
8. Save the function.
