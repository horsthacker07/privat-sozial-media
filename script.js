// Funktion, um die Nachrichtenliste zu laden
async function loadMessages() {
    try {
        const response = await fetch('/global_chat_db'); // Relativer Endpunkt
        const data = await response.json();

        const chatList = document.getElementById('global_chat');
        chatList.innerHTML = ''; // Liste leeren

        // Nachrichten in die Liste einfügen
        data.global_chat_db.forEach(message => {
            const listItem = document.createElement('li');
            listItem.textContent = message; // Nachricht anzeigen
            chatList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Fehler beim Laden der Nachrichten:', error);
    }
}

// Nachrichtenliste beim Laden der Seite abrufen
window.onload = loadMessages;

// Nachrichtenliste alle 5 Sekunden aktualisieren
setInterval(loadMessages, 5000);