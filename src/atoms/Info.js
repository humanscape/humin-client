import React from "react";
import InConferenceInfo from './InConferenceInfo';
import BookedInfo from './BookedInfo';
import AvaliableInfo from './AvaliableInfo';
import EventClassifier from '../common/lib/EventClassifier';

const AVALIABLE = 1;
const SOON = 2;
const STARTED = 3;

const Info = props => {
    const room = props.room;
    let infoElement;
    if (room.events.length>0){
        const eventTime = room.events[0].start_time;
        const result = EventClassifier(eventTime);
            if (result===AVALIABLE) {
                infoElement = <AvaliableInfo room={room} onClick={props.onClick}/>;
            }
            else if (result===SOON) {
                infoElement = <BookedInfo room={room} onClick={props.onClick}/>;
            }
            else {
                infoElement = <InConferenceInfo room={room} onClick={props.onClick}/>;
            }
    }
    else {
        infoElement = <AvaliableInfo room={room} onClick={props.onClick}/>;
    }
    
    return infoElement;
}

export default Info;