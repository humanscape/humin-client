import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import EventClassifier from "../common/lib/EventClassifier";
import map from '../common/images/map.png';
import getCTX from '../common/lib/GetCTX';
import getRoomNames from "../common/lib/GetRoomNames";
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
    const organization = useSelector(state => state.organization);
    const allRoomNameList = getRoomNames("all");
    const canvasClick = roomName => {
        console.log(roomName);
    }
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
            allRoomNameList.forEach(roomName => {
                if (!Object.keys(roomState).includes(roomName)){
                    roomState[roomName] = {color: colors[0]};
                }
            })
            const canvas = canvasRef.current;
            const ctx = getCTX(canvas);
            ctx.font = "20px sans-serif, 나눔고딕코딩";
            //안방
            ctx.fillStyle = roomState["안방"].color;
            ctx.fillRect(roomDrawLocation.안방[0], roomDrawLocation.안방[1], roomDrawLocation.안방[2]-roomDrawLocation.안방[0], roomDrawLocation.안방[3]-roomDrawLocation.안방[1]);
            ctx.fillStyle = "black";
            ctx.fillText("안방", 22, 235);
        
            //골방
            ctx.fillStyle = roomState["골방"].color;
            ctx.fillRect(roomDrawLocation.골방[0], roomDrawLocation.골방[1], roomDrawLocation.골방[2]-roomDrawLocation.골방[0], roomDrawLocation.골방[3]-roomDrawLocation.골방[1]);
            ctx.fillStyle = "black";
            ctx.fillText("골방", 228, 242);
        
            //M1
            ctx.fillStyle = roomState["M1"].color;
            ctx.fillRect(roomDrawLocation.M1[0], roomDrawLocation.M1[1], roomDrawLocation.M1[2]-roomDrawLocation.M1[0], roomDrawLocation.M1[3]-roomDrawLocation.M1[1]);
            ctx.fillStyle = "black";
            ctx.fillText("M1", 290, 215);
        
            //M2
            ctx.fillStyle = roomState["M2"].color;
            ctx.fillRect(roomDrawLocation.M2[0], roomDrawLocation.M2[1], roomDrawLocation.M2[2]-roomDrawLocation.M2[0], roomDrawLocation.M2[3]-roomDrawLocation.M2[1]);
            ctx.fillStyle = "black";
            ctx.fillText("M2", 353, 60);
            
            //M3
            ctx.fillStyle = roomState["M3"].color;
            ctx.fillRect(roomDrawLocation.M3[0], roomDrawLocation.M3[1], roomDrawLocation.M3[2]-roomDrawLocation.M3[0], roomDrawLocation.M3[3]-roomDrawLocation.M3[1]);
            ctx.fillStyle = "black";
            ctx.fillText("M3", 353, 122);
            
            //H1
            ctx.fillStyle = roomState["H1"].color;
            ctx.fillRect(roomDrawLocation.H1[0], roomDrawLocation.H1[1], roomDrawLocation.H1[2]-roomDrawLocation.H1[0], roomDrawLocation.H1[3]-roomDrawLocation.H1[1]);
            ctx.fillStyle = "black";
            ctx.fillText("H1", 360, 340);
            
            //H2
            ctx.fillStyle = roomState["H2"].color;
            ctx.fillRect(roomDrawLocation.H2[0], roomDrawLocation.H2[1], roomDrawLocation.H2[2]-roomDrawLocation.H2[0], roomDrawLocation.H2[3]-roomDrawLocation.H2[1]);
            ctx.fillStyle = "black";
            ctx.fillText("H2", 440, 412);
        
            //H3
            ctx.fillStyle = roomState["H3"].color;
            ctx.fillRect(roomDrawLocation.H3[0], roomDrawLocation.H3[1], roomDrawLocation.H3[2]-roomDrawLocation.H3[0], roomDrawLocation.H3[3]-roomDrawLocation.H3[1]);
            ctx.fillStyle = "black";
            ctx.fillText("H3", 360, 415);
        
            //PR Room
            ctx.fillStyle = roomState["PR"].color;
            ctx.fillRect(roomDrawLocation.PR[0], roomDrawLocation.PR[1], roomDrawLocation.PR[2]-roomDrawLocation.PR[0], roomDrawLocation.PR[3]-roomDrawLocation.PR[1]);
            ctx.fillStyle = "black";
            ctx.fillText("PR", 440, 300);
            ctx.fillText("Room", 430, 320);
            
            //주방
            ctx.fillStyle = roomState["주방"].color;
            ctx.fillRect(roomDrawLocation.주방[0], roomDrawLocation.주방[1], roomDrawLocation.주방[2]-roomDrawLocation.주방[0], roomDrawLocation.주방[3]-roomDrawLocation.주방[1]);
            ctx.fillStyle = "black";
            ctx.fillText("주방", 545, 340);
        
            //C1
            ctx.fillStyle = roomState["C1"].color;
            ctx.fillRect(roomDrawLocation.C1[0], roomDrawLocation.C1[1], roomDrawLocation.C1[2]-roomDrawLocation.C1[0], roomDrawLocation.C1[3]-roomDrawLocation.C1[1]);
            ctx.fillStyle = "black";
            ctx.fillText("C1",642, 295);
        
            //C2
            ctx.fillStyle = roomState["C2"].color;
            ctx.fillRect(roomDrawLocation.C2[0], roomDrawLocation.C2[1], roomDrawLocation.C2[2]-roomDrawLocation.C2[0], roomDrawLocation.C2[3]-roomDrawLocation.C2[1]);
            ctx.fillStyle = "black";
            ctx.fillText("C2", 642, 350);
        
            //C3
            ctx.fillStyle = roomState["C3"].color;
            ctx.fillRect(roomDrawLocation.C3[0], roomDrawLocation.C3[1], roomDrawLocation.C3[2]-roomDrawLocation.C3[0], roomDrawLocation.C3[3]-roomDrawLocation.C3[1]);
            ctx.fillStyle = "black";
            ctx.fillText("C3", 642, 405);
        
            //휴방
            ctx.fillStyle = roomState["휴방"].color;
            ctx.fillRect(roomDrawLocation.휴방[0], roomDrawLocation.휴방[1], roomDrawLocation.휴방[2]-roomDrawLocation.휴방[0], roomDrawLocation.휴방[3]-roomDrawLocation.휴방[1]);
            ctx.fillStyle = "black";
            ctx.fillText("휴방", 635, 462);
        
            //마미톡
            ctx.fillStyle = colors[0];
            ctx.fillRect(roomDrawLocation.마미톡[0], roomDrawLocation.마미톡[1], roomDrawLocation.마미톡[2]-roomDrawLocation.마미톡[0], roomDrawLocation.마미톡[3]-roomDrawLocation.마미톡[1]);
            ctx.fillStyle = "black";
            ctx.fillText("마미톡", 150, 100);
        
            //휴먼
            ctx.fillStyle = colors[0];
            ctx.fillRect(roomDrawLocation.휴먼[0], roomDrawLocation.휴먼[1], roomDrawLocation.휴먼[2]-roomDrawLocation.휴먼[0], roomDrawLocation.휴먼[3]-roomDrawLocation.휴먼[1]);
            ctx.fillStyle = "black";
            ctx.fillText("휴먼스케이프", 110, 380);
    },[roomList, organization]);

    return (
        <div id="RoomMap">
            <img src={map} id="Map"/>
            <canvas ref={canvasRef}/>
        </div>
    );
};
 
export default RoomMap;