const TOGGLE_PANEL = 'ui/TOGGLE_PANEL'
const SET_PANEL = 'ui/SET_PANEL'
const SET_PROFILE = 'ui/TOGGLE_PROFILE'
const SET_FRIENDS_LIST = 'ui/SET_FRIENDS_LIST'
const SET_SEARCH = 'ui/SET_SEARCH'

export const togglePanel = () => ({
    type: TOGGLE_PANEL
})

export const setPanel = () => ({
    type: SET_PANEL
})

export const setProfile =(user) => ({
    type: SET_PROFILE,
    user
})

export const setFriendsList = (section) => ({
    type: SET_FRIENDS_LIST,
    section
})

export const setSearch = searchMode => ({
    type: SET_SEARCH,
    searchMode
})

export const panelState = state => state.ui.rightPanel
export const profileState = state => state.ui.userProfile
export const friendsListState = state => state.ui.friendsList
export const searchState = state => state.ui.searchMode
const initialState = {
    rightPanel: false,
    userProfile: false,
    friendsList: 'accepted',
    searchMode: false
}

const uiReducer = (state=initialState, action) => {
    const newState = {...state}
    switch(action.type){
        case TOGGLE_PANEL:
            return { ...newState, rightPanel: !newState.rightPanel};
        case SET_PANEL:
            return { ...newState, rightPanel: true}
        case SET_PROFILE:
            return { ...newState, userProfile: action.user};
        case SET_FRIENDS_LIST:
            return { ...newState, friendsList: action.section};
        case SET_SEARCH:
            return { ...newState, searchMode: action.searchMode}
        default:
            return state;
    }
}
export default uiReducer;