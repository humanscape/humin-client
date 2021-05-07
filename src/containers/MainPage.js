import React from "react";
import RoomMap from "../components/RoomMap";
import SidePanel from "../components/SidePanel";

class MainPage extends React.Component {
    render() {
        return (
            <div id="MainPage">
                <SidePanel/>
                <RoomMap/>
            </div>
        )
    }
}

export default MainPage;