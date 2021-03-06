import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';
import { HelmetProvider } from 'react-helmet-async';
import store from './redux/store/store';

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

serviceWorker.unregister();

reportWebVitals();
