import getFormatDate from "../../common/lib/GetFormatDate";

const SET_DATE = "date-action/SET_DATE";
const DROP_DATE = "date-action/DROP_DATE"

export const setDate = date => ({type: SET_DATE, date});
export const dropDate = () => ({type: DROP_DATE});

const initState = null;

export default function date(state = initState, action){
    switch(action.type){
        case SET_DATE:
            if (action.date==getFormatDate(new Date())){
                return null;
            }
            return action.date;
        case DROP_DATE:
            return null;
        default:
            return state;
    }
}