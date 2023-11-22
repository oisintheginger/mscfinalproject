import pymysql
import pandas as pd

#configuration value
endpoint = open('endpoint.txt','r').read()
username = open('username.txt','r').read()
password = open('password.txt','r').read()
database_name = open('database_name.txt','r').read()

#connection
connection = pymysql.connect(host=endpoint, user=username,passwd=password, db= database_name)


# def handler():
#     try:
#         # Creating a cursor
#         with connection.cursor() as cursor:
#             # Executing SQL query
#             cursor.execute('SELECT * FROM service_scores')

#             # Fetching all rows
#             rows = cursor.fetchall()

#             # Processing the rows
#             for row in rows:
#                 print(row)  

#     except Exception as e:
#         print(f"Error: {e}")

#     finally:
#         # Closing the connection outside the try-except block to ensure it happens regardless of exceptions
#         connection.close()

# # Call the handler function 
# handler()

def handler(): #creating a function to create and view tags
    try:
        # Creating a cursor
        with connection.cursor() as cursor:
            # Executing SQL query to fetch data from the service_scores table
            query = 'SELECT * FROM service_scores'
            cursor.execute(query)

            # Fetching the results into a DataFrame
            data = pd.DataFrame(cursor.fetchall(), columns=[desc[0] for desc in cursor.description])

            # Checking the data types of the columns
            # print(data.dtypes)

            # Checking for missing values in the columns
            # print(data.isna().sum())

            neighbourhoods = data['neighbourhoodID'].unique()

            # Creating tags for each neighbourhood
            for neighbourhood in neighbourhoods:
                # Selecting data for the current neighbourhood
                neighbourhood_data = data[data['neighbourhoodID'] == neighbourhood]

                # Dropping the sum_z_scores column from the neighbourhood_data DataFrame
                neighbourhood_data = neighbourhood_data.drop('sum_z_scores', axis=1)

                if not neighbourhood_data.empty:
                    # Getting the three services with the highest z scores
                    top_services = neighbourhood_data.filter(regex='_z_score(?!.*sum_z_scores)').idxmax(axis=1).tolist()

                    # Creating tags based on the three services with the highest z scores
                    tags = ', '.join(top_services)

                    # Adding a new 'tags' column to the DataFrame for printing
                    data.loc[data['neighbourhoodID'] == neighbourhood, 'tags'] = tags

            # Printing the DataFrame with the added 'tags' column
            print(data[['neighbourhoodID', 'tags']])

    except Exception as e:
        print(f"Error: {e}")

    finally:
        # Closing the connection outside the try-except block to ensure it happens regardless of exceptions
        connection.close()

# Calling the function to create and view the tags
handler()
