import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLogging, setisLogging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isLogging) {
      setisLogging(true);
      try {
        await login({ email, password }); 
        navigate("/home"); 
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
          <img src={logo} className="w-24 h-10 mx-auto my-auto" alt="logo" />
        </div>
        <div className="bg-white border border-gray-500 rounded-md w-1/4 mx-auto mt-4 p-4 flex flex-col">
          <h1 className="text-2xl font-bold mx-auto justify-center p-2">Login</h1>
          <form onSubmit={onSubmit} className="mx-auto p-2">
            <div className="container flex flex-col ">
              <label className="justify-center mx-auto">Email address or phone number</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4  py-2  border border-black rounded-md mt-2 "
                placeholder="youremail@email.com "
              />
            </div>
            <input
              type="password"
              value={password}
              className="w-full px-4  py-2  border border-black rounded-md mt-2"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              disabled={isLogging}
              type="submit"
              className="flex items-center mx-auto bg-blue-500 w-[80%] h-12 text-white p-4 my-2 rounded-md hover:bg-blue-600"
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
