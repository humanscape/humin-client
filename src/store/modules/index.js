import {combineReducers} from 'redux';
import rooms from './Rooms';
import organization from './Organization';
import userProfile from './UserProfile';
import clickedRoom from './ClickedRoom';
import date from './Date';

const reducer = combineReducers({
    rooms: rooms,
    organization: organization,
    userProfile: userProfile,
    clickedRoom: clickedRoom,
    date: date
});

export default reducer;