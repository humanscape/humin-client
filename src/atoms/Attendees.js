import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Attendees = props => {
    const [userList, setUserList] = useState();
    const [attendText, setAttendText] = useState("");
    const [AttendAutocomplateList, setAttendAutocompalteList] = useState([]);

    const getUsers = async() => {
        let userList = [];
        await axios.get(process.env.REACT_APP_API_BASE_URL+"user/organization/"+props.organization+"/").then(response => {
            userList = response.data;
        }).catch(e => {
            console.log(e);
        })
        return userList;
    };

    useEffect(() => {
        getUsers().then(users =>setUserList(users));
    }, [])

    const addAttendees = user => {
        if(user.email!==props.userProfile.profileObj.email && !props.attendees.some(attend => attend.email===user.email)){
            props.setAttendees(attendees => [...attendees, user]);
        }
        setAttendText("");
        setAttendAutocompalteList([]);
    }

    const handleAttendText = e => {
        setAttendText(e.target.value);
        if (e.target.value===""){
            setAttendAutocompalteList([]);
        }else{
            setAttendAutocompalteList(userList.filter(user => {return (user.name.includes(e.target.value))}).map(user => {return <div onClick={() => addAttendees({name: user.name, email: user.email+"@"+props.organization})}>{user.name}({user.email}@{props.organization})</div>}));
        }
    };

    const deleteAttend = key => {
        props.setAttendees(props.attendees.filter((attend, index) => {return index!==key}));
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

    return(
        <div>
            <input type="text" name="attendees" onKeyPress={handlePressEnter} onChange={handleAttendText} value={attendText} placeholder="참석자 추가" autoComplete="off"/><br/>
            <div id="AttendAutocomplateList">
                {AttendAutocomplateList.length>0 && AttendAutocomplateList}
            </div>
            <div id="AttendeesList">
                {props.attendees.length>0 && props.attendees.map((attend, key) => {return <div>{(attend.name)?attend.name+"("+attend.email+")":attend.email} <span onClick={() => deleteAttend(key)}>x</span></div>;})}
            </div>
        </div>
    )
}

export default Attendees;