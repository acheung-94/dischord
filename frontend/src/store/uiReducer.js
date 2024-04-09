const TOGGLE_PANEL = 'ui/TOGGLE_PANEL'

export const togglePanel = () => ({
    type: TOGGLE_PANEL
})


export const panelState = state => state.ui.rightPanel

const initialState = {
    rightPanel: false
}

const uiReducer = (state=initialState, action) => {
    const newState = {...state}
    switch(action.type){
        case TOGGLE_PANEL:
            return { ...newState, rightPanel: !newState.rightPanel}
        default:
            return state;
    }
}
export default uiReducer;