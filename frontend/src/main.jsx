import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import configureStore from './store/store.js';
import { Provider } from 'react-redux'
import {restoreSession} from './utils/csrfUtils.js'
import { deleteSession, postSession, postUser } from './utils/sessionApiUtils.js';
import { createSession, createUser, destroySession, loginUser, logoutUser } from './store/sessionReducer.js';
const initializeApp = () => {
  const store = configureStore()
  window.store = store
  window.postUser = postUser
  window.postSession = postSession
  window.deleteSession = deleteSession
  window.createUser = createUser
  window.loginUser = loginUser
  window.logoutUser = logoutUser
    ReactDOM.createRoot(document.getElementById('root')).render(
    
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
    )
}


restoreSession().then(initializeApp)