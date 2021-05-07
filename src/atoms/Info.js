import React, { useEffect, useState } from "react";
import InConferenceInfo from './InConferenceInfo';
import BookedInfo from './BookedInfo';
import AvaliableInfo from './AvaliableInfo';
import EventClassifier from '../common/lib/EventClassifier';

const AVALIABLE = 1;
const SOON = 2;
const STARTED = 3;

const Info = props => {
    const [date, setDate] = useState(0);
    useEffect(() => {
        setInterval(() => {
            setDate(new Date());
        }, 10000)
    }, [date])
    const room = props.room
    if (room.events.length>0){
        const eventTime = room.events[0].start_time;
        const result = EventClassifier(eventTime);
            if (result==AVALIABLE) {
                return <AvaliableInfo room={room} onClick={props.onClick}/>
            }
            else if (result==SOON) {
                return <BookedInfo room={room} onClick={props.onClick}/>
            }
            else {
                return <InConferenceInfo room={room} onClick={props.onClick}/>
            }
    }
    else {
        return <AvaliableInfo room={room} onClick={props.onClick}/>
    }
}

export default Info;