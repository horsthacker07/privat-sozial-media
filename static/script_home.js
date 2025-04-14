/*
$(document).ready(function() {
    var socket = io({ transports: ['websocket'], upgrade: false });

/*
    socket.on('connect', function() {
        console.log("Socket connected!");
        socket.send("User connected!");
    });

    socket.on('message', function(data) {
        console.log("Nachricht empfangen:", data);
        $('#messages_new').append($('<p>').text(data));
    });


    // Alle bisherigen Nachrichten laden
    $.getJSON('/messages', function (messages) {
        const box = $('#messages_new');
        messages.forEach(function (msg) {
            box.append($('<p>').text(msg));
        });
        //nope       box.scrollTop(box[0].scrollHeight); // ganz nach unten scrollen
    });

    socket.on('connect', function () {
        console.log("Socket connected!");
    });

    socket.on('message', function (data) {
        const box = $('#messages_new');
        box.append($('<p>').text(data));
        //nope      box.scrollTop(box[0].scrollHeight);
    });


    $('#chatForm').on('submit', function(e) {
        e.preventDefault(); // verhindert Seitenreload
        const message = $('#message').val();
        length = message.length;
        if (message) {
            if (length > 200) {
                alert("Die Nachricht ist zu lang! (max. 200 Zeichen)");
            } else {
                // Nachricht an den Server senden
                socket.send(message);
                $('#message').val('');
                console.log("gesendet!!!");
            }
        }
    });
});
*/


$(document).ready(function() {
    var socket = io({ transports: ['websocket'], upgrade: false });

    // Alle bisherigen Nachrichten laden
    $.getJSON('/messages', function(messages) {
        const box = $('#messages_new');
        messages.forEach(function(msg) {
            box.append($('<p>').text(msg));
        });
        // Scrollen zum unteren Ende der Nachrichten
        box.scrollTop(box[0].scrollHeight);
    });

    socket.on('connect', function() {
        console.log("Socket connected!");
    });

    // Wenn der Server eine neue Nachricht sendet oder die Nachrichtenliste aktualisiert
    socket.on('update_messages', function(messages) {
        const box = $('#messages_new');
        // Die Nachrichtenliste leeren und mit den neuen Nachrichten füllen
        box.empty();
        messages.forEach(function(msg) {
            box.append($('<p>').text(msg));
        });
        // Scrollen zum unteren Ende der Nachrichten
        box.scrollTop(box[0].scrollHeight);
    });

    $('#chatForm').on('submit', function(e) {
        e.preventDefault(); // Verhindert Seitenreload
        const message = $('#message').val();
        const length = message.length;
        if (message) {
            if (length > 200) {
                alert("Die Nachricht ist zu lang! (max. 200 Zeichen)");
            } else {
                // Nachricht an den Server senden
                socket.send(message);
                $('#message').val(''); // Eingabefeld leeren
                console.log("gesendet!!!");
            }
        }
    });
});