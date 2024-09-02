import React, { useState } from "react";
import logo from "../assets/logo.svg";
import './signup.css';
import { useNavigate } from "react-router-dom";
import { doSignInWithGoogle } from "../firebase/auth.js";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import {Link }from "react-router-dom"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");  // New state for name
  const [password, setPassword] = useState("");  // New state for password
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email && name && password) {  // Check that all fields are filled
      try {
        const response = await axios.post("http://localhost:8080/api/user/register", {
          email,
          name,  
          password  
        });

        if (response.status === 201) {
          navigate("/login", { state: { email } });
        }
      } catch (err) {
        console.error("Error details:", err.response || err.message || err);
        setError("Failed to submit the form. Please try again.");
      }
    } else {
      setError("Please fill in all required fields.");
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!signingIn) {
      setSigningIn(true);
      try {
        await doSignInWithGoogle();
        alert("Successfully signed in!");
        navigate("/home");
      } catch (err) {
        setSigningIn(false);
        setError(err.message);
      }
    }
  };

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      marginTop: "40px",
    },
    line: {
      flexGrow: 1,
      height: "1px",
      backgroundColor: "#000",
      border: "none",
    },
    text: {
      margin: "0 10px",
      whiteSpace: "nowrap",
    },
  };

  return (
    <>
      <div className="bg-[#F3F2F1] min-h-screen flex flex-col items-center">
        <div className="mt-8">
          <img src={logo} className="w-24 h-10" />
        </div>
        <div className="bg-white border border-gray-500 rounded-md w-1/3 mt-4 p-4">
          <h1 className="text-xl font-medium">Ready to take the next step?</h1>
          <h4 className="text-gray-500">Create an account or sign in.</h4>
          <p className="text-gray-500 text-sm mt-4">
            By creating an account or signing in, you understand and agree to
            Indeed's Terms. You also consent to our Cookie and Privacy policies.
            You will receive marketing messages from Indeed and may opt out at
            any time by following the unsubscribe link in our messages, or as
            detailed in our terms.
          </p>
          <button
            disabled={signingIn}
            onClick={onGoogleSignIn}
            className="border border-gray-500 mt-2 rounded-md flex social-btn hover:border hover:border-blue-500 hover:bg-[#EEF1FE]"
          >
            <FcGoogle className="icon" />{" "}
            {signingIn ? "Signing In..." : "Continue with Google"}
          </button>

          <div style={styles.container}>
            <hr style={styles.line} />
            <span style={styles.text}>Or</span>
            <hr style={styles.line} />
          </div>
          <div>
            <h4 className="font-bold">
              Email address or phone number
              <span className="text-red-500"> * </span>{" "}
            </h4>
            <p className="text-gray-500 text-sm">
              If using a phone number, make sure that it is eligible to receive
              both WhatsApp and SMS messages.
            </p>
            <form onSubmit={onSubmit}>
            <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-500 mt-2 p-2"
              placeholder="Your name"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-500 mt-2 p-2"
              placeholder="Your password"
            />
          </div>
          {/* Existing email input and form submission */}
          <div>
            <label>Email address or phone number</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-500 mt-2 p-2"
              placeholder="youremail@email.com or 9889755607"
            />
          </div>
         
          <button
            type="submit"
            className="relative mt-4 p-2 rounded-md flex w-full p-2 text-white bg-blue-800"
          >
            <span className=" mx-auto font-medium">Continue</span>
            <IoIosArrowRoundForward
              size={26}
              className="text-white absolute left-64"
            />
          </button>
          <p className="mt-4 ">
              Already registered? 
              <Link to="/login">
              <span className="underline text-blue-400 cursor-pointer">Login</span>
              </Link>
              </p>
              
          
              <div className="mt-4 border-border-red-500">
                {error && <span className="text-red-600 font-bold">{error}</span>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
