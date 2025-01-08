import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/authContext"; // Ensure this exists
import { useNavigate } from "react-router-dom"; // Ensure `react-router-dom` is properly installed

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };

  return (
    <div
      className="flex flex-col items-center h-screen justify-center space-y-6"
      style={{
        backgroundColor: "#7b6b9b",
        backgroundImage: `linear-gradient(
          rgba(123, 107, 155, 0.8),
          rgba(91, 64, 147, 0.8)
        ), url('/img.png')`, // Updated path for React's `public` folder
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative h-screen flex justify-center items-center">
        {/* Logo */}
        <h2 className="absolute top-10 text-white text-3xl ">
          <img
            style={{paddingBottom:20, width: "200px", height: "200px" }}
            src="/shakashifts.gif"
            alt="Shaka Shifts"
          />
        </h2>

        {/* Login Form */}
        <div className="border shadow p-6 w-80 bg-white">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border"
                placeholder="*****"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
              <a href="#" className="text-teal-600">
                Forgot password?
              </a>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-violet-400 text-white py-2 transition duration-300 ease-in-out hover:bg-violet-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
