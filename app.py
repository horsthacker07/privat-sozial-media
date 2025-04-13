from flask import Flask, render_template, jsonify, request, redirect, url_for, session
from flask_socketio import SocketIO, send
import os

app = Flask(__name__)
app.secret_key = "the_secret_key"  # Muss für Sessions gesetzt sein

APP_PASSWORD = os.environ.get('APP_PASSWORD')  # Passwort aus Umgebungsvariablen lesen


### SocketIO-Setup für messages ###

socketio = SocketIO(app, cors_allowed_origins="*", async_mode="eventlet")

@socketio.on('message')
def handle_message(message):
    print("Received message: " + message)
    if message != "User connected!":
        send(message, broadcast=True)


### ab hier sind die Routen für Websites/login/logout ###

@app.route('/')
def root():
    if session.get('logged_in'):
        return redirect(url_for('home'))
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    if request.form['password'] == APP_PASSWORD:
        session['logged_in'] = True
        return redirect(url_for('home'))
    else:
        return render_template('login.html', error="Falsches Passwort.")

@app.route('/home')
def home():
    if not session.get('logged_in'):
        return redirect(url_for('root'))
    return render_template('home.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('root'))

@app.route('/privacy')
def privacy():
    return render_template('privacy.html')

@app.route('/legal_status')
def legal_status():
    return render_template('legal_status.html')


if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=5000)