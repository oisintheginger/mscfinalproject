Set Up CloudWatch Alarm to Trigger the Stop Lambda Function:
Navigate to the CloudWatch console.
Under "Alarms", click "Create Alarm".
Choose the RDS -> DatabaseConnections metric for your specific RDS instance.
Set the condition to trigger when the metric is <= 0 for 30 consecutive minutes.
For the action, select the StopRDSInstance Lambda function.

(In Progress)