const SET_PROFILE = "USERPROFILEAction/SET_PROFILE";

export const setProfile = profile => ({type: SET_PROFILE, profile});

const initState = null;

export default function userProfile(state = initState, action){
    switch(action.type){
        case SET_PROFILE:
            return action.profile;
        default:
            return initState;
    }
}