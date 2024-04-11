
import { postUser, postSession, deleteSession } from "../utils/sessionApiUtils"
import { toggleLoading } from "./uiReducer"
//  TYPES
export const CREATE_SESSION = 'session/CREATE_SESSION'
export const DESTROY_SESSION = 'session/DESTROY_SESSION'

//  ACTION CREATORS
export const createSession = (sessionInfo) => ( {
    type: CREATE_SESSION,
    sessionInfo
})

export const destroySession = () => ( { 
    type: DESTROY_SESSION
})
//  THUNK ACION CREATORS (db interactions!)
export const createUser = userInfo => dispatch => (
    postUser(userInfo)
        .then(res => {
            if (res.ok) {
                return res.json()
            }else {
                throw res
            }
        })
        .then(data => {
            sessionStorage.setItem('currentUser', JSON.stringify(data.user)) // create a new user and log in
            dispatch(createSession(data.user)) 
        })
)

export const loginUser = sessionInfo => dispatch => (
    postSession(sessionInfo)
        .then(res => {
            if (res.ok) {
                return res.json()
            }else {
                throw res
            }
        })
        .then(data => {
            sessionStorage.setItem('currentUser', JSON.stringify(data.user)) // create a new user and log in
            dispatch(createSession(data.user))
            dispatch(toggleLoading())
        })
)

export const logoutUser = () => dispatch => {
    deleteSession()
        .then(res => {
            if (res.ok) {
                sessionStorage.removeItem('currentUser')
                dispatch(destroySession()) // refer to jbuilder formats
            }else {
                throw res.json()
            }
        })
        
}
//  SELECTORS
export const selectCurrentUser = state => state.session
//  REDUCERS
 // default session state is current user from session storage, allows state to persist through refresh.
const initialState = JSON.parse(sessionStorage.getItem('currentUser'))
const sessionReducer = (state = initialState, action) => {
    const newState = {...state}
    switch(action.type) {
        case CREATE_SESSION:
            return action.sessionInfo;
        case DESTROY_SESSION:
            return null; 
        default: 
            return state;
    }
}

export default sessionReducer