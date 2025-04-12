from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/')
def home():
    return "Backend läuft ja wirklich!"