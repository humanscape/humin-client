import axios from "axios";

const SET_ROOMS = "ROOMSAction/SET_ROOMS";

export const setRooms = rooms => ({type: SET_ROOMS, rooms});

const initState = [];

export default function rooms(state = initState, action){
    switch(action.type){
        case SET_ROOMS:
            return action.rooms;
        default:
            return initState;
    }
}