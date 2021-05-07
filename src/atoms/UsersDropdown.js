import { useState } from "react";

const UserDropdown = props => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="UserDropdown" onMouseOver={()=>setIsActive(true)} onMouseOut={()=>setIsActive(false)}>
            <h4>{props.users.length-1}명</h4>
            <div className={isActive?"DropdownActive":"DropdownInactive"}>
                {props.users.map(user =>{
                    const user_info=user.username.split("@")
                    if (user_info[1]!=="resource.calendar.google.com"){
                        return <div>{user_info[0]}</div>;
                    }
                })}
            </div>
        </div>
    )
}

export default UserDropdown;