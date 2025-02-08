import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
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

        toast.promise(
          axios.post(
            `${import.meta.env.VITE_API_URL}/user/gLogin?email=${btoa(
              data.email
            )}`
          ),
          {
            loading: "Logging in...",
            success: (response) => {
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("isLogged", true);
              navigate("/courses");
              return <b>Login successful!</b>;
            },
            error: (error) => {
              return <b>Something went wrong!</b>;
            },
          }
        );
      }}
      onError={() => {
        toast.error("Login Failed!!");
        console.log("Login Failed!!");
      }}
    />
  );
};

export default GLoginButton;
