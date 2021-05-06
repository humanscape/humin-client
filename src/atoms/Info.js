import React, { useEffect, useState } from "react";
import InConferenceInfo from './InConferenceInfo';
import BookedInfo from './BookedInfo';
import AvaliableInfo from './AvaliableInfo';
import EventClassifier from '../common/lib/EventClassifier';

const AVALIABLE = 1;
const SOON = 2;
const STARTED = 3;

const Info = props => {
    const [nowStamp, setNowStamp] = useState(0);
    useEffect(() => {
        setInterval(() => {
            setNowStamp(Date.parse(new Date()))
        }, 10000);
    }, [])
    const room = props.room
    if (room.events.length>0){
        const eventTimeStamp = Date.parse(room.events[0].start_time);
        const result = EventClassifier(eventTimeStamp)
            if (result==AVALIABLE) {
                return <AvaliableInfo room={room}/>
            }
            else if (result==SOON) {
                return <BookedInfo room={room}/>
            }
            else {
                return <InConferenceInfo room={room}/>
            }
    }
    else {
        return <AvaliableInfo room={room}/>
    }
}

export default Info;