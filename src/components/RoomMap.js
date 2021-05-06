import React, { createRef, useEffect } from "react";
import RoomBlock from "../atoms/RoomBlock";
import svg from '../common/map.svg';
const RoomMap = () => {

    const colors = {
        "disabled": "#264653",
        "avaliable": "#2A9D8F",
        "booked": "#F4A261",
        "inConference": "#E76F51"
    }

    const canvasRef = React.createRef();

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.fillRect(50, 50, 125, 125);
    }, [])

    return (
        <div>
            <canvas ref={canvasRef}/>
        </div>
    );
};
 
export default RoomMap;