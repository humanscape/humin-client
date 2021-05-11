import React from "react";
import { useSelector } from "react-redux";
import ColorBar from "../atoms/ColorBar";
import LoginButton from "../atoms/LoginButton";
import OrganizationBar from "../atoms/OrganizationBar";
import SetEvent from "../atoms/SetEvent";

const SidePanel = () => {
    return (
        <div id="SidePanel">
            <OrganizationBar />
            <LoginButton />
            <SetEvent />
            <ColorBar />
        </div>
    )
};

export default SidePanel;