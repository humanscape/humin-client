import React, { createRef, useEffect } from "react";
import { useSelector } from "react-redux";
import EventClassifier from "../common/lib/EventClassifier";
const RoomMap = () => {

    const colors = ["#264653", "#2A9D8F", "#F4A261", "#E76F51"]

    const canvasRef = React.createRef();
    const roomList = useSelector(state => state.rooms);
    const roomState = {};
    useEffect(() => {
        if (roomList.length>0){            
            roomList.forEach(room => {
                let color = colors[1];
                if (room.events.length>0){
                    const eventTimeStamp = Date.parse(room.events[0].start_time);
                    color = colors[EventClassifier(eventTimeStamp)]
                }
                roomState[room.name] = {color: color}
            });
            
            const ctx = canvasRef.current.getContext("2d");

            //안방
            ctx.fillStyle = roomState["안방"].color;
            ctx.fillRect(0, 60, 30, 20);

            //골방
            ctx.fillStyle = roomState["골방"].color;
            ctx.fillRect(50, 60, 30, 20);

            //M1
            ctx.fillStyle = colors[0];
            ctx.fillRect(100, 55, 30, 30);
    
            //M2
            ctx.fillStyle = colors[0];
            ctx.fillRect(130, 0, 30, 20);
    
            //M3
            ctx.fillStyle = colors[0];
            ctx.fillRect(130, 20, 30, 20);
            
            //H1
            ctx.fillStyle = roomState["H1"].color;
            ctx.fillRect(130, 100, 30, 20)
            
            //H2
            ctx.fillStyle = roomState["H2"].color;
            ctx.fillRect(160, 120, 40, 20)

            //H3
            ctx.fillStyle = roomState["H3"].color;
            ctx.fillRect(130, 120, 30, 20)

            //PR Room
            ctx.fillStyle = roomState["PR Room"].color;
            ctx.fillRect(160, 80, 40, 40)
            
            //주방
            ctx.fillStyle = roomState["주방"].color;
            ctx.fillRect(200, 80, 50, 60);

            //C1
            ctx.fillStyle = roomState["C1"].color;
            ctx.fillRect(260, 70, 30, 20);

            //C2
            ctx.fillStyle = roomState["C2"].color;
            ctx.fillRect(260, 90, 30, 20);

            //C3
            ctx.fillStyle = roomState["C3"].color;
            ctx.fillRect(260, 110, 30, 20);

            //휴방
            ctx.fillStyle = roomState["휴방"].color;
            ctx.fillRect(260, 130, 30, 20);

            //마미톡
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 130, 40);
    
            //휴먼
            ctx.fillRect(0, 100, 130, 40)
        }
    }, [roomList])

    return (
        <div id="RoomMap">
            <canvas ref={canvasRef}/>
        </div>
    );
};
 
export default RoomMap;