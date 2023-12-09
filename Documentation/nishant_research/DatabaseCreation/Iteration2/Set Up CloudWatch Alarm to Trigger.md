### Set Up CloudWatch Alarm to Trigger the Stop Lambda Function:

1. Navigate to the CloudWatch console.
2. Under "Alarms", click "Create Alarm".
3. Choose the RDS -> DatabaseConnections metric for your specific RDS instance.
4. Set the condition to trigger when the metric is <= 0 for 30 consecutive minutes.
5. For the action, select the StopRDSInstance Lambda function.

### Detailed Creation CloudWatch:

1. Open the AWS Management Console.
2. Navigate to the CloudWatch service.
3. Create a New Alarm:

4. In the CloudWatch dashboard, on the left-hand side, click on "Alarms."
5. Then click on the "Create Alarm" button.
6. Choose the Metric:

- In the "Create Alarm" wizard, click on the "Select metric" button.
- Under "All metrics," navigate to RDS > Database > DatabaseConnections.
-  List of metrics specific to your RDS instances. Select the metric corresponding to the RDS instance by clicking on its checkbox. Then click on the "select metric" button.

7. Configure Conditions:

- For "Conditions":
- Set the condition to "Static".
- For "Whenever DatabaseConnections is...": select “<=”.
- Set the threshold value to “0”.
- For “Additional configuration”, choose to treat missing data as "breaching" (this is to ensure the alarm still triggers even if data points are missing).

8. Configure Actions:

- Under "Actions", in the "Alarm state trigger" section, click on the "Add notification" button.
- For "Select an SNS topic", choose "Create new topic".
- Provide a topic name and an email where you'd like notifications sent.
- Click on "Create topic".
- Now, instead of an email, we want to trigger the Lambda function.
- Go back to the "Actions" section and for the "Alarm state trigger" click on "Add action" and select "Stop/Start/Terminate EC2 instances".
- Now select the Lambda function you created earlier for stopping the RDS instance.

9. Configure other settings:

- For “Datapoints to alarm”: set it to "6 out of 6" (this means that if all data points in 30 minutes are 0, then the alarm will trigger).
- For "Name of the alarm", provide a suitable name, e.g., "RDSInactiveAlarm".

10. Create the Alarm:

Review all the configurations and then click on the "Create alarm" button.
Finalize:

Once the alarm is created, AWS will send a subscription confirmation to the email provided for the SNS topic. Confirm the subscription by clicking on the link in that email.