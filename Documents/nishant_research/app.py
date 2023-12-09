from flask import Flask, request, jsonify
import pandas as pd
import joblib
from flask_cors import CORS 
import json

app = Flask(__name__)
CORS(app)

# Load the data and model
print("Loading data...")
df_final_encoded = pd.read_csv('df_encoded.csv')
print("Loading KNN model...")
knn_model = joblib.load('knn_model.joblib')

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.data  ##was request.json
    my_json = data.decode('utf8').replace("'",'"')
    data =  json.loads(my_json)
    print("Received data:", data)

    property_ids = data.get('property_ids', [])
    print("Property IDs:", property_ids)

    try:
        if not property_ids:
            raise ValueError("No property IDs provided.")

        all_recommended_ids = set()  # To store unique recommendations
        for property_id in property_ids:
            if property_id in df_final_encoded['propertyID'].values:
                property_index = df_final_encoded[df_final_encoded['propertyID'] == property_id].index[0]
                test_property = df_final_encoded.loc[[property_index]]
                _, indices = knn_model.kneighbors(test_property)
                recommended_indices = indices.flatten()
                recommended_ids = df_final_encoded.iloc[recommended_indices]['propertyID'].tolist()
                all_recommended_ids.update(recommended_ids)
            else:
                print(f"Property ID {property_id} not found in the dataset.")

        return jsonify({"recommended_property_ids": list(all_recommended_ids)})

    except Exception as e:
        error_message = str(e)
        print("Error:", error_message)
        return jsonify({"error": error_message}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


