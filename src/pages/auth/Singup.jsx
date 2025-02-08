import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import logo from "../../assets/icon_3_white.png";
import logoBLack from "../../assets/icon_3_black.png";
import axios from "axios";
import GLoginButton from "./components/GLoginButton";
import Button from "../../components/Button"; 

import CloseEye from "../../components/Icons/CloseEye";
import LoadingCircle from "../../components/Icons/LoadingCircle";
import OpenEye from "../../components/Icons/OpenEye";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    setLoading(true);
    toast
      .promise(
        axios.post(`${import.meta.env.VITE_API_URL}/user/register`, {
          username: formData.username,
          password: formData.password,
        }),
        {
          loading: "Creating your account...",
          success: () => {
            navigate("/login");
            return <b>Registration successful!</b>;
          },
          error: (error) => {
            if (error.response?.status === 409) {
              return <b>Username already taken!</b>;
            }
            return <b>Something went wrong!</b>;
          },
        }
      )
      .finally(() => setLoading(false));
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const passwordsMatch = formData.password === formData.confirmPassword;

  return (
    <div className=" min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex gap-8">
        <form
          onSubmit={handleSubmit}
          className="  sm:min-w-[500px] sm:h-[600px]  flex flex-col justify-center space-y-8 bg-white p-8 rounded-lg shadow-md relative"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Register{" "}
                <span className="lg:hidden ">
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
                  onClick={() => togglePasswordVisibility("password")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <CloseEye /> : <OpenEye />}
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={!formData.password}
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 
                                                            ${
                                                              formData.confirmPassword &&
                                                              !passwordsMatch
                                                                ? "border-red-500"
                                                                : "border-gray-300"
                                                            }`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <CloseEye /> : <OpenEye />}
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center justify-center sm:w-1/2">
              <Button type="submit" loading={loading} disabled={loading}>
                {loading ? (
                  <div className="animate-spin w-5 text-white ">
                    <LoadingCircle />
                  </div>
                ) : (
                  "SIGN UP"
                )}
              </Button>
            </div>
            <div className="flex justify-center align-middle sm:w-1/2">
              <GLoginButton />
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Login here
              </button>
            </p>
          </div>
        </form>

        <div className="max-w-xl w-full h-[600px] bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 rounded-lg shadow-md flex-col items-center justify-center p-8 text-white hidden lg:flex">
          <img src={logo} alt="Coursitory Logo" className="w-36 h-36 mb-6" />
          <h1 className="text-4xl font-bold mb-4">Coursitory</h1>
          <p className="text-center text-lg">
            Join our community of learners and start your amazing journey today.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
