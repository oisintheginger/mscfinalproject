import pymysql
import pandas as pd
import sys
import json

# Configuration Values
endpoint = 'myhmedb.cdc3elu6ufgt.eu-west-1.rds.amazonaws.com'
username = 'admin'
password = 'PassCondria123'
database_name = "hmedbmain"


#Connection

connection = pymysql.connect(host=endpoint, user=username, passwd=password, db=database_name)

def handler(id):
    cursor = connection.cursor()

    cursor.execute('SELECT * FROM service_scores')
    rows = cursor.fetchall()

    column_names = [i[0] for i in cursor.description]
    scores = pd.DataFrame(rows, columns=column_names)

    query = f'SELECT * FROM user WHERE id = "{id}"'
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
        print(scores["bankCount"])



    return {
        'statusCode': 200,
        'body': scores.to_json(orient='records')
    }

if __name__ == "__main__":
    # Check if an argument is provided
    if len(sys.argv) != 2:
        print("Usage: python handler.py <id>")
        sys.exit(1)

    # Extract the ID from the command-line argument
    id_argument = sys.argv[1]

    # Call the handler function with the provided ID
    handler(id_argument)