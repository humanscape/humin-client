import React, { createRef, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import EventClassifier from "../common/lib/EventClassifier";
import map from '../common/images/map.png';
import CanvasResize from "react-canvas-resize";
const RoomMap = () => {

    const getCTX = canvas => {
        var dpr = window.devicePixelRatio || 1;
        var rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        var ctx = canvas.getContext('2d');

        ctx.scale(dpr, dpr);
        return ctx;
    }

    const canvasRef = React.createRef();
    const colors = ["rgba(38, 70, 83, 0.7)", "rgba(42, 157, 143, 0.7)", "rgba(244, 162, 97, 0.7)", "rgba(231, 111, 81, 0.7)"];
    const roomList = useSelector(state => state.rooms);
    const roomState = {};
    useEffect(() => {
        if (roomList.length>0){        
            roomList.forEach(room => {
                let color = colors[1];
                if (room.events.length>0){
                    const eventTime = room.events[0].start_time;
                    color = colors[EventClassifier(eventTime)];
                }
                roomState[room.name] = {color: color}
            });
                const canvas = canvasRef.current;
                const ctx = getCTX(canvas);
                ctx.font = "20px gothic";
                //안방
                ctx.fillStyle = roomState["안방"].color;
                ctx.fillRect(20, 205, 45, 45);
                ctx.fillStyle = "black";
                ctx.fillText("안방", 22, 235);
            
                //골방
                ctx.fillStyle = roomState["골방"].color;
                ctx.fillRect(230, 215, 35, 40);
                ctx.fillStyle = "black";
                ctx.fillText("골방", 228, 242);
            
                //M1
                ctx.fillStyle = colors[0];
                ctx.fillRect(280, 175, 50, 70);
                ctx.fillStyle = "black";
                ctx.fillText("M1", 290, 215);
            
                //M2
                ctx.fillStyle = colors[0];
                ctx.fillRect(345, 20, 45, 70);
                ctx.fillStyle = "black";
                ctx.fillText("M2", 353, 60);
                
                //M3
                ctx.fillStyle = colors[0];
                ctx.fillRect(343, 98, 50, 35)
                ctx.fillStyle = "black";
                ctx.fillText("M3", 353, 122);
                
                //H1
                ctx.fillStyle = roomState["H1"].color;
                ctx.fillRect(343, 296, 60, 80);
                ctx.fillStyle = "black";
                ctx.fillText("H1", 360, 340);
                
                //H2
                ctx.fillStyle = roomState["H2"].color;
                ctx.fillRect(412, 385, 80, 48)
                ctx.fillStyle = "black";
                ctx.fillText("H2", 440, 412);
            
                //H3
                ctx.fillStyle = roomState["H3"].color;
                ctx.fillRect(343, 385, 60, 48)
                ctx.fillStyle = "black";
                ctx.fillText("H3", 360, 415);
            
                //PR Room
                ctx.fillStyle = roomState["PR"].color;
                ctx.fillRect(412, 245, 80, 130)
                ctx.fillStyle = "black";
                ctx.fillText("PR", 440, 300);
                ctx.fillText("Room", 430, 320);
                
                //주방
                ctx.fillStyle = roomState["주방"].color;
                ctx.fillRect(503, 244, 120, 185);
                ctx.fillStyle = "black";
                ctx.fillText("주방", 545, 340);
            
                //C1
                ctx.fillStyle = roomState["C1"].color;
                ctx.fillRect(630, 267, 48, 45);
                ctx.fillStyle = "black";
                ctx.fillText("C1",642, 295);
            
                //C2
                ctx.fillStyle = roomState["C2"].color;
                ctx.fillRect(630, 322, 48, 45);
                ctx.fillStyle = "black";
                ctx.fillText("C2", 642, 350);
            
                //C3
                ctx.fillStyle = roomState["C3"].color;
                ctx.fillRect(630, 378, 48, 45);
                ctx.fillStyle = "black";
                ctx.fillText("C3", 642, 405);
            
                //휴방
                ctx.fillStyle = roomState["휴방"].color;
                ctx.fillRect(630, 432, 48, 45);
                ctx.fillStyle = "black";
                ctx.fillText("휴방", 635, 462);
            
                //마미톡
                ctx.fillStyle = colors[0];
                ctx.fillRect(20, 20, 310, 140);
                ctx.fillStyle = "black";
                ctx.fillText("마미톡", 150, 100);
            
                //휴먼
                ctx.fillStyle = colors[0];
                ctx.fillRect(20, 280, 300, 200);
                ctx.fillStyle = "black";
                ctx.fillText("휴먼스케이프", 110, 380);
        }
    },[roomList]);

    return (
        <div id="RoomMap">
            <img src={map} id="Map"/>
            <canvas ref={canvasRef}/>
        </div>
    );
};
 
export default RoomMap;