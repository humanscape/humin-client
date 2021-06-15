import React from "react";
import ColorBar from "../atoms/ColorBar";
import RoomMap from "../components/RoomMap";
import SidePanel from "../components/SidePanel";

class Main extends React.Component {
    render() {
        return (
            <div id="MainPage">
                <ColorBar/>
                <SidePanel/>
                <RoomMap/>
            </div>
        )
    }
}

export default Main;