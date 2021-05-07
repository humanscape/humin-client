import React from "react";
import ColorBar from "../atoms/ColorBar";
import OrganizationBar from "../atoms/OrganizationBar";

class SidePanel extends React.Component {
    render() {
        return (
            <div id="SidePanel">
                <OrganizationBar />
                <ColorBar />
            </div>
        )
    }
}

export default SidePanel;