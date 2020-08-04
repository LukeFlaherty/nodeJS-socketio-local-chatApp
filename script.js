// all client side JS

const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
// ourform for the event listener
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')


const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)



socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})


socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})


socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})


// stops form from posting to the server and shops it from refreshing 
// this stops us from losing all previous chat messages
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
//   sends the message value above 
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})



function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}