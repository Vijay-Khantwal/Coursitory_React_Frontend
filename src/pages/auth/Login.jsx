import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import logo from "../../assets/icon_3_white.png";
import logoBLack from "../../assets/icon_3_black.png";
import axios from "axios";
import GLoginButton from "./components/GLoginButton";
import Button from "../../components/Button";
import { CloseEye, LoadingCircle, OpenEye } from "../../components/Icons";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleAdminToggle = () => {
    setAdmin(!admin);
    toast.success(`Switched to ${!admin ? "Admin" : "User"} Login`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim()) {
      toast.error("Username cannot be empty!");
      return;
    }
    if (!formData.password.trim()) {
      toast.error("Password cannot be empty!");
      return;
    }

    setLoading(true);
    toast
      .promise(
        axios.post(`${import.meta.env.VITE_API_URL}/user/login/${admin}`, {
          username: formData.username,
          password: formData.password,
        }),
        {
          loading: "Logging in...",
          success: (response) => {
            if (admin) {
              localStorage.setItem("adminToken", response.data.token);
              localStorage.setItem("isLogged", true);
              navigate("/admin/dashboard");
              return <b>Login successful!</b>;
            }
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("isLogged", true);
            navigate("/courses");
            return <b>Login successful!</b>;
          },
          error: (error) => {
            if (error.response?.status === 401) {
              return <b>{error.response.data.error}</b>;
            }
            return <b>Something went wrong!</b>;
          },
        }
      )
      .finally(() => setLoading(false));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex gap-8">
        <div className="sm:min-w-[500px] sm:h-[600px]">
          <div
            className={`absolute top-0 left-0 w-full ${
              admin
                ? "bg-gradient-to-r from-purple-600 to-purple-800"
                : "bg-gradient-to-r from-blue-600 to-blue-800"
            }`}
          >
            <button
              type="button"
              onClick={handleAdminToggle}
              className={`absolute top-4 right-4 px-3 py-1 text-sm font-medium rounded-full transition-all duration-300 text-white ${
                admin
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {admin ? "Admin" : "User"}
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full h-full flex flex-col justify-center space-y-8 bg-white p-8 rounded-lg shadow-md overflow-hidden"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                  Welcome Back{" "}
                  <span className="lg:hidden">
                    {" "}
                    to{" "}
                    <img
                      src={logoBLack}
                      alt="Coursitory Logo"
                      className="w-16 h-16 inline"
                    />
                  </span>
                </h2>
              </div>
              <h3 className="text-sm">Please Login to Continue</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? < CloseEye/> : <OpenEye />}
                  </button>
                </div>
              </div>
            </div>
            <Button type="submit" loading={loading} disabled={loading}>
              {loading ? (
                <div className="animate-spin w-5 text-white ">
                  <LoadingCircle />
                </div>
              ) : (
                "LOGIN"
              )}
            </Button>
            <div className="flex items-center justify-center">
              {!admin && <GLoginButton />}
            </div>

            {!admin && (
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Sign up here
                  </button>
                </p>
              </div>
            )}
          </form>
        </div>

        <div className="max-w-xl w-full h-[600px] bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 rounded-lg shadow-md flex-col items-center justify-center p-8 text-white hidden lg:flex">
          <img src={logo} alt="Coursitory Logo" className="w-36 h-36 mb-6" />
          <h1 className="text-4xl font-bold mb-4">Coursitory</h1>
          <p className="text-center text-lg">
            Good to see you again! Keep moving forward in your learning
            experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
