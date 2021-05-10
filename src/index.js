import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
<<<<<<< Updated upstream
import reportWebVitals from './reportWebVitals';
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
import { createStore } from 'redux';
import reducer from './store/modules';
import { Provider } from 'react-redux';

const store = createStore(reducer);


<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);