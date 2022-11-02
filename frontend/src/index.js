import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BackdropContextProvider from './store/backdropContext';
import LoginContextProvider from './store/authContext';
import FeedbackContextProvider  from './store/feedbackContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginContextProvider>
      <BackdropContextProvider>
        <FeedbackContextProvider>
          <App />
        </FeedbackContextProvider>
      </BackdropContextProvider>
    </LoginContextProvider>
  </React.StrictMode>
);

