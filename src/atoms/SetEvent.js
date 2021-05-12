import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dropClickedRoom } from "../store/modules/ClickedRoom";
import { setRooms } from "../store/modules/Rooms";

const SetEvent = () => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    const [attendText, setAttendText] = useState("");
    const [AttendAutocomplateList, setAttendAutocompalteList] = useState([]);
    const clickedRoomId = useSelector(state => state.clickedRoom);
    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.userProfile);
    const roomList = useSelector(state => state.rooms);
    const room = roomList[clickedRoomId-1];
    const [attendees, setAttendees] = useState([]);
    const timeList = (() => {let result = []; for(let i=0;i<25;i++){const hour=i.toString().padStart(2, '0'); result.push(<option value={hour}>{hour}</option>);} return result;})
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
        const date = document.getElementsByName("date")[0].value;
        const event = {
            "summary": document.getElementsByName("summary")[0].value,
            "start": {
                "dateTime": date+"T"+document.getElementsByName("startHour")[0].value+":"+document.getElementsByName("startMin")[0].value+":00+09:00"
            },
            "end": {
                "dateTime": date+"T"+document.getElementsByName("endHour")[0].value+":"+document.getElementsByName("endMin")[0].value+":00+09:00"
            },
            "attendees": [...attendees, room.calendar_id, userProfile.profileObj.email].map(attend => {return {"email": attend}}),
        }
        await axios.post("https://www.googleapis.com/calendar/v3/calendars/"+userProfile.profileObj.email+"/events", event,{
            headers:{
                "Authorization": "Bearer " + userProfile.tokenObj.access_token
            }
        }).then(response => {
            alert("일정 추가 완료");
            dispatch(dropClickedRoom());
            setAttendText("");
            setAttendAutocompalteList([]);
        }).catch(error => {
            alert("오류 발생");
            console.log(error);
        })
    }

    return(
        <div id="SetEvent">
            {userProfile!=null && room && 
                <form onSubmit={setEvent}>
                    <div className="Title">{room.name}</div>
                    <input type="text" name="summary" placeholder="제목" required/><br/>
                    <input type="date" name="date"/><br/>
                    <select name="startHour" required>
                        {timeList()}
                    </select>:
                    <select name="startMin" required>
                        <option value="00">00</option>
                        <option value="30">30</option>
                    </select>~
                    <select name="endHour" required>
                        {timeList()}
                    </select>:
                    <select name="endMin" required>
                        <option value="00">00</option>
                        <option value="30">30</option>
                    </select><br/>
                    <input type="text" name="attendees" onChange={handleAttendText} value={attendText} placeholder="참석자 추가"/><br/>
                    <div id="AttendAutocomplateList">
                        {AttendAutocomplateList.length>0 && AttendAutocomplateList}
                    </div>
                    <div id="AttendeesList">
                        {attendees.length>0 && attendees.map((attend, key) => {return <div>{attend} <span onClick={() => deleteAttend(key)}>x</span></div>;})}
                    </div>
                    <button type="submit">일정 생성</button>
                </form>
            }
        </div>
    )
}

export default SetEvent;