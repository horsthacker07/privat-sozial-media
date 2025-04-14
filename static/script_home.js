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
*/

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
            if (length > 50) {
                alert("Die Nachricht ist zu lang! (max. 50 Zeichen)");
            }            
            else {
                // Nachricht an den Server senden
                socket.send(message);
                $('#message').val('');
                console.log("gesendet!!!");
            }

            socket.send(message);
            $('#message').val('');
            console.log("gesendet!!!");
        }
    });
});