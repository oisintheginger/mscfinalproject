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
    lat1, lon1 = coord1
    lat2, lon2 = coord2
    return geodesic((lat1, lon1), (lat2, lon2)).kilometers

def extract_coordinates(point_str):
    # Extracting latitude and longitude from the "POINT (lat lon)" format
    match = re.match(r"POINT \(([-+]?\d+\.\d+) ([-+]?\d+\.\d+)\)", point_str)
    if match:
        return float(match.group(1)), float(match.group(2))
    else:
        raise ValueError("Invalid coordinate format")

def find_nearest_locations(target_coord, all_coords):
    # Calculate distances using Haversine formula and sort the coordinates
    distances = [(haversine(target_coord, extract_coordinates(coord)), coord) for coord in all_coords]
    distances.sort()

    # Return the 10 nearest locations
    return distances[:10]

def handler(propertyID):

    cursor = connection.cursor()

    # Find the neighbourhood of the propertyID
    query = 'SELECT mi.propertyID, a.geoLocation FROM MainInformation mi JOIN Addresses a'
    cursor.execute(query)

    data = cursor.fetchall()

    columns = [desc[0] for desc in cursor.description]  # Extract column names
    df = pd.DataFrame(data, columns=columns)

   print(df)
   print(propertyID)
   target = df.loc[df['propertyID'] == propertyID, 'geoLocation'].iloc[0]
   print(target)
 

handler("36428953")