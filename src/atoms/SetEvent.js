import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getCTX from "../common/lib/GetCTX";
import getFormatDate from "../common/lib/GetFormatDate";
import { dropClickedRoom } from "../store/modules/ClickedRoom";

const SetEvent = () => {
    const date = new Date();
    const canvasRef = React.createRef();
    const [attendText, setAttendText] = useState("");
    const [AttendAutocomplateList, setAttendAutocompalteList] = useState([]);
    const startTime = date.getHours();
    const endTime = 24;
    // const hourHeightRange = 430/(endTime-startTime);
    const hourHeightRange = 50;
    const height=(endTime-startTime)*50+30+"px";
    const clickedRoomId = useSelector(state => state.clickedRoom);
    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.userProfile);
    const roomList = useSelector(state => state.rooms);
    const room = roomList[clickedRoomId-1];
    const [attendees, setAttendees] = useState([]);


    const intToString = int => {
        return int.toString().padStart(2, "0");
    }
    const closeEventTab = () => {
        dispatch(dropClickedRoom());
        setAttendText("");
        setAttendAutocompalteList([]);   
    }
    const addAttendees = email => {
        setAttendees(attendees => [...attendees, email+"@humanscape.io"]);
        setAttendText("");
        setAttendAutocompalteList([]);
    }
    const handleAttendText = e => {
        setAttendText(e.target.value);
        axios.get("http://localhost:8000/user/search/"+e.target.value+"/").then(response => {
            setAttendAutocompalteList(response.data.map(user => {return <div onClick={() => addAttendees(user.email)}>{user.email}</div>}));
        }).catch(e => {
            setAttendAutocompalteList([]);
        })
    };
    const deleteAttend = key => {
        setAttendees(attendees.filter((attend, index) => {return index!=key}));
    }
    const setEvent = async(e) => {
        e.preventDefault();
        const event = {
            "summary": document.getElementsByName("summary")[0].value,
            "start": {
                "dateTime": getFormatDate(date)+"T"+document.getElementsByName("startHour")[0].value+":"+document.getElementsByName("startMin")[0].value+":00+09:00"
            },
            "end": {
                "dateTime": getFormatDate(date)+"T"+document.getElementsByName("endHour")[0].value+":"+document.getElementsByName("endMin")[0].value+":00+09:00"
            },
            "attendees": [...attendees, room.calendar_id, userProfile.profileObj.email].map(attend => {return {"email": attend}}),
        }
        await axios.post("https://www.googleapis.com/calendar/v3/calendars/"+userProfile.profileObj.email+"/events", event,{
            headers:{
                "Authorization": "Bearer " + userProfile.tokenObj.access_token
            }
        }).then(response => {
            alert("일정 추가 완료");
            closeEventTab();
        }).catch(error => {
            alert("오류 발생");
            console.log(error);
        })
    }

    useEffect(() => {
        if (userProfile!=null && room){
            const canvas = canvasRef.current;
            const ctx = getCTX(canvas);
            ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
            ctx.font = "10px gothic";
            for(var i=0; i<endTime-startTime+1; i++){
                const y = (i*hourHeightRange)+10;
                ctx.beginPath();
                ctx.moveTo(20, y);
                ctx.lineTo(200, y);
                ctx.closePath();
                ctx.stroke();
                ctx.fillText(startTime+i+"시", 0, y+5);
            }
            if (room.events.length>0){
                room.events.forEach(event=>{
                    const start_time = {
                        year: event.start_time.substring(0, 4),
                        month: event.start_time.substring(5, 7),
                        day: event.start_time.substring(8, 10)
                    };
                    if (start_time.year===date.getFullYear().toString() && start_time.month===intToString(date.getMonth()+1) && start_time.day===intToString(date.getDate())){
                        ctx.fillStyle = "rgb(3, 155, 229)";
                        const eventStartHour = event.start_time.substring(11,13);
                        const eventStartMin = event.start_time.substring(14,16);
                        const eventEndHour = event.end_time.substring(11,13);
                        const eventEndMin = event.end_time.substring(14,16);
                        const startY = (eventStartHour-startTime)*hourHeightRange+(eventStartMin*hourHeightRange/60)+10;
                        const endY = (eventEndHour-startTime)*hourHeightRange+(eventEndMin*hourHeightRange/60)+10;
                        const height = endY-startY;
                        ctx.fillRect(20, startY, 200, height);
                        ctx.fillStyle="white";
                        ctx.fillText(event.summary, 30, startY+(height/2));
                    }
                })
            }
            ctx.beginPath();
            ctx.moveTo(20, 0);
            ctx.lineTo(20, 500);
            ctx.closePath();
            ctx.stroke();
        }
    }, [clickedRoomId])

    return(
        <div id="SetEvent">
            {userProfile!=null && room && 
                <form onSubmit={setEvent}>
                    <div className="Title">{room.name}</div>
                    <canvas id="TimeTable" ref={canvasRef} style={{height: height}}/>
                    <div id="EventModal">
                        <div className="Header"><button className="Close" onClick={closeEventTab}>x</button></div>
                        <input type="text" name="summary" placeholder="제목" required/><br/>
                        <input type="text" name="attendees" onChange={handleAttendText} value={attendText} placeholder="참석자 추가"/><br/>
                        <div id="AttendAutocomplateList">
                            {AttendAutocomplateList.length>0 && AttendAutocomplateList}
                        </div>
                        <div id="AttendeesList">
                            {attendees.length>0 && attendees.map((attend, key) => {return <div>{attend} <span onClick={() => deleteAttend(key)}>x</span></div>;})}
                        </div>
                        <button type="submit" className="Submit">저장</button>
                    </div>
                </form>
            }
        </div>
    )
}

export default SetEvent;