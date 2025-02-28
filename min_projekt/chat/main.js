const messageForm = document.getElementById("message-form")
const messageInput = document.getElementById("message-input")
const messageContainer = document.getElementById("message-container")

const messageArray = []

function createMessage(message) {
    const messageDiv = document.createElement('div')
    messageDiv.className = "message"
    const messageP = document.createElement('p')
    messageP.textContent = message
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