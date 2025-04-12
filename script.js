// Funktion, um die Benutzerliste zu laden
async function loadMessanges() {
    try {
        const response = await fetch('https://private-sozial-media.onrender.com/global_chat_db');
        const data = await response.json();

        const global_chat = document.getElementById('global_chat');
        global_chat.innerHTML = ''; // Liste leeren

        // Benutzer in die Liste einfügen
        data.global_chat.forEach(global_chat => {
            const listItem = document.createElement('li');
            listItem.textContent = user.name; // message anzeigen
            global_chat.appendChild(listItem);
        });
    } catch (error) {
        console.error('Fehler beim Laden der messanges:', error);
    }
}

// Benutzerliste beim Laden der Seite abrufen
window.onload = loadMessanges;