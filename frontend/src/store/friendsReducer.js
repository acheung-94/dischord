import {createSelector} from 'reselect'
import { csrfFetch } from '../utils/csrfUtils'
const ADD_FRIENDS = 'friends/ADD_FRIENDS'
const ADD_FRIEND = 'friends/ADD_FRIEND'
const REMOVE_REQUEST = 'friends/REMOVE_REQUEST'

export const addFriends = (friends) => ({
    type: ADD_FRIENDS,
    friends
})

export const addFriend = (friend) => ({
    type: ADD_FRIEND,
    friend
})

export const removeRequest = (requestId) => ({
    type: REMOVE_REQUEST,
    requestId
})

const getFriends = () => (
    fetch('/api/friendships')
)

export const postFriends = (friendship) => (
    csrfFetch('/api/friendships', {
        method: 'post',
        body: JSON.stringify(friendship) // not an instance of FormData
    })
)
const patchFriends = (friendship) => (
    csrfFetch(`/api/friendships/${friendship.id}`, {
        method: 'PATCH',
        body: JSON.stringify(friendship)
    })
)

const deleteFriendship = (requestId) => (
    csrfFetch(`/api/friendships/${requestId}`, {
        method: 'DELETE'
    })
)

export const fetchFriends = () => (dispatch) => {
    getFriends().then(res => {
        if (res.ok){
            return res.json()
        }else{
            throw res
        }
    }).then(friends => dispatch(addFriends(friends)))
}

export const makeFriends = friendship => dispatch => (
    postFriends(friendship).then(res => {
        if (res.ok) {
            return res.json()
        }else{
            throw res
        }
    }).then(friends => dispatch(addFriends(friends)))
)

export const updateFriends = friendship => dispatch => (
    patchFriends(friendship).then(res => {
        if (res.ok) {
            return res.json()
        }else{
            throw res
        }
    }).then(friends => dispatch(addFriends(friends)))
)

export const deleteRequest = requestId => dispatch => (
    deleteFriendship(requestId).then(res => {
        if (res.ok) {
            console.log('removing request from state...')
            dispatch(removeRequest(requestId))
        }
    })
)

export const selectFriends = createSelector(state => state.friends, friends => Object.values(friends))
const friendsReducer = (state = {}, action) => {
    const newState = { ...state }
    switch(action.type){
        case ADD_FRIENDS:
            return action.friends;
        case ADD_FRIEND:
            return {...newState, [action.friend.id] : action.friend};
        case REMOVE_REQUEST:
            delete newState[action.requestId]
            return newState
        default:
            return state;
    }
}
export default friendsReducer