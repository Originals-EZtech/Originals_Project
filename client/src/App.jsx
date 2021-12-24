import React from 'react';
import { BrowserRouter, Route, useLocation, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';

import MainPage from './components/views/MainPage/MainPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Room from './components/views/Room/Room';
import RoomCreate from './components/views/Room/RoomCreate/RoomCreate';
import RoomJoin from './components/views/Room/RoomJoin/RoomJoin';
import RoomAdmin from './components/views/Room/RoomCreate/RoomAdmin';
import RoomParticipant from './components/views/Room/RoomJoin/RoomParticipant';
import Auth from './hoc/auth'

const AnimatedSwitch = () => {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames="fade" timeout={500}>
        <Switch location={location}>
        <Route exact path="/" component={Auth(MainPage, null )  } />
        <Route exact path="/login" component={Auth(LoginPage, null )  } />
        <Route exact path="/register" component={Auth(RegisterPage, null )  } />
        <Route exact path="/room" component={Auth(Room, null )  } />
        <Route exact path="/roomcreate" component={Auth(RoomCreate, null )  } />
        <Route exact path="/RoomJoin" component={Auth(RoomJoin, null )  } />
        <Route exact path="/RoomAdmin" component={Auth(RoomAdmin, null )  } />
        <Route exact path="/RoomParticipant" component={Auth(RoomParticipant, null )  } />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AnimatedSwitch />
    </BrowserRouter>
  );
}

export default App;