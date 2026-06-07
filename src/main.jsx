// main.jsx - entry point of the entire app
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provider makes Redux store available to every component */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);