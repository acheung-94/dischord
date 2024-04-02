import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import {thunk} from "redux-thunk"
import logger from "redux-logger"
import sessionReducer from "./sessionReducer"
import serverReducer from "./serverReducer"
const rootReducer = combineReducers({
    session: sessionReducer,
    servers: serverReducer
})

const configureStore = (initialState = {}) => (
    legacy_createStore(rootReducer, initialState, applyMiddleware(thunk))
)
export default configureStore;