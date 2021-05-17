import React from "react";
import { useSelector } from "react-redux";
import LoginButton from "../atoms/LoginButton";
import SetEvent from "../atoms/SetEvent";

const SidePanel = () => {
    const userProfile = useSelector(state => state.userProfile);

    return (
        <div id="SidePanel">
            <LoginButton />
            {userProfile!==null && <SetEvent />}
        </div>
    )
};

export default SidePanel;