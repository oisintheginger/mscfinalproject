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
            mi.bathroomsFull, mi.bathroomsHalf, mi.bedrooms,
            mi.price,
            pd.CableAvailable, pd.Clubhouse, pd.Cooling, pd.Deck, pd.Dishwasher, 
            pd.DoublePaneWindows, pd.Dryer, pd.FitnessCenter, pd.Freezer, 
            pd.garbageDisposal, pd.Gas, pd.Gated, pd.HasGarbageBin, pd.Heating, 
            pd.LaundryFeaturesHookups, pd.LaundryFeaturesInUnit, pd.LaundryFeaturesNone, 
            pd.LaundryFeaturesShared, pd.Microwave, pd.NearPublicTransit, 
            pd.OnSiteLaundryAvailable, pd.Oven, pd.Parking, pd.Patio, pd.Pets, 
            pd.Playground, pd.Pool, pd.Porch, pd.Refrigerator, 
            pd.Sauna, pd.Sewage, pd.Skylights, pd.Stove, pd.TrashCompactor, 
            pd.Washer, pd.Water, pd.WindowCoverings,
            cz.AGG_ASSAULT_Count, cz.ARSON_Count, cz.AUTO_THEFT_Count, 
            cz.BURGLARY_Count, cz.COMMON_ASSAULT_Count,
            cz.HOMICIDE_Count, cz.LARCENY_Count, cz.LARCENY_FROM_AUTO_Count, 
            cz.RAPE_Count, cz.ROBBERY_CARJACKING_Count, cz.ROBBERY_COMMERCIAL_Count, 
            cz.ROBBERY_Count, cz.SHOOTING_Count,
            ss.bankCount, ss.barCount, ss.beauty_salonCount, ss.bus_stationCount,
            ss.cafeCount, ss.fire_stationCount, ss.gymCount, ss.hospitalCount,
            ss.night_clubCount, ss.parkCount, ss.pharmacyCount, ss.police_stationCount,
            ss.restaurantCount, ss.supermarketCount, ss.train_stationCount,
            ss.transit_stationCount
        FROM 
            Addresses a
        JOIN 
            MainInformation mi ON a.addressID = mi.addressID
        JOIN 
            Neighbourhoods n ON a.neighbourhoodID = n.neighbourhoodID
        JOIN 
            PropertyDetails pd ON mi.propertyDetailsID = pd.propertyDetailsID
        JOIN 
            crime_z_scores cz ON n.neighbourhoodID = cz.neighbourhoodID
        JOIN 
            service_scores ss ON n.neighbourhoodID = ss.neighbourhoodID'''

    cursor.execute(property_details_query)
    property_details_data = cursor.fetchall()

    # Convert property details data to a DataFrame
    property_details_data_df = pd.DataFrame(property_details_data, columns=['propertyID', 'bathrooms', 'bathroomsFull', 'bathroomsHalf', 'bedrooms',
                                                                            'price', 'CableAvailable', 'Clubhouse', 'Cooling', 'Deck', 'Dishwasher',
                                                                            'DoublePaneWindows', 'Dryer', 'FitnessCenter', 'Freezer', 'garbageDisposal',
                                                                            'Gas', 'Gated', 'HasGarbageBin', 'Heating', 'LaundryFeaturesHookups',
                                                                            'LaundryFeaturesInUnit', 'LaundryFeaturesNone', 'LaundryFeaturesShared',
                                                                            'Microwave', 'NearPublicTransit', 'OnSiteLaundryAvailable', 'Oven', 'Parking',
                                                                            'Patio', 'Pets', 'Playground', 'Pool', 'Porch', 'Refrigerator', 'Sauna',
                                                                            'Sewage', 'Skylights', 'Stove', 'TrashCompactor', 'Washer', 'Water',
                                                                            'WindowCoverings', 'AGG_ASSAULT_Count', 'ARSON_Count', 'AUTO_THEFT_Count',
                                                                            'BURGLARY_Count', 'COMMON_ASSAULT_Count', 'HOMICIDE_Count', 'LARCENY_Count',
                                                                            'LARCENY_FROM_AUTO_Count', 'RAPE_Count', 'ROBBERY_CARJACKING_Count',
                                                                            'ROBBERY_COMMERCIAL_Count', 'ROBBERY_Count', 'SHOOTING_Count', 'bankCount',
                                                                            'barCount', 'beauty_salonCount', 'bus_stationCount', 'cafeCount',
                                                                            'fire_stationCount', 'gymCount', 'hospitalCount', 'night_clubCount',
                                                                            'parkCount', 'pharmacyCount', 'police_stationCount', 'restaurantCount',
                                                                            'supermarketCount', 'train_stationCount', 'transit_stationCount'])

    # Merge the two DataFrames on property_ID
    merged_data_df = pd.merge(original_data_df, property_details_data_df, left_on='propertyID', right_on='propertyID')

    # Specify the columns to be one-hot encoded
    categorical_columns = ['Cooling', 'Parking', 'Heating', 'Pets']

    # One-hot encode the specified categorical columns
    data_df = pd.get_dummies(merged_data_df, columns=categorical_columns, drop_first=True)


    # Begin by creating a DataFrame that contains unique property IDs, this line will contain one row
    user_data = data_df[data_df['id'] == user_ID].pivot_table(index='propertyID', values='click_count', aggfunc='sum').reset_index()

    user_data.to_csv("D:/Datasets/FinishedDatasets/resultData3.csv", index = False)

    # Do the same but now make the property ID as rows, the user ID as columns, and the click count as values
    other_users_data = data_df[data_df['id'] != user_ID].pivot_table(index='id', columns='propertyID', values='click_count', aggfunc='sum').fillna(0)

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

