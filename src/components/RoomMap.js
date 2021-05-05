import React from "react";
import RoomBlock from "../atoms/RoomBlock";

class RoomMap extends React.Component {
    render() {
        const colors = {
            "disabled": "#264653",
            "avaliable": "#2A9D8F",
            "booked": "#F4A261",
            "inConference": "#E76F51"
        }
        return (
            <div id="RoomMap">
                <RoomBlock width="400px" height="130px" color={colors.disabled} top="10%" left="0" name="Mommy Talk"/>
                <RoomBlock width="100px" height="100px" color={colors.avaliable} top="40%" left="5%" name="안방"/>
                <RoomBlock width="400px" height="130px" color={colors.disabled} top="65%" left="0" name="Humanscape"/>
                <RoomBlock width="100px" height="100px" color={colors.booked} top="40%" left="30%" name="골방"/>
                <RoomBlock width="80px" height="170px" color={colors.inConference} top="30%" left="39%" name="M1"/>
            </div>
        )
    }
}
 
export default RoomMap;