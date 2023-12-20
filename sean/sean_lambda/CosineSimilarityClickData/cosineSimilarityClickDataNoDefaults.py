import pymysql
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity 
import time  

# Configuration Values
endpoint = 'myhmedb.cdc3elu6ufgt.eu-west-1.rds.amazonaws.com'
username = 'admin'
password = 'PassCondria123'
database_name = "hmedbmain"

# Connection
connection = pymysql.connect(host=endpoint, user=username, passwd=password, db=database_name)

df_other = pd.DataFrame()

# create a cosine similarity function
def cosine_similarity(vector1, matrix2):
    dot_product = np.dot(vector1, matrix2.T)
    norm_vector1 = np.linalg.norm(vector1)
    norm_matrix2 = np.linalg.norm(matrix2, axis=1)

    # Check for zero norm to avoid division by zero
    zero_norm_mask = (norm_vector1 == 0) | (np.atleast_1d(norm_matrix2) == 0)

    # Set similarity to 0 where division by zero or NaN would occur
    similarity = np.where(zero_norm_mask, 0, dot_product / (np.maximum(norm_vector1 * norm_matrix2, 1e-9)))

    return similarity

def handler(user_ID):
    cursor = connection.cursor()
    start_time = time.time()
    # Find the neighbourhood of the propertyID
    query = 'SELECT * FROM user_interactions'
    cursor.execute(query)

    data = cursor.fetchall()


    data_df = pd.DataFrame(data, columns=['user_interaction_id', 'property_ID','user_ID','click_count'])

        # List of property IDs to be removed
    property_ids_to_remove = [36428890, 36428953, 36429007, 36429137, 36429337,
                              2124108834, 2124248020, 2125094297, 2130171237, 2130802257]

    # Remove rows with specified property IDs
    data_df = data_df[~data_df['propertyID'].isin(property_ids_to_remove)]
    
    user_data = data_df[data_df['user_ID'] == user_ID].pivot_table(index='property_ID', values='click_count', aggfunc='sum').reset_index()

    other_users_data = data_df[data_df['user_ID'] != user_ID].pivot_table(index='user_ID', columns='property_ID', values='click_count', aggfunc='sum').fillna(0)

    similarity = cosine_similarity([user_data['click_count']], other_users_data.values)[0]

    similar_users_df = pd.DataFrame({'user_ID': other_users_data.index, 'similarity': similarity})

    similar_users_df = similar_users_df.sort_values(by='similarity', ascending=False)

    top_similar_users = similar_users_df.head(10)

    # Extract the IDs of the top similar users
    top_user_ids = top_similar_users['user_ID'].tolist()

    # Create a new DataFrame with data only for top similar users
    top_users_data_df = data_df[data_df['user_ID'].isin(top_user_ids)]

     # Aggregate clicks by property ID
    aggregated_clicks = top_users_data_df.groupby('property_ID')['click_count'].sum().reset_index()

    # Sort properties by total clicks in descending order
    aggregated_clicks = aggregated_clicks.sort_values(by='click_count', ascending=False).head(10)

    print(aggregated_clicks)

    return aggregated_clicks

df = pd.read_csv("D:/Datasets/all_database_tables/user.csv")

for i in list(range(len(df))):
    hi = handler(df["id"][i]) 
    hi.to_csv(f"D:/Datasets/all_database_tables/user_{i}.csv")


