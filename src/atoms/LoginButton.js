import GoogleLogin, { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { dropToken, setToken } from "../store/modules/AccessToken";
import { dropClickedRoom } from "../store/modules/ClickedRoom";
import { DROPOrganization, SETOrganization } from "../store/modules/Organization";
import { dropRooms } from "../store/modules/Rooms";
import { dropProfile, setProfile } from "../store/modules/UserProfile";

const LoginButton = () => {
    const userProfile = useSelector(state => state.userProfile);
    const dispatch = useDispatch();

    const refreshTokenSetup = response => {
        const refreshToken = async() => {
            const newAuthRes = await response.reloadAuthResponse();
            dispatch(setToken(newAuthRes.access_token));

            setTimeout(refreshToken, 3600000);
        }
        setTimeout(refreshToken, 3600000);
    }

    const onLoginGoogle = response => {
        const domain = response.profileObj.email.split("@")[1];
        dispatch(setProfile(response));
        dispatch(setToken(response.tokenObj.access_token))
        if (domain==="humanscape.io"){
            dispatch(SETOrganization("humanscape"));
        }
        else if (domain==="mmtalk.kr"){
            dispatch(SETOrganization("mommytalk"));
        }
        refreshTokenSetup(response);
    }
    
    const failLoginGoogle = () => {
        alert("로그인 실패");
    }

    const onLogoutGoogle = () => {
        dispatch(DROPOrganization());
        dispatch(dropRooms());
        dispatch(dropProfile());
        dispatch(dropClickedRoom());
        dispatch(dropToken());
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
            isSignedIn={true}
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