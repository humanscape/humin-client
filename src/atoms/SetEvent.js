import axios from "axios";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import getCTX from "../common/lib/GetCTX";
import getFormatDate from "../common/lib/GetFormatDate";
import { dropClickedRoom } from "../store/modules/ClickedRoom";

const SetEvent = () => {
    const intToString = int => {
        return int.toString().padStart(2, "0");
    }
    const date = new Date();
    const canvasRef = React.createRef();
    const [userList, setUserList] = useState();
    const [attendText, setAttendText] = useState("");
    const [AttendAutocomplateList, setAttendAutocompalteList] = useState([]);
    const startTime = date.getHours();
    const endTime = 23;
    const hourHeightRange = 60;
    const fifMinRange = Math.floor(60/4);
    const height=(endTime-startTime+1)*60+"px";
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
            result.push(((merdiemFlag)?"오후":"오전")+hour+":"+intToString(min))
            min+=15;
        }
        return result;
    })();
    
    const getUsers = async() => {
        let userList = [];
        await axios.get(process.env.REACT_APP_API_BASE_URL+"user/organization/"+organization+"/").then(response => {
            userList = response.data;
        }).catch(e => {
            console.log(e);
        })
        return userList;
    };

    useEffect(() => {
        getUsers().then(users =>setUserList(users));
    }, [])

    const [attendees, setAttendees] = useState([]);
    let mousedown = false;
    let isBeforeSetTime = true;
    let dragList = [];
    const closeEventTab = () => {
        dispatch(dropClickedRoom());
        setAttendText("");
        setAttendAutocompalteList([]);   
        setAttendees([]);
    }
    const addAttendees = user => {
        setAttendees(attendees => [...attendees, user]);
        setAttendText("");
        setAttendAutocompalteList([]);
    }

    const handleAttendText = e => {
        setAttendText(e.target.value);
        if (e.target.value===""){
            setAttendAutocompalteList([]);
        }else{
            setAttendAutocompalteList(userList.filter(user => {return (user.name.includes(e.target.value))}).map(user => {return <div onClick={() => addAttendees({name: user.name, email: user.email+"@"+organization})}>{user.name}({user.email}@{organization})</div>}));
        }
    };

    const deleteAttend = key => {
        setAttendees(attendees.filter((attend, index) => {return index!==key}));
    }
    const setEvent = async(e) => {
        e.preventDefault();
        const startHour = Math.floor(document.getElementsByName("startTime")[0].selectedIndex*15/60);
        const startMin = document.getElementsByName("startTime")[0].selectedIndex*15%60;
        const endHour = Math.floor(document.getElementsByName("endTime")[0].selectedIndex*15/60);
        const endMin = document.getElementsByName("endTime")[0].selectedIndex*15%60;
        
        const event = {
            "summary": document.getElementsByName("summary")[0].value,
            "start": {
                "dateTime": getFormatDate(date)+"T"+intToString(startHour)+":"+intToString(startMin)+":00+09:00"
            },
            "end": {
                "dateTime": getFormatDate(date)+"T"+intToString(endHour)+":"+intToString(endMin)+":00+09:00"
            },
            "attendees": [...attendees, {email: room.calendar_id}, {email: userProfile.profileObj.email}].map(attend => {return {"email": attend.email}}).concat([]),
        }
        await axios.post("https://www.googleapis.com/calendar/v3/calendars/"+userProfile.profileObj.email+"/events", event,{
            headers:{
                "Authorization": "Bearer " + userProfile.tokenObj.access_token
            }
        }).then(() => {
            alert("일정 추가 완료");
            closeEventTab();
        }).catch(error => {
            alert("오류 발생");
            console.log(error);
        })
    }

    const yRangeClassifier = layerY => {
        let y = layerY-((layerY-10)%fifMinRange)
        if ((layerY-10)%fifMinRange>=fifMinRange/2){
            y+=fifMinRange
        }
        return y;
    }

    const canvasMousedownHandler = e => {
        if(isBeforeSetTime){
            mousedown=true;
            dragList.push(yRangeClassifier(e.layerY))
        }
    }

    const canvasMouseupHandler = e => {
        if(isBeforeSetTime && dragList.length>0){
            mousedown=false;
            const startIdx = Math.floor((dragList[0]-10)/fifMinRange);
            const endIdx = Math.floor((dragList[dragList.length-1]-10)/fifMinRange);
            document.getElementsByName("startTime")[0].options[(startTime*4)+startIdx].selected = true;
            document.getElementsByName("endTime")[0].options[(startTime*4)+endIdx].selected = true;
            isBeforeSetTime=false;
        }
    }

    const validateEmail = email => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const handlePressEnter = e => {
        if(e.key==="Enter" && validateEmail(attendText)){
            addAttendees({email: attendText});
            setAttendText("");
        }
        return false;
    }

    const canvaseMousemoveHandler = (e, ctx) => {
        if(mousedown && isBeforeSetTime){
            const y = yRangeClassifier(e.layerY);
            if(dragList[dragList.length-2]===y){
                ctx.fillStyle = "white";
                const lastY = dragList.pop();
                if (lastY>dragList[dragList.length-1]){
                    ctx.fillRect(41, dragList[dragList.length-1], 200, fifMinRange);
                }
                else{
                    ctx.fillRect(41, lastY, 200, fifMinRange);
                }
            }
            else if(dragList[dragList.length-1]!==y){
                ctx.fillStyle = "#1a73e8";
                ctx.fillRect(41, dragList[0], 200, dragList[dragList.length-1]-dragList[0]);
                if (y>dragList[dragList.length-1]){
                    ctx.fillRect(41, dragList[dragList.length-1], 200, fifMinRange);
                }
                else{
                    ctx.fillRect(41, y, 200, fifMinRange);
                }
                dragList.push(y);
            }
        }
    }

    useEffect(() => {
        if (userProfile!=null && room){
            const canvas = canvasRef.current;
            const ctx = getCTX(canvas);
            canvas.addEventListener("mousedown", canvasMousedownHandler);
            canvas.addEventListener("mouseup", (e => {canvasMouseupHandler(e, ctx)}));
            canvas.addEventListener("mouseout", (e => {canvasMouseupHandler(e, ctx)}));
            canvas.addEventListener("mousemove", (e => {canvaseMousemoveHandler(e,ctx)}));
            ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
            ctx.font = "10px gothic";
            let merdiemFlag=false;
            for(var i=0; i<endTime-startTime+1; i++){
                const y = (i*hourHeightRange)+10;
                ctx.beginPath();
                ctx.moveTo(40, y);
                ctx.lineTo(200, y);
                ctx.closePath();
                ctx.stroke();
                if ((startTime+i)>12){
                    merdiemFlag=true;
                }
                ctx.fillText(((merdiemFlag)?"오후":"오전")+((merdiemFlag)?startTime+i-12:startTime+i)+"시", 0, y+5);
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
                        ctx.beginPath();
                        ctx.moveTo(40, startY);
                        ctx.lineTo(200, startY);
                        ctx.moveTo(40, endY);
                        ctx.lineTo(200, endY);
                        ctx.closePath();
                        ctx.stroke();
                        const height = endY-startY;
                        ctx.fillRect(40, startY, 200, height);
                        ctx.fillStyle="white";
                        ctx.fillText(event.summary, 30, startY+(height/2));
                    }
                })
            }
            ctx.beginPath();
            ctx.moveTo(40, 0);
            ctx.lineTo(40, 1250);
            ctx.closePath();
            ctx.stroke();
        }
    }, [clickedRoomName])

    return(
        <div id="SetEvent">
            {userProfile!=null && room && 
                <form>
                    <div className="Title">{room.name}</div>
                    <canvas id="TimeTable" ref={canvasRef} style={{height: height}}/>
                    <Draggable>
                        <div id="EventModal">
                            <div className="Header"><button type="button" className="Close" onClick={closeEventTab}>x</button></div>
                            <input type="text" name="summary" placeholder="제목" required/><br/>
                            <select name="startTime">
                                {timeList.map((time, idx) => {
                                    return <option value={idx}>{time}</option>
                                })}
                            </select>
                            <select name="endTime">
                                {timeList.map((time, idx) => {
                                    return <option value={idx}>{time}</option>
                                })}
                            </select>
                            <input type="text" name="attendees" onKeyPress={handlePressEnter} onChange={handleAttendText} value={attendText} placeholder="참석자 추가" autoComplete="off"/><br/>
                            <div id="AttendAutocomplateList">
                                {AttendAutocomplateList.length>0 && AttendAutocomplateList}
                            </div>
                            <div id="AttendeesList">
                                {attendees.length>0 && attendees.map((attend, key) => {return <div>{(attend.name)?attend.name+"("+attend.email+")":attend.email} <span onClick={() => deleteAttend(key)}>x</span></div>;})}
                            </div>
                            <button type="button" className="Submit" onClick={setEvent}>저장</button>
                        </div>
                    </Draggable>
                </form>
            }
        </div>
    )
}

export default SetEvent;