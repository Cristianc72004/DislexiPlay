let isDragging = false;
let initialX;
let initialY;
let chatbox;

function initializeChatbot() {
    // Crear el chatbox y añadir contenido inicial
    chatbox = document.createElement('div');
    chatbox.classList.add('chatbox');
    chatbox.innerHTML = `
        <div id="faq-list">
            <button class="faq-button" onclick="describeGame()">¿Qué tengo que hacer?</button>
            <button class="faq-button" onclick="howToPlay()">¿Cómo jugar?</button>
        </div>
    `;
    document.body.appendChild(chatbox);

    // Event listeners para el arrastre
    chatbox.addEventListener('mousedown', e => {
        isDragging = true;
        initialX = e.clientX - chatbox.getBoundingClientRect().left;
        initialY = e.clientY - chatbox.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', e => {
        if (isDragging) {
            const newX = e.clientX - initialX;
            const newY = e.clientY - initialY;
            chatbox.style.left = `${newX}px`;
            chatbox.style.top = `${newY}px`;
        }
    });
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

function describeGame() {
    sendMessage('El objetivo del juego es adivinar la fruta a partir de la descripción dada. Escribe la respuesta correcta en el campo de entrada y haz clic en "Enviar".');
}

function howToPlay() {
    sendMessage('Para jugar, lee la descripción de la fruta en la zona de juego, escribe tu respuesta en el campo de entrada y haz clic en "Enviar". Tienes 30 segundos para adivinar cada fruta.');
}

function sendMessage(message) {
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message');
    chatMessage.textContent = message;
    chatbox.appendChild(chatMessage);
    chatbox.scrollTop = chatbox.scrollHeight; // Hacer scroll al último mensaje
}

function sendResponse(correct, word) {
    const response = correct ? `¡Correcto! La palabra era: ${word}` : `Incorrecto. La palabra era: ${word}`;
    sendMessage(response);
}

// Inicializar el chatbot
initializeChatbot();
