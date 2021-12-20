import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';

import MainPage from './components/views/MainPage/MainPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Room from './components/views/Room/Room';
import RoomCreate from './components/views/Room/RoomCreate';
import RoomJoin from './components/views/Room/RoomJoin';
import RoomAdmin from './components/views/Room/RoomAdmin';
import RoomParticipant from './components/views/Room/RoomParticipant';
import Auth from './hoc/auth'

const AnimatedSwitch = () => {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames="fade" timeout={500}>
        <Routes location={location}>
        <Route path="/" element={<MainPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/room" element={<Room/>} />
            <Route path="/roomcreate" element={<RoomCreate/>} />
            <Route path="/roomjoin" element={<RoomJoin/>} />
            <Route path="/roomadmin" element={<RoomAdmin/>} />
            <Route path="/roomparticipant" element={<RoomParticipant/>} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AnimatedSwitch />
      </BrowserRouter>
    </div>
  );
}

export default App;