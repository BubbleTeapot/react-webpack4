import { USER_INFO } from "../actions";

export default function setUserInfo(state = {name: "react-redux"}, action) {
    switch(action.type) {
        case USER_INFO: 
            let name = action.user
            return {...state, name}
        default: 
            return state;
    }
}