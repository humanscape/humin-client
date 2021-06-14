import React, { useEffect } from "react";
import getCTX from "../common/lib/GetCTX";

const TimeTable = props => {
    const intToString = int => {
        return int.toString().padStart(2, "0");
    }
    const date = new Date();
    const canvasRef = React.createRef();
    const startTime = 0;
    const endTime = 23;
    const hourHeightRange = 60;
    const fifMinRange = Math.floor(60/4);
    const height=(endTime-startTime+1)*60+"px";

    let mousedown = false;
    let isBeforeSetTime = true;
    let dragList = [];

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
            props.setStartTimeIdx((startTime*4)+startIdx);
            props.setEndTimeIdx((startTime*4)+endIdx);
            isBeforeSetTime=false;
        }
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
        props.setStartTimeIdx(0);
        props.setEndTimeIdx(0);
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
        props.room.events.forEach(event=>{
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
                ctx.fillText(event.summary, 50, startY+(height/2));
            }
        })
        ctx.beginPath();
        ctx.moveTo(40, 0);
        ctx.lineTo(40, 1650);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();

        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        const nowY = (date.getHours()-startTime)*hourHeightRange+(date.getMinutes()*hourHeightRange/60)+10;
        ctx.moveTo(40, nowY);
        ctx.lineTo(200, nowY);
        ctx.closePath();
        ctx.stroke();
    }, [props.room.name])

    return(<canvas id="TimeTable" ref={canvasRef} style={{height: height}}/>);
}

export default TimeTable;