const socket = io();

socket.on('message', function(msg) {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<p>${msg}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
});

function sendMessage() {
    const msgInput = document.getElementById('message');
    const msg = msgInput.value;
    socket.emit('message', msg);
    msgInput.value = '';
}