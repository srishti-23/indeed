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
    {/* <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
  <img src={logo} className="w-24 h-10 mx-auto my-auto" alt="logo" />
   
  </a>
  <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Sign in to your account
      </h1>
      <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address or phone number</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="youremail@email.com"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="••••••••"
            required
          />
        </div>
        {errorMessage && (
          <span className="text-red-600 font-bold">{errorMessage}</span>
        )}
        <button
          disabled={isLogging}
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Continue
        </button>
      </form>
    </div>
  </div>
</div> */}

    </>
  );
};

export default Login;
