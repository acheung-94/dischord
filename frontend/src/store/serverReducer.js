import { destroyServer, getServers, patchServer, postServer } from "../utils/serverApiUtils"

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
            console.log(res)
            return res.json()
        }else{
            throw res
        }
    }).then(data => dispatch(addServer(data)))
)

export const getUserServers = () => (dispatch) => (
    getServers().then(res => {
        if (res.ok) {
            return res.json()
        }else{
            throw res
        }
    }).then(servers => dispatch(receiveServers(servers)))
)

// export const getOneServer = (serverId) => (dispatch) => (
//     getServer(serverId).then
// )

export const updateServer = (server) => (dispatch) => (
    patchServer(server).then(res => {
        if (res.ok) {
            return res.json()
        }else{
            throw res
        }
    }).then(server => dispatch(addServer(server)))
    .catch(err => console.error(err))
)

export const removeServer = (serverId) => (dispatch) => (
    destroyServer(serverId).then(res => {
        if (res.ok) {
            return dispatch(deleteServer(serverId))
        }else{
            throw res
        }
    })
)
//SELECTORS
export const currentUserServers = state => state.servers
export const selectServer = (serverId) => (state) => state.servers[serverId]
// REDUCER
const serverReducer = (state = {}, action) => {
    const newState = {...state}
    switch(action.type){
        case ADD_SERVER:
            return { ...newState, [action.serverInfo.id]: action.serverInfo};
        case RECEIVE_SERVERS:
            return {...newState, ...action.servers}
        case DELETE_SERVER:
            delete newState[action.serverId]
            return newState
        default:
            return state
    }
}
export default serverReducer;