import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/views/MainPage/MainPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Room from './components/views/Room/Room';
import RoomCreate from './components/views/Room/RoomCreate';
import RoomJoin from './components/views/Room/RoomJoin';

function App() {
  return (
    <div>
        <Routes>
          <Route exact path="/" element={<MainPage/>} />
          <Route exact path="/login" element={<LoginPage/>} />
          <Route exact path="/register" element={<RegisterPage/>} />
          <Route exact path="/room" element={<Room/>} />
          <Route exact path="/roomcreate" element={<RoomCreate/>} />
          <Route exact path="/roomjoin" element={<RoomJoin/>} />
        </Routes>
      </div>
  );
}

export default App;