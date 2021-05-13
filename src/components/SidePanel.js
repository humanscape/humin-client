import React from "react";
import LoginButton from "../atoms/LoginButton";
import SetEvent from "../atoms/SetEvent";

const SidePanel = () => {
    return (
        <div id="SidePanel">
            {/* <OrganizationBar /> */}
            <LoginButton />
            <SetEvent />
        </div>
    )
};

export default SidePanel;