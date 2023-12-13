import pymysql
import pandas as pd
import numpy as np
from geopy.distance import geodesic

# Configuration Values
endpoint = 'myhmedb.cdc3elu6ufgt.eu-west-1.rds.amazonaws.com'
username = 'admin'
password = 'PassCondria123'
database_name = "hmedbmain"

# Connection
connection = pymysql.connect(host=endpoint, user=username, passwd=password, db=database_name)

# Function to calculate Haversine distance between two sets of coordinates

# Function to calculate Haversine distance between two sets of coordinates
def haversine(coord1, coord2):
    return geodesic(coord1, coord2).km

def convert_point_string_to_tuple(point_str):
    # Extract coordinates from the string and convert them to floats
    coordinates = point_str.replace('POINT(', '').replace(')', '').split()
    return tuple(map(float, coordinates))

def handler(target_propertyID):

    cursor = connection.cursor()

    # Find the neighbourhood of the propertyID
    query = '''
    SELECT mi.propertyID, ST_AsText(a.geoLocation) AS geoLocationString
    FROM MainInformation mi
    JOIN Addresses a ON mi.addressID = a.addressID
    '''
    cursor.execute(query)

    data = cursor.fetchall()

    columns = [desc[0] for desc in cursor.description]  # Extract column names
    df = pd.DataFrame(data, columns=columns)

    target_row = df[df['propertyID'] == target_propertyID].iloc[0]
    target_location = convert_point_string_to_tuple(target_row['geoLocationString'])

    # Calculate Haversine distance for each row
    df6 = df[df['propertyID'] != target_propertyID]

    df['distance'] = df['geoLocationString'].apply(lambda x: haversine(target_location, convert_point_string_to_tuple(x)))

    closest_properties = df.sort_values(by='distance').head(10)

    print(closest_properties[['propertyID', 'distance']])

    return closest_properties[['propertyID', 'distance']]


handler(36428953)