// node server which will handle our socekt.io connections
const io = require('socket.io')(8000,{
    cors:{
        origin:'*',
    }
});

const users={};
// socket.io server that listens to incoming socket connections
io.on('connection',socket =>{
    // event triggered when a new user joins
    socket.on('new-user-joined',name =>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    // event triggered when a user sends a message
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message : message,name : users[socket.id]});
    });
    // event triggered when a user leaves chat
    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
});
