// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// import { Provider } from 'react-redux';
// import { applyMiddleware, createStore } from 'redux';
// import promiseMiddleware from 'redux-promise';
// import ReduxThunk from 'redux-thunk';
// import Reducer from './_reducers';
// import { CookiesProvider } from 'react-cookie';

// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

<<<<<<< HEAD
// ReactDOM.render(
//   <Provider store={createStoreWithMiddleware(Reducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__()
//   )}>
//     <CookiesProvider>
//       <App />
//     </CookiesProvider>,
//   </Provider>,
//   document.getElementById('root')
// );
=======
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducer)}>
    <CookiesProvider>
      <App />
    </CookiesProvider>,
  </Provider>,
  document.getElementById('root')
);
>>>>>>> 06673480a689c2e055c34fa9e15aede52d6820fe

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
