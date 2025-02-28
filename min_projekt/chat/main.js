const chatContainer = document.getElementById('chat-container')
const messageForm = document.getElementById("message-form")
const messageInput = document.getElementById("message-input")
const messageContainer = document.getElementById("message-container")

const loginContainer = document.getElementById('login-container')
const loginForm = document.getElementById('login-form')
const usernameInput = document.getElementById('username-input')

let username = ""

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    username = usernameInput.value
    loginContainer.classList.add('hidden')
    chatContainer.classList.remove('hidden')
})

function createMessage(message) {
    const messageDiv = document.createElement('div')
    messageDiv.className = "message"
    const messageP = document.createElement('p')
    messageP.textContent = `${username}: ${message}`
    messageDiv.appendChild(messageP)
    return messageDiv
}

function appendToMessageContainer(element) {
    messageContainer.appendChild(element)
}

function addMessage(message) {
    const newMessage = createMessage(message)
    appendToMessageContainer(newMessage)
}

messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const messageValue = messageInput.value
    // messageArray.push(messageValue)
    addMessage(messageValue)
    messageInput.value = null
})