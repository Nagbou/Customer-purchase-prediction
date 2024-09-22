from flask import Flask, request, render_template, jsonify
import joblib
import numpy as np

app = Flask(__name__)


model = joblib.load('model.pkl')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400

    age = float(data['age'])
    gender = int(data['gender'])
    annual_income = float(data['annual_income'])
    number_of_purchases = int(data['number_of_purchases'])
    product_category = int(data['product_category'])
    time_spent_on_website = float(data['time_spent_on_website'])
    loyalty_program = int(data['loyalty_program'])
    discounts_availed = int(data['discounts_availed'])

    input_features = np.array([[age, gender, annual_income, number_of_purchases,
                                product_category, time_spent_on_website,
                                loyalty_program, discounts_availed]])


    prediction = model.predict(input_features)

    prediction_result = int(prediction[0])

    return jsonify({"prediction": prediction_result})

if __name__ == '__main__':
    app.run(debug=True)
