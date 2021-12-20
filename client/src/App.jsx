import React from 'react';
import {BrowserRouter as Router,
   Routes, Route, Switch } from 'react-router-dom';
import MainPage from './components/views/MainPage/MainPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Room from './components/views/Room/Room';
import RoomCreate from './components/views/Room/RoomCreate';
import RoomJoin from './components/views/Room/RoomJoin';
import RoomAdmin from './components/views/Room/RoomAdmin';
import RoomParticipant from './components/views/Room/RoomParticipant';
import Auth from './hoc/auth'

function App() {
  return (
    <div>
        <Switch>
          {/* <Route exact path="/" element={<MainPage/>} /> */}
          <Route exact path="/" component={Auth(MainPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false )  } />
          <Route exact path="/register" component={Auth(RegisterPage, true )  } />
          {/* <Route path="/login" element={Auth(<LoginPage/>,true)} /> */}
          {/* <Route exact path="/login" element={<LoginPage/>}/> */}
          {/* <Route exact path="/login" component={<LoginPage/>}/>
          <Route exact path="/register" element={<RegisterPage/>} />
          <Route exact path="/register" element={Auth(<RegisterPage/>,true)} />
          <Route exact path="/room" element={<Room/>} />
          <Route exact path="/roomcreate" element={<RoomCreate/>} />
          <Route exact path="/roomjoin" element={<RoomJoin/>} />
          <Route exact path="/roomadmin" element={<RoomAdmin/>} />
          <Route exact path="/roomparticipant" element={<RoomParticipant/>} /> */}
        </Switch>
      </div>
  );
}

export default App;