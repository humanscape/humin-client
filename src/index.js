import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import reducer from './store/modules';
import { Provider } from 'react-redux';

const isDevelopment = process.env.NODE_ENV;

const store = createStore(
  reducer,
  isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);


ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);