import {createSelector} from 'reselect'
import { csrfFetch } from '../utils/csrfUtils'
const ADD_FRIENDS = 'friends/ADD_FRIENDS'
const ADD_REQUEST = 'friends/ADD_REQUEST'

export const addFriends = (friends) => ({
    type: ADD_FRIENDS,
    friends
})

const getFriends = () => (
    fetch('/api/friendships')
)

const postFriends = (friendship) => (
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
    }).then(friends => dispatch(addFriends(friends))).catch(err => console.error(err))
)

export const deleteRequest = requestId => dispatch => (
    deleteFriendship(requestId).then(res => {
        if (res.ok) {
            dispatch(fetchFriends())
        }
    })
)

export const selectAccepted = createSelector(state => state.friends.accepted, accepted => accepted ? Object.values(accepted) : []) 
export const selectPending = createSelector(state => state.friends.pending, pending => pending ? Object.values(pending) : [])
export const selectRejected = createSelector(state => state.friends.rejected, rejected => rejected ? Object.values(rejected) : [])

const friendsReducer = (state = {}, action) => {
    const newState = { ...state }
    switch(action.type){
        case ADD_FRIENDS:
            return action.friends;
        default:
            return state;
    }
}
export default friendsReducer