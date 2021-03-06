const express = require('express');
const app = express();
const port = 5000;
const oracledb = require('oracledb');
const dbConfig = require('./config/dbConfig');
const twilioConfig = require('./config/twilioConfig');
oracledb.autoCommit = true;


const http = require('http');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const twilio = require('twilio');
// const e = require('express');
const server = http.createServer(app);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


let connectedUsers = [];
let rooms = []; //active room

// create route to check if room exists

//oracle setting

//oracle release
function doRelease(connection) {
    connection.release(function (err) {
        if (err) {
            console.error(err.message);
        }
    });
}


app.get('/api/room-exists/:roomId', (req, res) => {
    //express가 room-exists 이후에 오는 값 {roomId} 받아오면 캡쳐해서
    // req.params에 저장 
    const { roomId } = req.params;
    const room = rooms.find(room => room.id === roomId);

    if (room) {
        // send response that room exists
        if (room.connectedUsers.length > 3) {
            return res.send({ roomExists: true, full: true });
        } else {
            return res.send({ roomExists: true, full: false });
        }
    } else {
        //send response that room does not exists
        return res.send({ roomExists: false });
    }
});

app.get('/api/get-turn-credentials', (req, res) => {
    const accountSid = twilioConfig.TWILIO_ACCOUNT_SID;
    const accountToken = twilioConfig.TWILIO_AUTH_TOKEN;
    console.log("accountToken on twilloConfig:  ", accountToken);
    console.log(accountSid);

    const client = new twilio(accountSid, accountToken);
    let responseToken = null;

    try {
        client.tokens.create().then(token => {
            responseToken = token;
            res.send({ token });
        });
    } catch (err) {
        console.log('error occured when fetching turn server credentials');
        console.log(err);
        res.send({ token: null });
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

    //방만들기 부분 소켓으로 데이터 받아옴
    socket.on('create-new-room', (data) => {
        createNewRoomHandler(data, socket);
    });

    socket.on('join-room', (data) => {
        joinRoomHandler(data, socket);
    });

    socket.on('disconnect', () => {
        disconnectHandler(socket);
    });
    socket.on('conn-signal', (data) => {
        signalingHandler(data, socket);
    });
    socket.on('conn-init', (data) => {
        initializeConnectionHandler(data, socket)
    })
    socket.on('direct-message', (data) => {
        directMessageHandler(data, socket);
    })
    socket.on('send-stt', (data) => {
        sendSttHandler(data, socket)
    })
});

// socket.io handlers

const createNewRoomHandler = (data, socket) => {
    // get that cost identity from 'data'
    const { identity, onlyAudio, user_seq } = data;
    console.log("!data.myRoomId" + !data.myRoomId)
    // thanks to that we are able to generate a random id 

    // 단일 느낌표(!) — 논리 부정 연산자
    // !1  false
    // !-1  false
    // !0  true
    // !function() {}  false
    // !{}  false
    // !''  true
    // !NaN  true
    // !null  true
    // !undefined  true
    if (!data.myRoomId) {
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

        rooms = [...rooms, newRoom]; //rooms - room - roomId, connectedusers

        // emit to that client which created that room roomId
        socket.emit('room-id', { roomId });

        // createNewRoomHandler 값 받아서 룸아이디 insert 테스트
        const room_name = data.roomNameValue
        const insertarray = [roomId, user_seq, room_name];
        const insertarray2 = [roomId, user_seq];
        // room-id 테이블에 저장
        oracledb.getConnection(dbConfig, (err, conn) => {
            roomNameInsert(err, conn);
        });
        function roomNameInsert(err, connection) {
            if (err) {
                console.error(err.message);
                console.log("데이터 가져오기 실패");
                return;
            }
            connection.execute("insert into room_table (ROOM_ID,USER_SEQ,ROOM_NAME,ROOM_DATE) values(:roomId,:user_seq,:room_name,SYSDATE)", insertarray, function (err, result) {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
                connection.execute("insert into timeuse_table (TIMEUSE_SEQ, ROOM_ID, USER_SEQ, ROOMSTART_DATE) values(TIMEUSE_SEQ.NEXTVAL,:roomId,:user_seq,SYSDATE)", insertarray2, function (err, result2) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                });
                console.log(result);
                doRelease(connection);
            });
        }
        // emit an event to all users connected 
        // to that room about new users which are right in this room
        socket.emit('room-update', { connectedUsers: newRoom.connectedUsers });
    } else {
        const roomId = data.myRoomId;
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

        rooms = [...rooms, newRoom]; //rooms - room - roomId, connectedusers

        // emit to that client which created that room roomId
        console.log("roomId::: " + roomId);
        socket.emit('room-id', { roomId });

        // createNewRoomHandler 값 받아서 룸아이디 insert 테스트

        // const room_name=data.roomNameValue
        // const insertarray = [roomId, user_seq, room_name];

        // emit an event to all users connected 
        // to that room about new users which are right in this room
        socket.emit('room-update', { connectedUsers: newRoom.connectedUsers });
    }
};

const joinRoomHandler = (data, socket) => {
    const { identity, roomId, onlyAudio, user_seq } = data;
    const roomselectarray = [roomId];
    let joinuser_seq = 0
    let joinroom_name = ""
    let joinroominsertarray = []
    let joinroominsertarray2 = []

    if (!data.myRoomId) {
        oracledb.getConnection(dbConfig, (err, conn) => {
            roomTableSearch(err, conn);
        });
        function roomTableSearch(err, connection) {
            if (err) {
                console.error(err.message);
                console.log("데이터 가져오기 실패");
                return;
            } else {
                connection.execute("SELECT ROOM_NAME FROM ROOM_TABLE WHERE ROOM_ID=:roomId", roomselectarray, { outFormat: oracledb.OBJECT }, function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    joinuser_seq = data.user_seq
                    joinroom_name = result.rows[0].ROOM_NAME
                    joinroominsertarray = [joinuser_seq, roomId, joinroom_name]
                    joinroominsertarray2 = [joinuser_seq, roomId,]
                    connection.execute("insert into roomjoin_table (ROOMJOIN_SEQ,USER_SEQ,ROOM_ID,ROOM_NAME,ROOMJOIN_DATE) values(ROOMJOIN_SEQ.NEXTVAL,:joinuser_seq,:roomId,:joinroom_name,SYSDATE)", joinroominsertarray, function (err, result2) {
                        if (err) {
                            console.error(err.message);
                            doRelease(connection);
                            return;
                        }
                        connection.execute("insert into timeuse_table (TIMEUSE_SEQ,USER_SEQ,ROOM_ID,ROOMSTART_DATE) values(TIMEUSE_SEQ.NEXTVAL,:joinuser_seq,:roomId,SYSDATE)", joinroominsertarray2, function (err, result2) {
                            if (err) {
                                console.error(err.message);
                                doRelease(connection);
                                return;
                            }

                            doRelease(connection);
                        });
                    });
                });
            }
        }
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
            if (user.socketId !== socket.id) {
                const data = {
                    connUserSocketId: socket.id
                };
                io.to(user.socketId).emit('conn-prepare', data);
            }
        });

        io.to(roomId).emit('room-update', { connectedUsers: room.connectedUsers });
    } else {
        console.log("data.myRoomId ::: " + data.myRoomId)

        const myRoomId = data.myRoomId

        console.log("myRoomId ::: " + myRoomId)
        const newUser = {
            identity,
            id: uuidv4(),
            socketId: socket.id,
            roomId,
            onlyAudio
        }
        // join room as user which just is trying to join room passing room id 
        const room = rooms.find(room => room.id === myRoomId);
        room.connectedUsers = [...room.connectedUsers, newUser];

        //join socket.io room
        socket.join(myRoomId);

        //add new user to connected users array
        connectedUsers = [...connectedUsers, newUser];

        // emit to all users which are already in this room to prepare peer connection.
        room.connectedUsers.forEach(user => {
            if (user.socketId !== socket.id) {
                const data = {
                    connUserSocketId: socket.id
                };
                io.to(user.socketId).emit('conn-prepare', data);
            }
        });

        io.to(myRoomId).emit('room-update', { connectedUsers: room.connectedUsers });
    }
};

const disconnectHandler = (socket) => {
    // find if user has been registered - if yes -remove him from room and connected users array
    const user = connectedUsers.find((user) => user.socketId === socket.id);

    if (user) {
        //remove user from room in server
        const room = rooms.find(room => room.id === user.roomId);

        // update connectedUsers array by filtering that array.
        room.connectedUsers = room.connectedUsers.filter(user => user.socketId !== socket.id);

        // leave socket.io room
        socket.leave(user.roomId);

        //close the room if amount of the users which will stay in room be 0
        if (room.connectedUsers.length > 0) {
            // emit to all users which are still in the room that user disconnected
            // room id = users in the room
            io.to(room.id).emit('user-disconnected', { socketId: socket.id });

            //emit an event to rest of the users which left in the room new connected users in room
            io.to(room.id).emit('room-update', {
                connectedUsers: room.connectedUsers,
            });
        } else {
            rooms = rooms.filter(r => r.id !== room.id);
        }

    };
};

const signalingHandler = (data, socket) => {
    const { connUserSocketId, signal } = data;
    const signalingData = { signal, connUserSocketId: socket.id };
    io.to(connUserSocketId).emit('conn-signal', signalingData);
}

// information from clients which are already in room that they have prepared for incoming connection
const initializeConnectionHandler = (data, socket) => {
    const { connUserSocketId } = data;

    const initData = { connUserSocketId: socket.id };
    io.to(connUserSocketId).emit('conn-init', initData);
}

const directMessageHandler = (data, socket) => {
    if (connectedUsers.find(connUser => connUser.socketId === data.receiverSocketId)) {
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

const sendSttHandler = (data, socket) => {
    // 자기빼고 나머지한테 transcript 전송
    // data 값 = { socketId, transcript }    
    const users = connectedUsers.filter(connUser => connUser.socketId !== data.socketId);
    users.forEach(user => {
        socket.to(user.socketId).emit('conn-stt', data);
        console.log(user);
    });
    console.log(data);
}

server.listen(port, () => console.log(`listening on port(chat) ${port}!`));
