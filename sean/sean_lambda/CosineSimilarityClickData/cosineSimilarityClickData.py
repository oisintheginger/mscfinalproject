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

    # Find the neighbourhood of the propertyID
    query = 'SELECT * FROM user_interactions'
    cursor.execute(query)

    data = cursor.fetchall()

    # Convert data to a DataFrame
    data_df = pd.DataFrame(data, columns=['user_interaction_id', 'property_ID','user_ID','click_count'])

    # Begin by creating a DataFrame that contains unique property IDs
    user_data = data_df[data_df['user_ID'] == user_ID].pivot_table(index='property_ID', values='click_count', aggfunc='sum').reset_index()

    # Do the same but now make the property ID as rows, the user ID as columns, and the click count as values
    other_users_data = data_df[data_df['user_ID'] != user_ID].pivot_table(index='user_ID', columns='property_ID', values='click_count', aggfunc='sum').fillna(0)

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
    result_df.to_csv("D:/Datasets/FinishedDatasets/resultData2.csv", index = False)
    print(result_df)
    return result_df

# Call the function with a user_ID
result = handler("59f67f7b-29fd-4bfc-aaf8-c1ece848ac2e")

