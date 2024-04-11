import { getUsers } from "../utils/searchApiUtils"
import {createSelector} from 'reselect'

const RECEIVE_USERS = 'search/RECEIVE_USERS'
const RESET_RESULTS = 'search/RESET_RESULTS'
export const receiveUsers = (users) =>({
    type: RECEIVE_USERS,
    users
})

export const resetResults = () => ({
    type: RESET_RESULTS
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

export const selectSearchResults = createSelector(state => state.search, results => Object.values(results))

const searchReducer = (state = {}, action) => {
    const newState = { ...state }
    switch(action.type){
        case RECEIVE_USERS:
            return action.users;
        case RESET_RESULTS:
            return {}
        default:
            return state;
    }
}

export default searchReducer;