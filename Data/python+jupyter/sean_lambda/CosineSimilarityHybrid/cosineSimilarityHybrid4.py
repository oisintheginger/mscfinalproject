import pymysql
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity 

# Configuration Values
endpoint = 'myhmedb.cdc3elu6ufgt.eu-west-1.rds.amazonaws.com'
username = 'admin'
password = 'PassCondria123'
database_name = "hmedbmain"

# Connection
connection = pymysql.connect(host=endpoint, user=username, passwd=password, db=database_name)

def handler(user_ID):
    cursor = connection.cursor()

    original_query = 'SELECT * FROM user_interactions'
    cursor.execute(original_query)
    original_data = cursor.fetchall()

    #Convert original data to a DataFrame
    original_data_df = pd.DataFrame(original_data, columns=['user_interaction_id', 'propertyID', 'id', 'click_count'])

    # Additional query to retrieve property details data
    property_details_query = '''
        SELECT 
            mi.propertyID,
            mi.bathrooms, 
            mi.bedrooms,
            mi.price,
            a.geoLocation
        FROM 
            Addresses a
        JOIN 
            MainInformation mi ON a.addressID = mi.addressID
        '''

    cursor.execute(property_details_query)
    property_details_data = cursor.fetchall()

    columnNames = ['propertyID', 'bathrooms', 'bedrooms','price', 'geoLocation']
    # Convert property details data to a DataFrame
    property_details_data_df = pd.DataFrame(property_details_data, columns= columnNames)

    # Merge the two DataFrames on property_ID
    merged_data_df = pd.merge(original_data_df, property_details_data_df, left_on='propertyID', right_on='propertyID')

    columnNames = merged_data_df.columns.tolist()

    # Begin by creating a DataFrame that contains unique property IDs, this line will contain one row
    user_data = merged_data_df[merged_data_df['id'] == user_ID].pivot_table(index='propertyID', values=columnNames, aggfunc='sum').reset_index()

    user_data.to_csv("D:/Datasets/FinishedDatasets/resultData4.csv", index = False)


    # Do the same but now make the property ID as rows, the user ID as columns, and the click count as values
    other_users_data = merged_data_df[merged_data_df['id'] != user_ID].pivot_table(index='id', columns='propertyID', values=columnNames, aggfunc='sum').fillna(0)

    # We need to fix the formatting so that input is compatible with the cosine similarity formula, input must be a 2d array
    similarity = cosine_similarity([user_data['click_count']], other_users_data.values)[0]

    # Convert the similar users array into a DataFrame
    similar_users_df = pd.DataFrame({'user_ID': other_users_data.index, 'similarity': similarity})

    # Now apply the formula, and store in a new DataFrame
    similar_users_df = similar_users_df.sort_values(by='similarity', ascending=False)

    # Extract the top similar users; we will find the 10 most similar users
    top_similar_users = similar_users_df.head(10)

    # Merge dataset, this way we can find the counts
    result_df = pd.merge(top_similar_users, data_df, on='user_ID')

    # Aggregate counts
    result_df = result_df.pivot_table(index=['property_ID'], values='click_count', aggfunc='sum').reset_index()

    # Sort by aggregated click count in descending order
    result_df = result_df.sort_values(by='click_count', ascending=False)

    result_df = result_df.head(10)
    print(result_df)
    return result_df

# Call the function with a user_ID
result = handler("a937e585-36b0-43a3-9c7b-a460c9024162")

