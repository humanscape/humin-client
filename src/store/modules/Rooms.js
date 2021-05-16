const DROP_ROOMS = "rooms-action/DROP_ROOMS";
const SET_ROOMS = "rooms-action/SET_ROOMS";

export const setRooms = rooms => ({type: SET_ROOMS, rooms});
export const dropRooms = () => ({type: DROP_ROOMS});

const initState = [];

export default function rooms(state = initState, action){
    switch(action.type){
        case SET_ROOMS:
            return action.rooms;
        case DROP_ROOMS:
            return [];
        default:
            return state;
    }
}