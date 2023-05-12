import {SET_USER} from './Actions'
import {SET_SNAPSHOT} from './Actions'
const initialState={
    user:'', 
    snapshotvariable:true
}

function useReducer(state = initialState, action) {
    switch (action.type) {
      case SET_USER:
        return { ...state, user: action.payload };
      case SET_SNAPSHOT:
        return { ...state, snapshotvariable:  action.payload};
      default:
        return state;
    }
}  

export default useReducer;