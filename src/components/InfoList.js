import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Info from "../atoms/Info";
import { setRooms } from "../store/modules/Rooms";


const roomList = {
    public: ["PR", "C1", "C2", "C3", "휴방", "주방"],
    humanscape : ["H1", "H2", "H3", "안방", "골방"],
    mommytalk: ["M1", "M2", "M3"]
}

async function getRooms(organization){
    let rooms;
    if (organization==="all"){
        rooms = roomList.public.concat(roomList.humanscape, roomList.mommytalk);
    }
    else if (organization==="humanscape"){
        rooms = roomList.public.concat(roomList.humanscape);

    }
    else if (organization==="mommytalk"){
        rooms = roomList.public.concat(roomList.mommytalk);
    }
    const response = await axios.get("http://localhost:8000/event/");
    return response.data.filter((room) => (rooms.includes(room.name)));
}

const InfoList = () => {
    const roomList = useSelector(state => state.rooms);
    const organization = useSelector(state => state.organization);
    const dispatch = useDispatch();
    const setRoomList = () => {
        getRooms(organization).then(roomList => {
            dispatch(setRooms(roomList));
        })
    };

const InfoClick = e => {
    const roomName = e.currentTarget.getElementsByTagName("td")[0].textContent;
    const clickedRoom = roomList.find(room => {return room.name===roomName});
    console.log(clickedRoom);
}

    useEffect(() => {
        setRoomList();
        setInterval(() => {
            setRoomList();
        }, 10000);
    }, [])

        return (
            <table id="InfoList">
                <colgroup>
                    <col width="10%" />
                    <col width="40%"/>
                    <col width="40%"/>
                    <col width="10%" />
                </colgroup>
                <thead>
                    <tr>
                        <th id="RoomName">공간</th>
                        <th id="Schedule">일정</th>
                        <th id="EventSummary">이벤트</th>
                        <th id="Users">참석자</th>
                    </tr>
                </thead>
                <tbody>
                    {roomList.length>0 && roomList.map(room => {return(<Info room={room} onClick={InfoClick}/>)})}
                </tbody>
            </table>
        )
}

export default InfoList;