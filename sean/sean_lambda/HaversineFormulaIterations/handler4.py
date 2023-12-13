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
    binary_points_df = df['geoLocation']
    target_location  = df.loc[df['propertyID'] == propertyID, 'geoLocationString'].iloc[0]
    points = []
    for binary_point in binary_points_df:
        try:
            point = loads(binary_point)
            points.append(point)
        except Exception as e:
            print(f"Error loading point: {e}")

    # The point for which you want to find the nearest neighbors
    target_point = Point(0, 0)  # Replace with your actual target point

    # Find the nearest points
    nearest_points = sorted(points, key=lambda x: x.distance(target_point))

    # Print the nearest points
    for i, point in enumerate(nearest_points):
        print(f"Nearest Point {i + 1}: {point}")
handler(36428953)