from flask import Flask, render_template, jsonify, request, redirect, url_for, session
from flask_socketio import SocketIO, send
import os
import psycopg2
import ssl

print(ssl.OPENSSL_VERSION)

app = Flask(__name__)
app.secret_key = "the_secret_key"  # Muss für Sessions gesetzt sein

APP_PASSWORD = os.environ.get('APP_PASSWORD')  # Passwort aus Umgebungsvariablen lesen
DATABASE_URL = os.environ.get('DATABASE_URL')  # Datenbank-URL aus Umgebungsvariablen lesen


### Database- und Routen-Setup für messages ###

def get_db_connection():
    conn = psycopg2.connect(DATABASE_URL, sslmode='require')
    return conn


@app.route('/messages')
def get_messages():
    if not session.get('logged_in'):
        print("Unauthorized access attempt to /messages")
        return 'not allowed !!!!!!', 403
    
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT content FROM messages_db ORDER BY created_at DESC LIMIT 10;')
    rows = cur.fetchall()
    cur.close()
    conn.close()

    messages = [row[0] for row in rows][::-1]  # Umkehren für chronologische Reihenfolge

    return jsonify(messages)


### SocketIO-Setup für messages ###

socketio = SocketIO(app, cors_allowed_origins="*", async_mode="eventlet")

@socketio.on('message')
def handle_message(message):
    print("Received message: " + message)

    if message != "User connected!":
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('INSERT INTO messages_db (content) VALUES (%s);', (message,))
        conn.commit()
        cur.close()
        conn.close()
        print("Message saved to database.")

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