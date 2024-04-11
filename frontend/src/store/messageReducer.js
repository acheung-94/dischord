import { createSelector } from "reselect"
import { postMessage, patchMessage, destroyMessage, getMessages } from "../utils/messageApiUtils" 

//TYPES
const ADD_MESSAGE = 'messages/ADD_MESSAGE'
const RECEIVE_MESSAGES = 'messages/RECEIVE_MESSAGES'
const DELETE_MESSAGE = 'messages/DELETE_MESSAGE'

// REG ACTIONS
export const addMessage = (message) => ( {
    type: ADD_MESSAGE,
    message
})

const receiveMessages = (messages) => ( {
    type: RECEIVE_MESSAGES,
    messages
})

export const deleteMessage = (messageId) => ( {
    type: DELETE_MESSAGE,
    messageId
})
// THUNK ACTIONS
export const createMessage = (message) => (dispatch) => (
    postMessage(message)
)

export const getChannelMessages = (channelId) => (dispatch) => (
    getMessages(channelId)
        .then(res => {
            if (res.ok){
                return res.json()
            }else{
                throw res
            }
        }).then(messages => dispatch(receiveMessages(messages)))
)

export const updateMessage = (message, id) => (dispatch) => (
    patchMessage(message, id)

)

export const removeMessage = messageId => dispatch => (
    destroyMessage(messageId) 

)
// SELECTORS 
export const currentMessages = createSelector( state => state.messages, messages => Object.values(messages))

// REDUCER

const messageReducer = (state ={}, action) => {
    const newState = { ...state }
    switch(action.type){
        case ADD_MESSAGE:
            return { ...newState, [action.message.id]: action.message} ;
        case RECEIVE_MESSAGES:
            return action.messages;
        case DELETE_MESSAGE:
            delete newState[action.messageId]
            return newState;
        default:
            return state;
    }

}

export default messageReducer;