import {combineReducers} from 'redux';
import rooms from './Rooms';
import organization from './Organization';

const reducer = combineReducers({
    rooms,
    organization
});

export default reducer;