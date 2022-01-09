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
import MyRoomPage from './components/views/Myclass/MyRoomPage';

import Auth from './hoc/auth'

import { connectWithSocketIOServer } from './components/views/Room/utils/wss';
import DashboardApp from './components/views/DashboardApp/DashboardApp';
import DashboardUser from './components/views/DashboardUser/DashboardUser';
import ThemeConfig from './dashboard_theme';
import GlobalStyles from './dashboard_theme/globalStyles';
import ScrollToTop from './dashboard_components/ScrollToTop';
import { BaseOptionChartStyle } from './dashboard_components/charts/BaseOptionChart';


const AnimatedSwitch = () => {
  const location = useLocation();

  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames="fade" timeout={500}>
        <Switch location={location}>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />

          <Route exact path="/join-room" component={Auth(JoinRoomPage, true)} />
          <Route exact path="/room" component={Auth(RoomPage, true)} />
          <Route exact path="/intro" component={Auth(IntroductionPage, true)} />

          <Route exact path="/myclass" component={Auth(MyRoomPage,true)} />

          <Route exact path="/dashboard/app" component={Auth(DashboardApp,true,true)} />
          <Route exact path="/dashboard/user" component={Auth(DashboardUser,true,true)} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

function App() {
  useEffect(() => {
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