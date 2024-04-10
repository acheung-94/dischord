//search results? iffy on that one
import { getUsers } from "../utils/searchApiUtils"

const RECEIVE_USERS = 'search/RECEIVE_USERS'

export const receiveUsers = (users) =>({
    type: RECEIVE_USERS,
    users
})

export const findUsers = username => dispatch => (
    getUsers(username).then(res => {
        if (res.ok){
            return res.json()
        }else{
            throw res
        }
    }).then(users => dispatch(receiveUsers(users)))
)

export const selectSearchResults = (state => state.search, results => (results.length ? Object.values(results) : []))

const searchReducer = (state = {}, action) => {
    const newState = { ...state }
    switch(action.type){
        case RECEIVE_USERS:
            return action.users
        default:
            return state;
    }
}

export default searchReducer;