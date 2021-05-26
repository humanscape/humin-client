const SET_TOKEN = "accesstoken-action/SET_TOKEN";
const DROP_TOKEN = "accesstoken-action/DROP_TOKEN"

export const setToken = token => ({type: SET_TOKEN, token});
export const dropToken = () => ({type: DROP_TOKEN});

const initState = null;

export default function accessToken(state = initState, action){
    switch(action.type){
        case SET_TOKEN:
            return action.token;
        case DROP_TOKEN:
            return null;
        default:
            return state;
    }
}