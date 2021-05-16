import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Info from "../atoms/Info";
import { setClickedRoom } from "../store/modules/ClickedRoom";
import { setRooms } from "../store/modules/Rooms";


const roomList = {
    public: ["PR", "C1", "C2", "C3", "휴방", "주방"],
    humanscape : ["H1", "H2", "H3", "안방", "골방"],
    mommytalk: ["M1", "M2", "M3"]
}

function getRoomNames(organization){
    if (organization==="all"){
        return roomList.public.concat(roomList.humanscape, roomList.mommytalk);
    }
    else if (organization==="humanscape"){
        return roomList.public.concat(roomList.humanscape);

    }
    else if (organization==="mommytalk"){
        return roomList.public.concat(roomList.mommytalk);
    }
    
}

const InfoList = () => {
    const roomList = useSelector(state => state.rooms);
    const organization = useSelector(state => state.organization);
    const userProfile = useSelector(state => state.userProfile);
    const dispatch = useDispatch();
    const InfoClick = e => {
        const roomName = e.currentTarget.getElementsByTagName("td")[0].textContent;
        const clickedRoom = roomList.find(room => {return room.name===roomName});
        if (userProfile===null){
            alert("회의실 예약은 로그인이 필요한 서비스입니다.");
        }
        else{
            dispatch(setClickedRoom(clickedRoom.id));
        }
    }

    useEffect(() => {
        const fetchRooms = async() => {
            const roomNames = getRoomNames(organization);
            const response = await axios.get("http://20.194.27.191:8000/event/");
            const roomDataList = response.data.filter((room) => (roomNames.includes(room.name)));
            dispatch(setRooms(roomDataList));
        }

        fetchRooms();
        setInterval(() => {
            fetchRooms();
        }, 6000);
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
                {roomList.length>0 && roomList.map(room => {return(
                <Info room={room} onClick={InfoClick}/>
                )})}
            </tbody>
        </table>
    )
}
export default InfoList;
