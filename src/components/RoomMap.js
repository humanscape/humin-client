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
    return (
        <div>
            <img src={svg}/>
        </div>
    );
};
 
export default RoomMap;