### Upload Dataset: CSV to S3

1. Login to AWS Console and navigate to S3.
2. Create an S3 bucket or use an existing one. Note the bucket name.
3. Upload your CSV file to this bucket.
4. Make sure the RDS instance's IAM role has permissions to read from this S3 bucket. Attach a policy like AmazonS3ReadOnlyAccess to the role.