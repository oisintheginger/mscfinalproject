import pymysql
import pandas as pd
import sys
import json
import numpy as np

# Configuration Values
endpoint = 'myhmedb.cdc3elu6ufgt.eu-west-1.rds.amazonaws.com'
username = 'admin'
password = 'PassCondria123'
database_name = "hmedbmain"


#Connection

connection = pymysql.connect(host=endpoint, user=username, passwd=password, db=database_name)

def sigmoid_mapping(x, mean, scale):
    return 1 + 4 / (1 + np.exp(-1.75 * (x - mean) / scale))

def calculate_cateogry_score(df, name):
    z_scores_df = df.copy()
    
    mean_value = z_scores_df[name].mean()
    scale_value = z_scores_df[name].std()
    
    z_scores_df[name] = sigmoid_mapping(z_scores_df[name], mean_value, scale_value)
    
    return z_scores_df

def lambda_handler(event, context):
    propertyID = event.get('propertyID')
    userID = event.get('id')

    cursor = connection.cursor()
    # Find the neighbourhood of the propertyID
    query = f'SELECT a.neighbourhoodID FROM MainInformation mi JOIN Addresses a ON mi.addressID = a.addressID WHERE mi.propertyID = {propertyID}';
    cursor.execute(query)

    # Fetch the result as a single integer
    neighbourhoodID = cursor.fetchone()[0]

    #Retrieve column names
    query = f'''
        SELECT GROUP_CONCAT(column_name) 
        FROM information_schema.columns 
        WHERE table_name = 'service_scores' 
            AND LOWER(column_name) NOT LIKE '%count%'
    '''
    cursor.execute(query)
    result = cursor.fetchone()
    columns_to_select = result[0]

    # Construct the SELECT query
    query = f'SELECT {columns_to_select} FROM service_scores'

    # Execute the SELECT query
    cursor.execute(query)

    # Fetch all rows of data
    data = cursor.fetchall()

    # Create a Pandas DataFrame
    scores = pd.DataFrame(data, columns=columns_to_select.split(','))
    print(scores)

    query = f'SELECT * FROM user WHERE id = "{userID}"'
    cursor.execute(query)
    rows = cursor.fetchall()

    column_names = [i[0] for i in cursor.description]
    user = pd.DataFrame(rows, columns=column_names)

    json_string = user["weights"][0]
    json_data = json.loads(json_string)

    combined_dict = {}
    for dictionary in json_data:
        combined_dict.update(dictionary)

    if combined_dict["finance"] is not None:
        #category
        scores["finance_score"] = scores["finance_score"] ** combined_dict["finance"]
        #individual
        scores["bank_z_score"] = scores["bank_z_score"] ** combined_dict["finance"]
    if combined_dict["transportation"] is not None:
        #category
        scores["transportation_score"] = scores["transportation_score"] ** combined_dict["transportation"]
        #individual
        scores["bus_station_z_score"] = scores["bus_station_z_score"] ** combined_dict["transportation"]
        scores["train_station_z_score"] = scores["train_station_z_score"] ** combined_dict["transportation"]
        scores["transit_station_z_score"] = scores["transit_station_z_score"] ** combined_dict["transportation"]
    if combined_dict["personal_care"] is not None:
        #category
        scores["personal_care_score"] = scores["personal_care_score"] ** combined_dict["personal_care"]
        #individual
        scores["pharmacy_z_score"] = scores["pharmacy_z_score"] ** combined_dict["personal_care"]
        scores["beauty_salon_z_score"] = scores["beauty_salon_z_score"] ** combined_dict["personal_care"]
    if combined_dict["retail"] is not None:
        #category
        scores["retail_score"] = scores["retail_score"] ** combined_dict["retail"]
        #individual
        scores["supermarket_z_score"] = scores["supermarket_z_score"] ** combined_dict["retail"]
    if combined_dict["fitness"] is not None:
        #category
        scores["fitness_score"] = scores["fitness_score"] ** combined_dict["fitness"]
        #individual
        scores["gym_z_score"] = scores["gym_z_score"] ** combined_dict["fitness"]
    if combined_dict["leisure"] is not None:
        #category
        scores["leisure_score"] = scores["leisure_score"] ** combined_dict["leisure"]
        #individual
        scores["cafe_z_score"] = scores["cafe_z_score"] ** combined_dict["leisure"]
        scores["night_club_z_score"] = scores["night_club_z_score"] ** combined_dict["leisure"]
        scores["restaurant_z_score"] = scores["restaurant_z_score"] ** combined_dict["leisure"]
        scores["park_z_score"] = scores["park_z_score"] ** combined_dict["leisure"]
    if combined_dict["emergency"] is not None:#
        #category
        scores["emergency_score"] = scores["emergency_score"] ** combined_dict["emergency"]
        #individual
        scores["police_station_z_score"] = scores["police_station_z_score"] ** combined_dict["emergency"]
        scores["fire_station_z_score"] = scores["fire_station_z_score"] ** combined_dict["emergency"]
        scores["hospital_z_score"] = scores["hospital_z_score"] ** combined_dict["emergency"]

    count_columns = scores.filter(like='Count')

    # Now update the z score columns
    z_score_columns = scores.filter(like='_z_score')

    scores['sum_z_scores'] = z_score_columns.apply(lambda row: row.sum(), axis=1)

    # Next create the weighted scores by category

    scores = calculate_cateogry_score(scores,"finance_score")
    scores = calculate_cateogry_score(scores,"transportation_score")
    scores = calculate_cateogry_score(scores,"personal_care_score")
    scores = calculate_cateogry_score(scores,"retail_score")
    scores = calculate_cateogry_score(scores,"fitness_score")
    scores = calculate_cateogry_score(scores,"leisure_score")
    scores = calculate_cateogry_score(scores,"emergency_score")


    # Finally, generate the overall score, reuse the sigmoid mapping function

    # Calculate mean and standard deviation
    mean_value = scores['sum_z_scores'].mean()
    scale_value = scores['sum_z_scores'].std()

    # Apply the sigmoid mapping


    scores['overall_score'] = sigmoid_mapping(scores['sum_z_scores'], mean_value, scale_value)

    columns_to_drop = [col for col in scores.columns if '_z_score' in col]

    print(f"neighbourhoodID = {neighbourhoodID}")
    #  Drop the selected columns
    scores = scores.drop(columns=columns_to_drop)
    scores.insert(0,"service_score_ID", scores.pop("service_score_ID"))
    scores.insert(1,"neighbourhoodID", scores.pop("neighbourhoodID"))
    filtered_scores = scores[scores['neighbourhoodID'] == neighbourhoodID]

    num_columns = filtered_scores.shape[1] - 1
    filtered_scores.insert(num_columns,"overall_score", filtered_scores.pop("overall_score"))

    return {
        'body': filtered_scores.to_json(orient='records')
    }

