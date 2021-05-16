const SET_CLICKED_ROOM = "clicked-room/SET_ROOM";
const DROP_CLICKED_ROOM = "clicked-room/DROP_ROOM";

export const setClickedRoom = roomName => ({type: SET_CLICKED_ROOM, roomName});
export const dropClickedRoom = () => ({type: DROP_CLICKED_ROOM});

const initState = null;

export default function userProfile(state = initState, action){
    switch(action.type){
        case SET_CLICKED_ROOM:
            return action.roomName;
        case DROP_CLICKED_ROOM:
            return null;
        default:
            return state;
    }
}