import { useState } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../store/modules/UserProfile";

const LoginButton = () => {
    // const [userProfile, setUSerProfile] = useState(null);
    const userProfile = useSelector(state => state.userProfile);
    const dispatch = useDispatch();

    const onLoginGoogle = result => {
        console.log(result);
        dispatch(setProfile(result));
    }
    
    const failLoginGoogle = result => {
        console.log(result);
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
        />:
        <img style={{width:"50px", height:"50px", borderRadius: "50px"}} src={userProfile.profileObj.imageUrl}/>
        }
    </div>
    )
}

export default LoginButton;