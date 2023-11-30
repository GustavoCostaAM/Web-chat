document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    function sendMessage() {
        const messageInput = document.getElementById('message-input');
        const chatDisplay = document.getElementById('chat-display');

        if (messageInput.value.trim() !== '') {
            const messageText = messageInput.value.trim();

            // Adicione a mensagem localmente para evitar duplicatas
            const sentMessage = document.createElement('div');
            sentMessage.className = 'message';
            sentMessage.innerHTML = '<strong>Você:</strong> ' + messageText;
            chatDisplay.appendChild(sentMessage);
            messageInput.value = '';
            chatDisplay.scrollTop = chatDisplay.scrollHeight;

            // Enviar mensagem para o servidor
            socket.emit('chat message', messageText);
        }
    }

    // Receber mensagens do servidor
socket.on('chat message', (message) => {
    const chatDisplay = document.getElementById('chat-display');

    // Adicione a mensagem apenas se ela não existir localmente
    const existingMessages = Array.from(chatDisplay.children).map(child => child.innerHTML);
    const isDuplicate = existingMessages.some(existingMessage => existingMessage.includes(message));

    if (!isDuplicate) {
        const receivedMessage = document.createElement('div');
        receivedMessage.className = 'message';
        receivedMessage.innerHTML = message;
        chatDisplay.appendChild(receivedMessage);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }
});

    // Adicione o seguinte código para lidar com o clique no botão de enviar
    const sendButton = document.querySelector('button');
    sendButton.addEventListener('click', sendMessage);
});
