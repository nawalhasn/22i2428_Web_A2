// Gemini AI API key and URL (replace with actual values)
const GEMINI_API_KEY = 'AIzaSyDIPfwqZ6BT2zpEkis0Eh-Vp3r4l5y_L9E';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// DOM elements
const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Event listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Function to send message and get Gemini AI response
async function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    appendMessage('user', message);
    userInput.value = '';

    const botResponse = await fetchGeminiResponse(message);
    appendMessage('bot', botResponse);
}

// Function to fetch response from Gemini AI
async function fetchGeminiResponse(userInput) {
    if (!userInput.trim()) {
        console.error('Error: User input is empty.');
        return 'Error: Please provide a valid input.';
    }

    const requestBody = {
        contents: [{
            parts: [{
                text: userInput
            }]
        }]
    };

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error('API Error:', errorResponse);
            return `Error: ${errorResponse.error?.message || 'Something went wrong with the API.'}`;
        }

        const jsonResponse = await response.json();
        return jsonResponse.candidates[0]?.content?.parts[0]?.text || 'No content generated.';

    } catch (error) {
        console.error('Fetch Error:', error);
        return 'Error: An unexpected error occurred while fetching the response.';
    }
}

// Function to append messages to the chatbox
function appendMessage(sender, message) {
    const msgElement = document.createElement('div');
    msgElement.classList.add(sender);
    msgElement.textContent = message;
    chatbox.appendChild(msgElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}