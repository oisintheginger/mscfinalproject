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
    dot_product = np.dot(vector1, matrix2.T)
    norm_vector1 = np.linalg.norm(vector1)
    norm_matrix2 = np.linalg.norm(matrix2, axis=1)

    # Check for zero norm to avoid division by zero
    zero_norm_mask = (norm_vector1 == 0) | (np.atleast_1d(norm_matrix2) == 0)

    # Set similarity to 0 where division by zero or NaN would occur
    similarity = np.where(zero_norm_mask, 0, dot_product / (np.maximum(norm_vector1 * norm_matrix2, 1e-9)))

    return similarity

def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371  # Radius of Earth in kilometers
    dlat = np.radians(lat2 - lat1)
    dlon = np.radians(lon2 - lon1)
    a = np.sin(dlat / 2) ** 2 + np.cos(np.radians(lat1)) * np.cos(np.radians(lat2)) * np.sin(dlon / 2) ** 2
    c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a))
    distance = R * c
    return distance

# Function to get hybrid recommendations
def get_hybrid_recommendations(user_ID):
    # Fetch property details data
    property_details_query = '''
        SELECT 
            mi.propertyID,
            mi.bathrooms, 
            mi.bedrooms,
            mi.price,
            ST_X(a.geoLocation) as latitude,
            ST_Y(a.geoLocation) as longitude
        FROM 
            Addresses a
        JOIN 
            MainInformation mi ON a.addressID = mi.addressID
        '''

    cursor.execute(property_details_query)
    data = cursor.fetchall()
    # Convert data to a DataFrame
    property_details_df = pd.DataFrame(data, columns=['propertyID', 'bathrooms','bedrooms','price','longitude','latitude'])

    # Fetch user interactions data
    user_interactions_query = 'SELECT * FROM user_interactions'
    cursor.execute(user_interactions_query)
    data = cursor.fetchall()

    # Convert data to a DataFrame
    user_interactions_df = pd.DataFrame(data, columns=['propertyID', 'click_data'])

    # Merge property details and user interactions data
    merged_data_df = pd.merge(user_interactions_df, property_details_df, on='propertyID')

    # Filter data for the target user
    user_data = merged_data_df[merged_data_df['id'] == user_ID]

    # Calculate cosine similarity
    user_vector = user_data.iloc[0, 5:7].values.reshape(1, -1)
    other_vectors = merged_data_df.iloc[:, 5:7].values
    cosine_similarities = cosine_similarity(user_vector, other_vectors)

    # Calculate haversine distance
    haversine_distances = cdist(
        user_data[['latitude', 'longitude']],
        merged_data_df[['latitude', 'longitude']],
        metric=lambda u, v: haversine_distance(u[0], u[1], v[0], v[1])
    )

    # Add cosine similarity and haversine distance as new columns
    merged_data_df['cosine_similarity'] = cosine_similarities[0]
    merged_data_df['haversine_distance'] = haversine_distances[0]

    # Combine similarity scores using a weighted sum (you can adjust weights)
    merged_data_df['hybrid_score'] = 0.7 * merged_data_df['cosine_similarity'] + 0.3 / (merged_data_df['haversine_distance'] + 1e-6)

    # Get top 10 recommendations based on hybrid score
    top_recommendations = merged_data_df.nlargest(10, 'hybrid_score')

    return top_recommendations


# Call the function with a user_ID
result = get_hybrid_recommendations("a937e585-36b0-43a3-9c7b-a460c9024162")

result.to_csv("D:/Datasets/FinishedDatasets/resultData4.csv")
