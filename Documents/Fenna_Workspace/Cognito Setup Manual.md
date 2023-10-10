Its honestly quit straightforward in the manual but a few notes: 
<br><br>
Step 1 <br>
Make sure to only enable email as signin options because phone/sms has costs associates 
![img_4.png](images/img_4.png)
<br><br>

Step 2 <br>
![img_5.png](images/img_5.png)

Step 3 <br>
Again make sure there's no sms messages being sent as part of the flow 
![img_6.png](images/img_6.png)
User profile possible attributes for additional required attributes :
- Address
- Birthdate
- Family name
- Gender
- Given name
- Full name 
- Phone number
- Locale
- Middle name
- Nickname
- Picture
- Preferred username
- Profile (URL)
- Updated_at
- Website (webpage)
- (Time)zoneinfo
- custom attributes 

you can add custom attributes
Might be a good way to implement the extra functionality (personal questions)
![img_7.png](images/img_7.png)

Step 4 <br>
![img_8.png](images/img_8.png)

Step 5 <br>
Uncheck 'use the cognito hosted UI' 
Uncheck 'generate a client secret' !! At the moment this not supported using the javascript SDK 
- Advanced authentication settings
![img_9.png](images/img_9.png)
- attribute read and write permissions
![img_10.png](images/img_10.png)

Step 6 <br>
Review everything and click 'create user pool'
