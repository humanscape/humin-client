import React, { useEffect, useState } from "react";
import InConferenceInfo from './InConferenceInfo';
import BookedInfo from './BookedInfo';
import AvaliableInfo from './AvaliableInfo';

const Info = props => {
    const [nowStamp, setNowStamp] = useState(Date.parse(new Date()));
    useEffect(() => {
        setInterval(() => {
            setNowStamp(Date.parse(new Date()))
        }, 10000);
    }, [])
    const room = props.room
    if (props.room.events.length>0){
        const event = room.events[0]
        const startTimeStamp = Date.parse(event.start_time);
        const bookTimeStamp = 60 * 60 * 1000;
        if (nowStamp>=startTimeStamp){
            return <InConferenceInfo room={room}/>
        }
        else if (startTimeStamp-nowStamp<=bookTimeStamp){
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