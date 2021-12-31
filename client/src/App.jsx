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
import MyRoomPage from './components/views/Myroom/MyRoomPage';

// _2붙어있는건 테스트 room
import Room_2 from './components/views/Room_By_Dong/Room';
import RoomCreate_2 from './components/views/Room_By_Dong/RoomCreate/RoomCreate';
import RoomJoin_2 from './components/views/Room_By_Dong/RoomJoin/RoomJoin';
import RoomAdmin_2 from './components/views/Room_By_Dong/RoomCreate/RoomAdmin';
import RoomParticipant_2 from './components/views/Room_By_Dong/RoomJoin/RoomParticipant';


import Auth from './hoc/auth' 

import { connectWithSocketIOServer} from './components/views/Room/utils/wss';
import DashboardApp from './components/views/DashboardApp/DashboardApp';
import User from './components/views/DashboardUser/User';
import ThemeConfig from './dashboard_theme';
import GlobalStyles from './dashboard_theme/globalStyles';
import ScrollToTop from './dashboard_components/ScrollToTop';
import { BaseOptionChartStyle } from './dashboard_components/charts/BaseOptionChart';


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
        <Route exact path="/" component={Auth(MainPage, null)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/register" component={RegisterPage} />

        <Route exact path = "/join-room" component = {JoinRoomPage} />
        <Route exact path ="/room" component ={RoomPage} />
        <Route exact path ="/intro" component = {IntroductionPage} />

        <Route exact path="/roomparticipant_2" component={RoomParticipant_2 } />
        <Route exact path="/room_2" component={Room_2} />
        <Route exact path="/roomcreate_2" component={RoomCreate_2} />
        <Route exact path="/roomjoin_2" component={RoomJoin_2} />
        <Route exact path="/roomadmin_2" component={RoomAdmin_2 } />
        <Route exact path="/myroom" component={MyRoomPage } />
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
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
        <AnimatedSwitch />
      </ThemeConfig>
    </BrowserRouter>
  );
}

export default App; 