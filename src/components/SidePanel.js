import React from "react";
import ColorBar from "../atoms/ColorBar";
import LoginButton from "../atoms/LoginButton";
import OrganizationBar from "../atoms/OrganizationBar";

class SidePanel extends React.Component {
    render() {
        return (
            <div id="SidePanel">
                <OrganizationBar />
                <LoginButton />
                <ColorBar />
            </div>
        )
    }
}

export default SidePanel;