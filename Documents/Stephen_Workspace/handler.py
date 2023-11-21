import pymysql

#configuration value
endpoint = open('endpoint.txt','r').read()
username = open('username.txt','r').read()
password = open('password.txt','r').read()
database_name = open('database_name.txt','r').read()

#connection
connection = pymysql.connect(host=endpoint, user=username,passwd=password, db= database_name)


def handler():
    try:
        # Creating a cursor
        with connection.cursor() as cursor:
            # Executing SQL query
            cursor.execute('SELECT * FROM service_scores')

            # Fetching all rows
            rows = cursor.fetchall()

            # Processing the rows
            for row in rows:
                print(row)  

    except Exception as e:
        print(f"Error: {e}")

    finally:
        # Closing the connection outside the try-except block to ensure it happens regardless of exceptions
        connection.close()

# Call the handler function
handler()