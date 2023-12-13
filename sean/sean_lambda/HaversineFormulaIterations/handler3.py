import pymysql
import pandas as pd
import numpy as np
from geopy.distance import geodesic
import pandas as pd
import mysql.connector

# Configuration Values
endpoint = 'myhmedb.cdc3elu6ufgt.eu-west-1.rds.amazonaws.com'
username = 'admin'
password = 'PassCondria123'
database_name = "hmedbmain"

# Connection
connection = pymysql.connect(host=endpoint, user=username, passwd=password, db=database_name)

# Function to calculate Haversine distance between two sets of coordinates
def haversine(coord1, coord2):
    return geodesic(coord1, coord2).km

def convert_to_tuple(coord_str):
    return tuple(map(float, coord_str.strip('()').split(',')))

def convert_point_string_to_tuple(point_str):
    # Extract coordinates from the string and convert them to floats
    coordinates = point_str.replace('POINT(', '').replace(')', '').split()
    return tuple(map(float, coordinates)) 

def handler(propertyID):

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

    target_location  = df.loc[df['propertyID'] == propertyID, 'geoLocationString'].iloc[0]
    df['target_location'] = target_location
    coord_list = df[df['propertyID'] != propertyID]

handler(36428953)