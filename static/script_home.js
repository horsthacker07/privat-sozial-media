$(document).ready(function() {
    var socket = io({ transports: ['websocket'], upgrade: false });

    socket.on('connect', function() {
        console.log("Socket connected!");
        socket.send("User connected!");
    });

    socket.on('message', function(data) {
        console.log("Nachricht empfangen:", data);
        $('#messages_new').append($('<p>').text(data));
    });

    $('#chatForm').on('submit', function(e) {
        e.preventDefault(); // verhindert Seitenreload
        const message = $('#message').val();
        if (message) {
            socket.send(message);
            $('#message').val('');
            console.log("gesendet!!!");
        }
    });
});