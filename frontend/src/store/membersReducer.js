import { getMembers } from "../utils/searchApiUtils"
import {createSelector} from "reselect"
//TYPES
const RECEIVE_MEMBERS = 'members/RECEIVE_MEMBERS'
const ADD_MEMBER = 'members/ADD_MEMBER'
// nobody gets kicked out, you're in for life.

// REG ACTIONS
export const receiveMembers = (members) => ({
    type: RECEIVE_MEMBERS,
    members
})
export const addMember = (member) => ({
    type: ADD_MEMBER,
    member
})
//THUNK ACTIONS
export const fetchMembers = serverId => dispatch => (
    getMembers(serverId).then(res => {
        if (res.ok){
            return res.json()
        }else{
            throw res
        }
    }).then( members => dispatch(receiveMembers(members)))
)

//SELECTORS
export const selectMembers = createSelector(state => state.members, members => Object.values(members))

//REDUCER

const membersReducer = (state = {}, action) => {
    const newState = { ...state }
    switch(action.type){
        case RECEIVE_MEMBERS:
            return action.members
        case ADD_MEMBER:
            return { ...newState, [action.member.id]: action.member}
        default:
            return state;
    }
}

export default membersReducer