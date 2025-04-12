from flask import Flask, render_template, jsonify, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = "the_secret_key"  # Muss für Sessions gesetzt sein

# Fesetgelegtes Passwort
PASSWORD = "secret_password"

# JSON-Datenbank für global-chat
global_chat = []


@app.route('/global_chat_db', methods=['GET'])
def get_messages():
    return jsonify(global_chat_db=global_chat)


@app.route('/global_chat_db', methods=['POST'])
def add_message():
    message = request.form['message']
    if message:
        global_chat.append(message)
    #return redirect(url_for('global_chat_db'))


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