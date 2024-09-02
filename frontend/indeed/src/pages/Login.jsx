import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLogging, setisLogging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from AuthContext

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isLogging) {
      setisLogging(true);
      try {
        await login({ email, password }); // Call the login function from AuthContext
        navigate("/home"); // Navigate to home after successful login
      } catch (error) {
        setErrorMessage(
          error.message || "An error occurred. Please try again."
        );
        setisLogging(false);
      }
    }
  };

  return (
    <>
      <div className="bg-[#F3F2F1] min-h-screen flex flex-col items-center justify-center mx-auto">
        <div className="mt-8">
          <img src={logo} className="w-24 h-10 mx-auto" alt="logo" />
        </div>
        <div className="bg-white border border-gray-500 rounded-md w-1/4 mx-auto mt-4 p-4">
          <h1 className="text-xl font-bold mx-auto">Login</h1>
          <form onSubmit={onSubmit} className="mx-auto">
            <div className="container">
              <label>Email address or phone number</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[80%] rounded-md border border-gray-500 mt-2 p-2"
                placeholder="youremail@email.com or 9889755607"
              />
            </div>
            <input
              type="password"
              value={password}
              className="w-[80%] p-2 my-2 border border-black rounded-md"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              disabled={isLogging}
              type="submit"
              className="flex items-center bg-blue-500 w-[80%] h-12 text-white p-4 my-2 rounded-md hover:bg-blue-600"
            >
              <span className="mx-auto font-bold">Continue</span>
            </button>
            {errorMessage && (
              <span className="text-red-600 font-bold">{errorMessage}</span>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;


