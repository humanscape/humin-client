import React from "react";
import InConferenceInfo from './InConferenceInfo';
import BookedInfo from './BookedInfo';
import AvaliableInfo from './AvaliableInfo';

const Info = props => {
    const room = props.room
    if (props.room.events.length>0){
        const event = room.events[0]
        const now_stamp = Date.parse(new Date());
        const start_time_stamp = Date.parse(event.start_time);
        const book_stamp_range = 60 * 60 * 1000;
        if (now_stamp>=start_time_stamp){
            return <InConferenceInfo room={room}/>
        }
        else if (start_time_stamp-now_stamp<=book_stamp_range){
            return <BookedInfo room={room}/>
        }
        else {
            return <AvaliableInfo room={room}/>
        }
    }
    else {
        return <AvaliableInfo room={room}/>
    }
}

export default Info;