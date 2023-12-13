from geopy.distance import geodesic
import re
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

def haversine(coord1, coord2):
    # Haversine formula to calculate distance between two coordinates
    lat1, lon1 = coord1
    lat2, lon2 = coord2
    R = 6371  # Earth radius in kilometers
    dlat = np.radians(lat2 - lat1)
    dlon = np.radians(lon2 - lon1)
    a = np.sin(dlat / 2) ** 2 + np.cos(np.radians(lat1)) * np.cos(np.radians(lat2)) * np.sin(dlon / 2) ** 2
    c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a))
    distance = R * c
    return distance

def extract_coordinates(point_str):
    # Extracting latitude and longitude from the "POINT (lat lon)" format
    match = re.match(r"POINT \((-?\d+\.\d+) (-?\d+\.\d+)\)", point_str)
    if match:
        return float(match.group(1)), float(match.group(2))
    else:
        raise ValueError("Invalid coordinate format")

def find_nearest_propertyIDs(target_coord, df, num_neighbors=10):
    # Calculate distances using Haversine formula
    df['Distance'] = df['geoLocation'].apply(lambda x: haversine(target_coord, extract_coordinates(x)))
    
    # Sort DataFrame by distance and select the nearest propertyIDs
    nearest_propertyIDs = df.nsmallest(num_neighbors, 'Distance')['propertyID']
    
    return nearest_propertyIDs

def handler(propertyID):

    cursor = connection.cursor()

    # Find the neighbourhood of the propertyID
    query = '''
    SELECT mi.propertyID, a.geoLocation
    FROM MainInformation mi
    JOIN Addresses a ON mi.addressID = a.addressID
    '''
    cursor.execute(query)

    data = cursor.fetchall()

    columns = [desc[0] for desc in cursor.description]  # Extract column names
    df = pd.DataFrame(data, columns=columns)

    target = df.loc[df['propertyID'] == propertyID, 'geoLocation'].iloc[0]
    coord_list = df[df['propertyID'] != propertyID]

    result_df = find_nearest_locations(target, coord_list["geoLocation"])


handler(36428953)