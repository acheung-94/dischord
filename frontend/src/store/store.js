import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import {thunk} from "redux-thunk"
import logger from "redux-logger"
import sessionReducer from "./sessionReducer"
import serverReducer from "./serverReducer"
// import channelReducer from "./channelReducer"
const rootReducer = combineReducers({
    session: sessionReducer,
    servers: serverReducer
})

const configureStore = (initialState = {}) => (
    legacy_createStore(rootReducer, initialState, applyMiddleware(thunk, logger))
)
export default configureStore;