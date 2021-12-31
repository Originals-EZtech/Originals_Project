import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './components/views/Room/store/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.render(
    <Provider store={store}>
      <CookiesProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </CookiesProvider>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

reportWebVitals();
