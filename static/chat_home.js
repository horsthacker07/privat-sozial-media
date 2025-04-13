const socket = io();

socket.on('message', function(message) {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<p>${message}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
});

function sendMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value;
    socket.emit('message', message);
    messageInput.value = '';
}