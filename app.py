from flask import Flask, request, jsonify, make_response
from flask_cors import CORS

from database import init_db
from models import SensorData


app = Flask(__name__)
app.debug = True
CORS(app)

# endpoint for front end user to post a message
'''
POST /api/sensor-data
{
    "temperature": <float> (required)
    "humidity": <float> (required)
    "light": <int> (required)
    "moisture": <int> (required)
    "sensor_uuid": <string> (required)
}
The backend is going to take sensor data and store with timestamp
'''
@app.route('/api/sensor-data', methods=['POST'])
def post_sensor_data():
    val = request.get_json()
    sensor_data = SensorData(temperature=val['temperature'], humidity=val['humidity'], light=val['light'], moisture=val['moisture'])
    sensor_data.save()
    return sensor_data.to_json(), 201

if __name__ == "__main__":
    with app.app_context():
        app.run(port=5000, debug=True)