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

// Funktion, um eine Nachricht zu senden
async function sendMessage(event) {
    event.preventDefault(); // Verhindert das Neuladen der Seite

    const messageInput = document.querySelector('input[name="message"]');
    const message = messageInput.value.trim();

    if (message) {
        try {
            const response = await fetch('/global_chat_db', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ message })
            });

            if (response.ok) {
                messageInput.value = ''; // Eingabefeld leeren
                loadMessages(); // Nachrichtenliste aktualisieren
            } else {
                console.error('Fehler beim Senden der Nachricht:', response.statusText);
            }
        } catch (error) {
            console.error('Fehler beim Senden der Nachricht:', error);
        }
    }
}

// Nachrichtenliste beim Laden der Seite abrufen
window.onload = loadMessages;

// Nachrichtenliste alle 5 Sekunden aktualisieren
setInterval(loadMessages, 5000);

// Event-Listener für das Formular hinzufügen
const form = document.querySelector('form');
form.addEventListener('submit', sendMessage);