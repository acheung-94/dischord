import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import {thunk} from "redux-thunk"
import logger from "redux-logger"
import sessionReducer from "./sessionReducer"
import serverReducer from "./serverReducer"
import channelReducer from "./channelReducer"
import messageReducer from "./messageReducer"
import uiReducer from "./uiReducer"
import membersReducer from "./membersReducer"
import friendsReducer from "./friendsReducer"
import searchReducer from "./searchReducer"
import serverInviteReducer from "./serverInviteReducer"


const rootReducer = combineReducers({
    session: sessionReducer,
    search: searchReducer,
    servers: serverReducer,
    members: membersReducer,
    friends: friendsReducer,
    channels: channelReducer,
    serverInvites: serverInviteReducer,
    messages: messageReducer,
    ui: uiReducer
})

const configureStore = (initialState = {}) => (
    legacy_createStore(rootReducer, initialState, applyMiddleware(thunk, logger))
)
export default configureStore;