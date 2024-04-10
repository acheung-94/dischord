const TOGGLE_PANEL = 'ui/TOGGLE_PANEL'
const SET_PANEL = 'ui/SET_PANEL'
const TOGGLE_PROFILE = 'ui/TOGGLE_PROFILE'

export const togglePanel = () => ({
    type: TOGGLE_PANEL
})

export const setPanel = () => ({
    type: SET_PANEL
})

export const toggleProfile =(view) => ({
    type: TOGGLE_PROFILE,
    view
})

export const panelState = state => state.ui.rightPanel
export const profileState = state => state.ui.userProfile
const initialState = {
    rightPanel: false,
    userProfile: false
}

const uiReducer = (state=initialState, action) => {
    const newState = {...state}
    switch(action.type){
        case TOGGLE_PANEL:
            return { ...newState, rightPanel: !newState.rightPanel};
        case SET_PANEL:
            return { ...newState, rightPanel: true}
        case TOGGLE_PROFILE:
            return { ...newState, userProfile: action.view}
        default:
            return state;
    }
}
export default uiReducer;