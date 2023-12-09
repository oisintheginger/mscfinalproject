## Database Creation: AWS RDS MySQL Instance

### Setting Up a Free Tier RDS MySQL Instance

1. Navigate to the **Amazon RDS console**.
2. Click on "Create database".
3. Choose "Standard Create".
4. For "Engine type", select "MySQL".
5. In "Templates", choose "Free tier".

### DB Instance Details

- **DB instance identifier:** `myhmedb`
- **Master username & password:** Set your desired login credentials.
- In the "DB instance size" section, ensure you select "Burstable classes (includes t2)".
- For "Connectivity", ensure the VPC is set to the default.
- In "Additional configuration", set the initial database name, backup settings, etc. as per your needs.
