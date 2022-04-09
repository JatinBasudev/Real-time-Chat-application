const socket=io('http://localhost:8000');

// getting form input,and message container from DOM
const form = document.getElementById('send-container');
const messageInput=document.getElementById('messageinp');
const messagecontainer=document.querySelector('.container');
var audio= new Audio('ting.mp3');

// append function to append a message into the message container
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerHTML=message;
    messageElement.classList.add(position);
    messageElement.classList.add('message');
    messagecontainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}
// event lister when the user clicks on send button 
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`you : ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
});

// getting the user's name
const Name=prompt("enter your name to join");
// emitting an event in nodejs server
socket.emit('new-user-joined',Name);

// event triggered(from server) when a user joins a chat
socket.on('user-joined',name =>{
    append(`${name} joined the chat`,'left');
});
//  event triggered when user recieves a message
socket.on('recieve',data=>{
    append(`${data.name}: ${data.message}`,'left')
});
// event triggered when user leaves a chat
socket.on('left',name=>{
    append(`${name} has left the chat`,'left');
});

