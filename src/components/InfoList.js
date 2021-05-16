import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Info from "../atoms/Info";
import getRoomNames from "../common/lib/GetRoomNames";
import { setClickedRoom } from "../store/modules/ClickedRoom";
import { setRooms } from "../store/modules/Rooms";

const InfoList = () => {
    const roomList = useSelector(state => state.rooms);
    const organization = useSelector(state => state.organization);
    const userProfile = useSelector(state => state.userProfile);
    const dispatch = useDispatch();

    const InfoClick = e => {
        const roomName = e.currentTarget.getElementsByTagName("td")[0].textContent;
        if (userProfile===null){
            alert("회의실 예약은 로그인이 필요한 서비스입니다.");
        }
        else{
            dispatch(setClickedRoom(roomName));
        }
    }
    const fetchRooms = async() => {
        const roomNames = getRoomNames(organization);
        const response = await axios.get(process.env.REACT_APP_API_BASE_URL+"event/");
        const roomDataList = response.data.filter((room) => (roomNames.includes(room.name)));
        dispatch(setRooms(roomDataList));
    }

    useEffect(() => {
        fetchRooms();
        const nowOrg = organization;
        let getRoomsInterval;
        if (nowOrg===organization){
            getRoomsInterval = setInterval(() => {
                fetchRooms();
            }, 6000);
        }
        return () => clearInterval(getRoomsInterval);
    }, [organization])

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
