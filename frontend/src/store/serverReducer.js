import {createSelector} from "reselect"
import { destroyServer, getServers, patchServer, postMembership, postServer, deleteMembership } from "../utils/serverApiUtils"

const ADD_SERVER = 'servers/ADD_SERVER'
const DELETE_SERVER = 'servers/DELETE_SERVER'

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


const receiveServers = (servers) => ( {
    type: RECEIVE_SERVERS,
    servers
}) 

// THUNK ACTION CREATORS

export const createServer = (serverInfo) => (dispatch) => (
    postServer(serverInfo).then(res => {
        if (res.ok){
            return res.json()
        }else{
            throw res
        }
    }).then(data => {
        dispatch(addServer(data))
        return data
    })
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

export const createMembership = (membership) => (dispatch) => (
    postMembership(membership).then(res => { // post membership should return an updated server list 
        if (res.ok) {
            return res.json()
        }else{
            throw res
        }
    }).then(servers => dispatch(receiveServers(servers)))
)


export const updateServer = (server, id) => (dispatch) => (
    patchServer(server, id).then(res => {
        if (res.ok) {
            return res.json()
        }else{
            throw res
        }
    }).then(server => dispatch(addServer(server)))

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

export const leaveServer = (membershipId) => (dispatch) => (
    deleteMembership(membershipId).then(res => {

        if (res.ok){
            dispatch(getUserServers()) //refresh server list
        }else{
            throw res
        }
    })
)
//SELECTORS

export const currentUserServers2 = createSelector(state => state.servers, servers => Object.values(servers))
export const selectServer = serverId => state => state.servers[serverId]

// REDUCER
const serverReducer = (state = {}, action) => {
    const newState = {...state}
    switch(action.type){
        case ADD_SERVER:
            return { ...newState, [action.serverInfo.id]: action.serverInfo};
        case RECEIVE_SERVERS:
            return action.servers;
        case DELETE_SERVER:
            delete newState[action.serverId]
            return newState;
        default:
            return state;
    }
}
export default serverReducer;