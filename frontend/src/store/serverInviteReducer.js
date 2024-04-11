import { csrfFetch } from "../utils/csrfUtils";
import { createSelector } from 'reselect'

const RECEIVE_INVITES = 'serverInvite/RECEIVE_INVITES'

export const receiveInvites = invites => ({
    type: RECEIVE_INVITES,  
    invites
})

const getInvites = () => (
    csrfFetch('/api/memberships')
)

export const postInvite = (invite) => (
    csrfFetch(`/api/memberships`, {
        method: 'POST',
        body: JSON.stringify(invite)
    })
)

const patchInvite = invite => (
    csrfFetch(`/api/memberships/${invite.id}`, {
        method: 'PATCH',
        body: JSON.stringify(invite)
    })
)


export const loadInvites = () => dispatch => (
    getInvites().then(res => {
        if (res.ok) {
            return res.json()
        }else{
            throw res;
        }
    }).then(invites => dispatch(receiveInvites(invites)))
)

export const updateInvites = invite => dispatch => (
    patchInvite(invite).then(res => {
        if (res.ok)  {
            return res.json()
        }else{
            throw res;
        }
    }).then(invites => dispatch(receiveInvites(invites)))
)

export const selectServerInvites = createSelector( state => state.serverInvites, invites => invites ? Object.values(invites) : [])

const serverInviteReducer = (state ={}, action) => {
    const newState = { ...state }
    switch(action.type){
        case RECEIVE_INVITES:
            return action.invites;
        default:
            return state;
    }
}

export default serverInviteReducer;