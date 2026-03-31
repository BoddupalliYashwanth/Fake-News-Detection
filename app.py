from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model
model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    news = data["news"]

    # Convert text
    vec = vectorizer.transform([news])

    # Predict
    result = model.predict(vec)[0]

    return jsonify({
        "prediction": result
    })

if __name__ == "__main__":
    app.run(debug=True)