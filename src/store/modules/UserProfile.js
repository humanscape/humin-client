const SET_PROFILE = "USERPROFILEAction/SET_PROFILE";
const DROP_PROFILE = "USERPROFILEAction/DROP_PROFILE"

export const setProfile = profile => ({type: SET_PROFILE, profile});
export const dropProfile = () => ({type: DROP_PROFILE});

const initState = null;

export default function userProfile(state = initState, action){
    switch(action.type){
        case SET_PROFILE:
            return action.profile;
        case DROP_PROFILE:
            return null;
        default:
            return initState;
    }
}