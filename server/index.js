const express = require('express');
const app = express();
const port = 5000;
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/data2', require('./routes/rooms'));
app.use('/api/visitor', require('./routes/chartinfo'));


const http = require('http');
const { v4: uuidv4} = require('uuid');
const cors = require('cors');
const twilio = require('twilio');

const server = http.createServer(app);

app.use(cors());

let connectedUsers = [];
let rooms = []; //active room

// create route to check if room exists

app.get('/api/room-exists/:roomId', (req,res)=> {
    const { roomId } = req.params;
    const room = rooms.find(room => room.id === roomId);

    if(room){
        // send response that room exists
        if(room.connectedUsers.length > 3){
            return res.send({ roomExists: true, full: true});
        }else{
            return res.send({ roomExists: true, full: false});
        }
    } else{
        //send response that room does not exists
        return res.send({ roomExists: false});
    }
});

app.get('/api/get-turn-credentials', (req, res) =>{
    const accountSid ='ACc60b132dea6d34c5417e9bf35328e5c0';
    const authToken = '2a1847860a04f7a74a47396ce68a4225';

    const client= twilio(accountSid, authToken);

    let responseToken = null;

    try{
        client.tokens.create().then(token =>{
            responseToken = token;
            res.send({ token });
        });
    }catch(err){
        console.log('error occured when fetching turn server credentials');
        console.log(err);
        res.send({token:null});
    }
});


const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log(`user connected ${socket.id}`);

    socket.on('create-new-room', (data)=>{
        createNewRoomHandler(data, socket);
    });

    socket.on('join-room', (data)=>{
        joinRoomHandler(data, socket);
    });

    socket.on('disconnect', () =>{
        disconnectHandler(socket);
    });
    socket.on('conn-signal', (data)=>{
        signalingHandler(data, socket);
    });
    socket.on('conn-init', (data) =>{
        initializeConnectionHandler(data, socket)
    })
    socket.on('direct-message', (data) =>{
        directMessageHandler(data, socket);
    })
});

// socket.io handlers

const createNewRoomHandler = (data, socket) =>{
    console.log('host is creating a new room');
    console.log(data);
    // get that cost identity from 'data'
    const { identity, onlyAudio} = data;

    // thanks to that we are able to generate a random id 
    const roomId = uuidv4();

    // create new user 
    const newUser = {
        identity,
        id: uuidv4(),
        socketId: socket.id,
        roomId,
        onlyAudio
    };

    // push that user to connectedUsers
    // get all previous connected users in this array, will just pass this new User
    connectedUsers = [...connectedUsers, newUser];

    // create new room
    const newRoom = {
        id: roomId,
        connectedUsers: [newUser]
    }

    // join socket.io room
    socket.join(roomId);

    rooms = [...rooms, newRoom];

    // emit to that client which created that room roomId
    socket.emit('room-id', {roomId});

    // emit an event to all users connected 
    // to that room about new users which are right in this room
    socket.emit('room-update', { connectedUsers: newRoom.connectedUsers});
};

const joinRoomHandler = (data,socket) =>{
    const { identity, roomId, onlyAudio} = data;

    const newUser = {
        identity,
        id: uuidv4(),
        socketId: socket.id,
        roomId,
        onlyAudio
    }
    // join room as user which just is trying to join room passing room id 
    const room = rooms.find(room => room.id === roomId);
    room.connectedUsers = [...room.connectedUsers, newUser];

    //join socket.io room
    socket.join(roomId);

    //add new user to connected users array
    connectedUsers = [...connectedUsers, newUser];

    // emit to all users which are already in this room to prepare peer connection.
    room.connectedUsers.forEach(user => {
        if(user.socketId !== socket.id){
            const data = {
                connUserSocketId: socket.id
            };
            io.to(user.socketId).emit('conn-prepare', data);
        }
    });

    io.to(roomId).emit('room-update', {connectedUsers: room.connectedUsers});
};

const disconnectHandler = (socket) =>{
    // find if user has been registered - if yes -remove him from room and connected users array
    const user = connectedUsers.find((user)=> user.socketId === socket.id);

    if(user){
        //remove user from room in server
        const room = rooms.find(room => room.id === user.roomId);

        // update connectedUsers array by filtering that array.
        room.connectedUsers = room.connectedUsers.filter(user => user.socketId !== socket.id);
        
        // leave socket.io room
        socket.leave(user.roomId);

        //close the room if amount of the users which will stay in room be 0
        if(room.connectedUsers.length > 0){
           // emit to all users which are still in the room that user disconnected
           // room id = users in the room
           io.to(room.id).emit('user-disconnected', { socketId: socket.id});
           
            //emit an event to rest of the users which left in the room new connected users in room
            io.to(room.id).emit('room-update', {
                connectedUsers: room.connectedUsers,
            });
        }else{
            rooms = rooms.filter(r => r.id !== room.id);
        }

    };
};

const signalingHandler = (data, socket) =>{
    const {connUserSocketId, signal} = data; 
    const signalingData = { signal, connUserSocketId: socket.id};
    io.to(connUserSocketId).emit('conn-signal', signalingData);
    //console.log(connectedUsers);
}

// information from clients which are already in room that they have prepared for incoming connection
const initializeConnectionHandler = (data, socket)=>{
    const {connUserSocketId} = data;

    const initData = {connUserSocketId: socket.id};
    io.to(connUserSocketId).emit('conn-init', initData);
}

const directMessageHandler = (data, socket) =>{
    if(connectedUsers.find(connUser=>connUser.socketId === data.receiverSocketId)){
        const receiverData = {
            authorSocketId: socket.id,
            messageContent: data.messageContent,
            isAuthor: false,
            identity: data.identity
        };
        socket.to(data.receiverSocketId).emit('direct-message', receiverData);

        const authorData = {
            receiverSocketId: data.receiverSocketId,
            messageContent: data.messageContent,
            isAuthor: true,
            identity: data.identity
        };

        socket.emit('direct-message', authorData);
    }
};

server.listen(port, () => console.log(`listening on port ${port}!`));
