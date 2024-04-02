import { postServer } from "../utils/serverApiUtils"

const ADD_SERVER = 'servers/ADD_SERVER'
const DELETE_SERVER = 'servers/DELETE_SERVER'
// const UPDATE_SERVER = 'servers/UPDATE_SERVER'
const RECEIVE_SERVERS = 'servers/RECEIVE_SERVERS'

// ACTION CREATORS
const addServer = (serverInfo) => ( {
    type: ADD_SERVER,
    serverInfo
})

const deleteServer = (serverId) => ({
    type: DELETE_SERVER,
    serverId
})
//actually, don't think i need a update server, because the same action will be performed. just adding the server's id and object to the state.

const receiveServers = (servers) => ( {
    type: RECEIVE_SERVERS,
    servers
}) //replace state with current user's servers. necessary? idk.

// THUNK ACTION CREATORS

export const createServer = (serverInfo) => (dispatch) => (
    postServer(serverInfo).then(res => {
        if (res.ok){
            return res.json()
        }else{
            throw res
        }
    }).then(data => dispatch(addServer(data)))
)


//SELECTORS


// REDUCER
const serverReducer = (state = {}, action) => {
    const newState = {...state}
    switch(action.type){
        case ADD_SERVER:
            return { ...newState, [action.serverInfo.id]: action.serverInfo};
        default:
            return state
    }
}
export default serverReducer;