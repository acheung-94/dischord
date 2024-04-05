import { postChannel, getChannels, destroyChannel, patchChannel } from "../utils/channelApiUtils"

// TYPES
const ADD_CHANNEL = 'channels/ADD_CHANNEL'
const RECEIVE_CHANNELS = 'channels/RECEIVE_CHANNELS'
const DELETE_CHANNEL = 'channels/DELETE_CHANNEL'

// REGULAR ACTIONS

const addChannel = (channelInfo) => ({
    type: ADD_CHANNEL,
    channelInfo
})

const receiveChannels = (channels) => ({
    type: RECEIVE_CHANNELS,
    channels
})

const deleteChannel = (channelId) => ({
    type: DELETE_CHANNEL,
    channelId
})


// THUNK ACTIONS
export const createChannel = (channelInfo) => (dispatch) => (
    postChannel(channelInfo)
        .then(res => {
            if (res.ok) {
                return res.json()
            }else{
                throw res
            }
        }).then(channel => dispatch(addChannel(channel)))
)

export const getServerChannels = (serverId) => (dispatch) => (
    getChannels(serverId)
        .then(res => {
            if (res.ok) {
                return res.json()
            }else{
                throw res
            }
        }).then(channels => dispatch(receiveChannels(channels)))
)

export const removeChannel = (serverId, channelId) => (dispatch) => (
    destroyChannel(serverId, channelId)
        .then(res => {
            if (res.ok){
                dispatch(deleteChannel(channelId))
            }else {
                throw res
            }
        })
)

export const updateChannel = (channel) => (dispatch) => (
    patchChannel(channel)
        .then(res => {
            if (res.ok) {
                return res.json()
            }else {
                throw res
            }
        }).then(channel => dispatch(addChannel(channel)))
)
// SELECTORS




// REDUCER

const channelReducer = (state = {}, action) => {
    const newState = {...state}
    switch(action.type){
        case ADD_CHANNEL:
            return { ...newState, [action.channelInfo.id]: action.channelInfo};
        case RECEIVE_CHANNELS:
            return action.channels;
        case DELETE_CHANNEL:
            delete newState[action.channelId]
            return newState;
        default:
            return state;
    }
}

export default channelReducer;