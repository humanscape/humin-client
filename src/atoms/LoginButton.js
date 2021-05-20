import GoogleLogin, { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { dropClickedRoom } from "../store/modules/ClickedRoom";
import { DROPOrganization, SETOrganization } from "../store/modules/Organization";
import { dropRooms } from "../store/modules/Rooms";
import { dropProfile, setProfile } from "../store/modules/UserProfile";

const LoginButton = () => {
    const userProfile = useSelector(state => state.userProfile);
    const dispatch = useDispatch();

    const onLoginGoogle = result => {
        const domain = result.profileObj.email.split("@")[1];
        if (domain==="humanscape.io"){
            dispatch(setProfile(result));
            dispatch(SETOrganization("humanscape"));
        }
        else if (domain==="mmtalk.kr"){
            dispatch(setProfile(result));
            dispatch(SETOrganization("mommytalk"));
        }
    }
    
    const failLoginGoogle = () => {
        alert("로그인 실패");
    }

    const onLogoutGoogle = () => {
        dispatch(DROPOrganization());
        dispatch(dropRooms());
        dispatch(dropProfile());
        dispatch(dropClickedRoom());
    }

    return(
    <div id="Login">
        {userProfile===null?
        <GoogleLogin
            scope="https://www.googleapis.com/auth/calendar.events.owned"
            clientId="622765476908-433tdkbvfp6jmeeicp49sblmdsobgcuc.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={onLoginGoogle}
            onFailure={failLoginGoogle}
            cookiePolicy={'single_host_origin'}
            className="LoginButton"
        />:
        <div>
            <img style={{width:"50px", height:"50px", borderRadius: "50px"}} src={userProfile.profileObj.imageUrl} alt="user image"/>
            <GoogleLogout buttonText="Logout" onLogoutSuccess={onLogoutGoogle} className="LogoutButton"/>
        </div>
        }
    </div>
    )
}

export default LoginButton;