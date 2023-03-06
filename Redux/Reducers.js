import {SET_USER} from './Actions'
import {SET_CONVERSATION_TAB_SCREEN} from "./Actions"

const initialState={
    user: '',
    conversationScreen: true,  
}

function useReducer(state=initialState,action){
    switch(action.type){
        case SET_USER:
            return {...state,user:action.payload}
        case SET_CONVERSATION_TAB_SCREEN:
            return {...state,conversationScreen:action.payload}
        default:
            return state;
    }
}

export default useReducer;