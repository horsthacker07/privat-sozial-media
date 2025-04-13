from flask import Flask, render_template, jsonify, request, redirect, url_for, session
import os

app = Flask(__name__)
app.secret_key = "the_secret_key"  # Muss für Sessions gesetzt sein

PASSWORD = os.environ.get('APP_PASSWORD')  # Passwort aus Umgebungsvariablen lesen


### ab hier sind die Routen für home, login und logout ###

@app.route('/')
def root():
    if session.get('logged_in'):
        return redirect(url_for('home'))
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    if request.form['password'] == PASSWORD:
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