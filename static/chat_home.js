// Verbindung zum Socket.IO-Server aufbauen
const socket = io();

// Wenn eine Nachricht vom Server kommt, im Chat anzeigen
socket.on('message', function(msg) {
    const chatBox = document.getElementById('chat-box');
    const p = document.createElement('p');
    p.textContent = msg;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight; // Immer nach unten scrollen
});

// Wenn das Formular abgeschickt wird (Enter oder Button)
document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Seite nicht neuladen
    const msgInput = document.getElementById('message');
    const msg = msgInput.value.trim();

    if (msg !== '') {
        socket.emit('message', msg); // Nachricht senden
        msgInput.value = ''; // Eingabefeld leeren
    }

    msgInput.focus(); // Cursor bleibt im Eingabefeld
});