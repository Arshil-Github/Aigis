from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# Load model
crime_model = joblib.load("CrimeLocationPrediction.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        lat = data['lat']
        lng = data['lng']

        # Create a DataFrame with input data
        new_data = pd.DataFrame([[lat, lng]], columns=["Latitude", "Longitude"])
        
        # Predict danger level
        danger = crime_model.predict(new_data)[0]
        
        return jsonify({'danger_level': float(danger)})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5000, debug=True)
