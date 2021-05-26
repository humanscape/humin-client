import {combineReducers} from 'redux';
import rooms from './Rooms';
import organization from './Organization';
import userProfile from './UserProfile';
import clickedRoom from './ClickedRoom';
import accessToken from './AccessToken';

const reducer = combineReducers({
    rooms: rooms,
    organization: organization,
    userProfile: userProfile,
    clickedRoom: clickedRoom,
    accessToken: accessToken
});

export default reducer;