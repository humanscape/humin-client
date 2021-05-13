import React from "react";
import ColorBar from "../atoms/ColorBar";
import RoomMap from "../components/RoomMap";
import SidePanel from "../components/SidePanel";

class MainPage extends React.Component {
    render() {
        return (
            <div id="MainPage">
                <SidePanel/>
                <ColorBar/>
                <RoomMap/>
            </div>
        )
    }
}

export default MainPage;