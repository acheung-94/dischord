import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './reset.css'
import './index.css'
import configureStore from './store/store.js';
import { Provider } from 'react-redux'
import {restoreSession} from './utils/csrfUtils.js'
// import { deleteSession, postSession, postUser } from './utils/sessionApiUtils.js';
// import { createSession, createUser, destroySession, loginUser, logoutUser } from './store/sessionReducer.js';
// import { createServer, getUserServers, removeServer, updateServer } from './store/serverReducer.js'
// import { getServers } from './utils/serverApiUtils.js'

const initializeApp = () => {
  const store = configureStore()
  window.store = store
  // window.postUser = postUser
  // window.postSession = postSession
  // window.deleteSession = deleteSession
  // window.createUser = createUser
  // window.loginUser = loginUser
  // window.logoutUser = logoutUser
  // window.createServer = createServer
  // window.getUserServers = getUserServers
  // window.getServers = getServers
  // window.removeServer = removeServer
  // window.updateServer = updateServer
    ReactDOM.createRoot(document.getElementById('root')).render(
    
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
    )
}


restoreSession().then(initializeApp)