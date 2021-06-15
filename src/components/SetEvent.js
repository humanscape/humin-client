import axios from "axios";
import React, { useState } from "react";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import getFormatDate from "../common/lib/GetFormatDate";
import { dropClickedRoom } from "../store/modules/ClickedRoom";
import Attendees from "../atoms/Attendees";
import TimeTable from '../atoms/TimeTable';

const SetEvent = () => {
    const intToString = int => {
        return int.toString().padStart(2, "0");
    }
    const date = useSelector(state => state.date);
    const [startTimeIdx, setStartTimeIdx] = useState(0);
    const [endTimeIdx, setEndTimeIdx] = useState(0);
    const [attendees, setAttendees] = useState([]);
    const clickedRoomName = useSelector(state => state.clickedRoom);
    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.userProfile);
    const organization = userProfile.profileObj.email.split("@")[1];
    const roomList = useSelector(state => state.rooms);
    const room = roomList.find(room => {return room.name===clickedRoomName});
    const timeList = (() => {
        let result = [];
        let min=0;
        let hour=0;
        let merdiemFlag = false;
        for(let i=0;i<23*4+4;i++){
            if(min===60){
                min=0;
                hour+=1;
                if(hour===13){
                    hour=1;
                    merdiemFlag=true;
                }
            }
            result.push(<option value={i}>{((merdiemFlag)?"오후":"오전")+hour+":"+intToString(min)}</option>)
            min+=15;
        }
        return result;
    })();
    
    const closeEventTab = () => {
        dispatch(dropClickedRoom());
        setAttendees([]);
        setStartTimeIdx(0);
        setEndTimeIdx(0);
    }
    
    const setEvent = async(e) => {
        e.preventDefault();
        const startHour = Math.floor(document.getElementsByName("startTime")[0].selectedIndex*15/60);
        const startMin = document.getElementsByName("startTime")[0].selectedIndex*15%60;
        const endHour = Math.floor(document.getElementsByName("endTime")[0].selectedIndex*15/60);
        const endMin = document.getElementsByName("endTime")[0].selectedIndex*15%60;
        let string_date;
        if (date==null){
            string_date = getFormatDate(new Date())
        }
        string_date = date
        const event = {
            "summary": document.getElementsByName("summary")[0].value,
            "start": {
                "dateTime": string_date+"T"+intToString(startHour)+":"+intToString(startMin)+":00+09:00"
            },
            "end": {
                "dateTime": string_date+"T"+intToString(endHour)+":"+intToString(endMin)+":00+09:00"
            },
            "attendees": [...attendees, {email: room.calendar_id}, {email: userProfile.profileObj.email}].map(attend => {return {"email": attend.email}}).concat([]),
        }
        const newAuthRes = await userProfile.reloadAuthResponse();
        await axios.post("https://www.googleapis.com/calendar/v3/calendars/"+userProfile.profileObj.email+"/events", event,{
            headers:{
                "Authorization": "Bearer " + newAuthRes.access_token
            }
        }).then(() => {
            alert("일정 추가 완료");
            closeEventTab();
        }).catch(error => {
            alert("오류 발생");
            console.log(error);
        })
    }

    return(
        <div id="SetEvent">
            {userProfile!=null && room && 
                <form id="SetEventForm">
                    <div className="Title">{room.name}</div>
                    <TimeTable room={room} setStartTimeIdx={setStartTimeIdx} setEndTimeIdx={setEndTimeIdx}/>
                    <Draggable>
                        <div id="EventModal">
                            <div className="Header"><button type="button" className="Close" onClick={closeEventTab}>x</button></div>
                            <input type="text" name="summary" placeholder="제목" required/><br/>
                            <select name="startTime" value={startTimeIdx} onChange={e => setStartTimeIdx(e.target.value)}>{timeList}</select>
                            <select name="endTime" value={endTimeIdx} onChange={e => setEndTimeIdx(e.target.value)}>{timeList}</select>
                            <Attendees userProfile={userProfile} organization={organization} attendees={attendees} setAttendees={setAttendees}/>
                            <button type="button" className="Submit" onClick={setEvent}>저장</button>
                        </div>
                    </Draggable>
                </form>
            }
        </div>
    )
}

export default SetEvent;