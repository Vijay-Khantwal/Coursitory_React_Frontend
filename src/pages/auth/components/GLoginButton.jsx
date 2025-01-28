import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const GLoginButton = () => {
    const navigate = useNavigate();
    return (
        <GoogleLogin
            onSuccess={async (credsResponse) => {
                const data = jwtDecode(credsResponse.credential);
                // console.log(data);
                // console.log(btoa(data.email));
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/user/gLogin?email=${btoa(data.email)}`
                );
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("isLogged", true);
                navigate("/courses");
            }}
            onError={() => {
                console.log("Login Failed!!");
            }}
        />
    );
}

export default GLoginButton