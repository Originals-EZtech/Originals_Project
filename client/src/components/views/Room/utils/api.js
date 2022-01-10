import axios from 'axios';
const serverip = require('./config/ipconfig');
//const serverApi = 'http://localhost:5000/api';
console.log("serverip"+serverip);
console.log("serverip.server"+serverip.server);
const serverApi = serverip.server+'/api';

export const getRoomExists = async (roomId) => {
    const response = await axios.get(`${serverApi}/room-exists/${roomId}`);
    console.log("(1roomId"+roomId)
    return response.data;
};

export const getTURNCredentials = async () =>{
    const response = await axios.get(`${serverApi}/get-turn-credentials`);
    return response.data;
};
