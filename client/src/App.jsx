import React, { useEffect } from 'react';
import { BrowserRouter, Route, useLocation, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';

import MainPage from './components/views/MainPage/MainPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import JoinRoomPage from './components/views/Room/JoinRoomPage/JoinRoomPage';
import RoomPage from './components/views/Room/RoomPage/RoomPage';
import IntroductionPage from './components/views/Room/IntroductionPage/IntroductionPage';
// import Room from './components/views/Room/Room';
// import RoomCreate from './components/views/Room/RoomCreate/RoomCreate';
// import RoomJoin from './components/views/Room/RoomJoin/RoomJoin';
// import RoomAdmin from './components/views/Room/RoomCreate/RoomAdmin';
// import RoomParticipant from './components/views/Room/RoomJoin/RoomParticipant';
import Auth from './hoc/auth'

import { connectWithSocketIOServer} from './components/views/Room/utils/wss';

const AnimatedSwitch = () => {
  const location = useLocation();

  return (
    // <TransitionGroup component={null}>
    //   <CSSTransition key={location.key} classNames="fade" timeout={500}>
    //     <Switch location={location}>
    //     <Route exact path="/" component={Auth(MainPage, null )  } />
    //     <Route exact path="/login" component={Auth(LoginPage, null )  } />
    //     <Route exact path="/register" component={Auth(RegisterPage, null )  } />

    //     <Route exact path = "/join-room" component = {Auth(JoinRoomPage, null) } />
    //     <Route exact path ="/room" component ={Auth(RoomPage, null)} />
    //     <Route exact path ="/intro" component = {Auth(IntroductionPage, null)} />

    //     {/* <Route exact path="/room" component={Auth(Room, null )  } />
    //     <Route exact path="/roomcreate" component={Auth(RoomCreate, null )  } />
    //     <Route exact path="/RoomJoin" component={Auth(RoomJoin, null )  } />
    //     <Route exact path="/RoomAdmin" component={Auth(RoomAdmin, null )  } />
    //     <Route exact path="/RoomParticipant" component={Auth(RoomParticipant, null )  } /> */}
    //     </Switch>
    //   </CSSTransition>
    // </TransitionGroup>

    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames="fade" timeout={500}>
        <Switch location={location}>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/login" component={LoginPage} />
        {/* <Route exact path="/register" component={(RegisterPage, null )  } /> */}

        <Route exact path = "/join-room" component = {JoinRoomPage} />
        <Route exact path ="/room" component ={RoomPage} />
        <Route exact path ="/intro" component = {IntroductionPage} />

        {/* <Route exact path="/room" component={Auth(Room, null )  } />
        <Route exact path="/roomcreate" component={Auth(RoomCreate, null )  } />
        <Route exact path="/RoomJoin" component={Auth(RoomJoin, null )  } />
        <Route exact path="/RoomAdmin" component={Auth(RoomAdmin, null )  } />
        <Route exact path="/RoomParticipant" component={Auth(RoomParticipant, null )  } /> */}
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

function App() {
  useEffect(()=>{
    connectWithSocketIOServer();
  }, []);

  return (
    <BrowserRouter>
      <AnimatedSwitch />
    </BrowserRouter>
  );
}

export default App; 