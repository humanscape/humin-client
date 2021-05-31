import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import EventClassifier from "../common/lib/EventClassifier";
import map from '../common/images/map.png';
import getCTX from '../common/lib/GetCTX';
const RoomMap = () => {
    const canvasRef = React.createRef();
    const colors = ["rgba(38, 70, 83, 0.7)", "rgba(42, 157, 143, 0.7)", "rgba(244, 162, 97, 0.7)", "rgba(231, 111, 81, 0.7)"];
    const roomDrawLocation = {
        안방:[20, 205, 65, 250],
        골방: [230, 215, 265, 255],
        M1: [280, 175, 330, 245],
        M2: [345, 20, 390, 90],
        M3: [343, 98, 393, 133],
        H1: [343, 296, 403, 376],
        H2: [412, 385, 492, 433],
        H3: [343, 385, 403, 433],
        PR: [412, 245, 492, 375],
        주방: [503, 244, 623, 429], 
        C1: [630, 267, 678, 312],
        C2: [630, 322, 678, 367], 
        C3: [630, 378, 678, 423],
        휴방: [630, 432, 678, 477],
        마미톡: [20, 20, 330, 160],
        휴먼: [20, 280, 320, 480]
    }
    const roomList = useSelector(state => state.rooms);
    const allRoomNameList = ['안방','골방','M1', 'M2', 'M3', 'H1', 'H2', 'H3', 'PR', '주방', 'C1', 'C2', 'C3', '휴방', '마미톡', '휴먼'];
    const roomState = {};
    useEffect(() => {        
        roomList.forEach(room => {
            let color = colors[1];
            if (room.events.length>0){
                const eventTime = room.events[0].start_time;
                color = colors[EventClassifier(eventTime)];
            }
            roomState[room.name] = {color: color};
        });
        const canvas = canvasRef.current;
        const ctx = getCTX(canvas);
        ctx.font = "20px sans-serif, 나눔고딕코딩";
        allRoomNameList.forEach(roomName => {
            if (!Object.keys(roomState).includes(roomName)){
                roomState[roomName] = {color: colors[0]};
            }
            ctx.fillStyle = roomState[roomName].color;
            ctx.fillRect(roomDrawLocation[roomName][0], roomDrawLocation[roomName][1], roomDrawLocation[roomName][2]-roomDrawLocation[roomName][0], roomDrawLocation[roomName][3]-roomDrawLocation[roomName][1]);
            ctx.fillStyle = "black";
            const textLocation = {
                x: roomDrawLocation[roomName][0]+((roomDrawLocation[roomName][2]-roomDrawLocation[roomName][0])/2)-15,
                y: roomDrawLocation[roomName][1]+((roomDrawLocation[roomName][3]-roomDrawLocation[roomName][1])/2)+5
            }
            ctx.fillText(roomName, textLocation.x, textLocation.y);
        })
    },[roomList]);

    return (
        <div id="RoomMap">
            <img src={map} id="Map"/>
            <canvas ref={canvasRef}/>
        </div>
    );
};
 
export default RoomMap;