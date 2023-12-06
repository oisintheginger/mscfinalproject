import pymysql
import pandas as pd
import numpy as np
from scipy.spatial.distance import cdist
from math import radians

# Configuration Values
endpoint = 'myhmedb.cdc3elu6ufgt.eu-west-1.rds.amazonaws.com'
username = 'admin'
password = 'PassCondria123'
database_name = "hmedbmain"

# Connection
connection = pymysql.connect(host=endpoint, user=username, passwd=password, db=database_name)

# create a cosine similarity function
def cosine_similarity(vector1, matrix2):
    dot_product = np.dot(vector1, matrix2.T)  # change shape of matrix2 for correct alignment
    norm_vector1 = np.linalg.norm(vector1)
    norm_matrix2 = np.linalg.norm(matrix2, axis=1)

    # Check for zero norm to avoid division by zero
    zero_norm_mask = (norm_vector1 == 0) | (np.atleast_1d(norm_matrix2) == 0)

    # Set similarity to 0 where division by zero or NaN would occur
    similarity = np.where(zero_norm_mask, 0, dot_product / (np.maximum(norm_vector1 * norm_matrix2, 1e-9)))

    return similarity

# Function to get hybrid recommendations
def handler(user_ID):

    cursor = connection.cursor()

    # Find the neighbourhood of the propertyID
    query = 'SELECT * FROM user_interactions'
    cursor.execute(query)

    data = cursor.fetchall()

    columns = [desc[0] for desc in cursor.description]  # Extract column names
    user_interactions_df = pd.DataFrame(data, columns=columns)
    print("unique ids = ", user_interactions_df['id'].nunique())


    # Fetch property details data
    query = '''
        SELECT 
            mi.propertyID,
            mi.bathrooms, 
            mi.bedrooms,
            mi.price
        FROM 
            MainInformation mi
        '''

    cursor = connection.cursor()
    cursor.execute(query)

    data_main_information = cursor.fetchall()

    columns_main_information = [desc[0] for desc in cursor.description]
    main_information_df = pd.DataFrame(data_main_information, columns=columns_main_information)

    # Create a dictionary mapping propertyID to information
    property_info_mapping = main_information_df.set_index('propertyID').to_dict(orient='index')

    # Map the information from MainInformation to user_interactions_df
    user_interactions_df['bathrooms'] = user_interactions_df['propertyID'].map(lambda x: property_info_mapping[x]['bathrooms']).fillna(0)
    user_interactions_df['bedrooms'] = user_interactions_df['propertyID'].map(lambda x: property_info_mapping[x]['bedrooms']).fillna(0)
    user_interactions_df['price'] = user_interactions_df['propertyID'].map(lambda x: property_info_mapping[x]['price'])

    df = user_interactions_df.copy()

    # Pivot the DataFrame to create a user-feature matrix
    user_feature_matrix = df.pivot_table(index='id', columns='propertyID', values='click_count', fill_value=0).reset_index()

    user_feature_matrix_2 = df.pivot_table(index='id', columns='propertyID', values='price', fill_value=0).reset_index()
    user_feature_matrix = pd.merge(user_feature_matrix, user_feature_matrix_2, on='id', suffixes=('_click_count', '_price'))

    user_feature_matrix_3 = df.pivot_table(index='id', columns='propertyID', values='bedrooms', fill_value=0).reset_index()
    user_feature_matrix_3.columns = [f"{col}_bedrooms" if col != 'id' else col for col in user_feature_matrix_3.columns]
    user_feature_matrix = pd.merge(user_feature_matrix, user_feature_matrix_3, on='id')

    user_feature_matrix_4 = df.pivot_table(index='id', columns='propertyID', values='bathrooms', fill_value=0).reset_index()
    user_feature_matrix_4.columns = [f"{col}bathrooms" if col != 'id' else col for col in user_feature_matrix_4.columns]
    user_feature_matrix = pd.merge(user_feature_matrix, user_feature_matrix_4, on='id')


    input_user_vector = user_feature_matrix[user_feature_matrix['id'] == user_ID].drop('id', axis=1).values.flatten()

    other_users_matrix = user_feature_matrix[user_feature_matrix['id'] != user_ID].drop('id', axis=1).values

    similarities = cosine_similarity(input_user_vector, other_users_matrix)
    most_similar_indices = np.argsort(similarities)[::-1][:10]

    most_similar_users = user_feature_matrix.iloc[most_similar_indices]['id']
    print(most_similar_users)
    print(user_feature_matrix["id"][2])

    user_feature_matrix.to_csv("D:/Datasets/FinishedDatasets/user_feature_matrix.csv", index=False)

# Call the function with a user_ID
result = handler("59f67f7b-29fd-4bfc-aaf8-c1ece848ac2e")

