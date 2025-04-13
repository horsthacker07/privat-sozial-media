// Verbindung zum Socket.IO-Server herstellen
const socket = io();

// Neue Nachrichten vom Server empfangen
socket.on('message', function(msg) {
    const chatBox = document.getElementById('chat-box');
    const p = document.createElement('p');
    p.textContent = msg;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight; // Automatisch nach unten scrollen
});

// Formular für Nachrichtensenden abfangen
document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Verhindert Seiten-Reload

    const msgInput = document.getElementById('message');
    const msg = msgInput.value.trim(); // Leerzeichen entfernen

    if (msg !== '') {
        socket.emit('message', msg);  // Nachricht an Server senden
        msgInput.value = '';          // Eingabefeld leeren
    }

    msgInput.focus(); // Cursor bleibt im Feld
});