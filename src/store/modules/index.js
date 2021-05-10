import {combineReducers} from 'redux';
import rooms from './Rooms';
import organization from './Organization';
import userProfile from './UserProfile';

const reducer = combineReducers({
    rooms,
    organization,
    userProfile
});

export default reducer;