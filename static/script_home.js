$(document).ready(function() {
    var socket = io({ transports: ['websocket'], upgrade: false });


    socket.on('connect', function() {
        console.log("Socket connected!");
        socket.send("User connected!");
    });

    socket.on('message', function(data) {
        console.log("Nachricht empfangen:", data);

        const box1 = $('#messages_new');

        const paragraphCount = box.find('p').length;

        // Löscht den ersten Paragraphen, wenn 10 oder mehr Paragraphen vorhanden sind
        if (paragraphCount >= 10) {
            box1.find('p').first().remove();
        }

        box1.append($('<p>').text(data));
    });


    // Alle bisherigen Nachrichten laden
    $.getJSON('/messages', function (messages) {
        const box = $('#messages_new');
        messages.forEach(function (msg) {
            box.append($('<p>').text(msg));
        });
        //nope       box.scrollTop(box[0].scrollHeight); // ganz nach unten scrollen
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