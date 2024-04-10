import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './reset.css'
import './index.css'
import { togglePanel } from './store/uiReducer.js'
import configureStore from './store/store.js';
import { Provider } from 'react-redux'
import {restoreSession} from './utils/csrfUtils.js'
import { fetchMembers } from './store/membersReducer.js'
import { getMembers } from './utils/memberApiUtils.js'
import { getChannelMessages, createMessage, removeMessage, updateMessage } from './store/messageReducer.js'
// import { deleteSession, postSession, postUser } from './utils/sessionApiUtils.js';
// import { createSession, createUser, destroySession, loginUser, logoutUser } from './store/sessionReducer.js';
// import { createServer, getUserServers, removeServer, updateServer } from './store/serverReducer.js'
// import { getServers } from './utils/serverApiUtils.js'

const initializeApp = () => {
  const store = configureStore()
  window.store = store
  window.getChannelMessages = getChannelMessages
  window.togglePanel = togglePanel
  window.fetchMembers = fetchMembers
    ReactDOM.createRoot(document.getElementById('root')).render(
    
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
    )
}


restoreSession().then(initializeApp)