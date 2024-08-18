import {React,useState} from "react";
import logo from "../assets/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
//Password page to be displayed if the user is signing using email on clicking continue this page will appear where user can set their password
const Password = () => {
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;//To store the email user has used
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        navigate("/home"); // Navigate to the home page or desired page after successful registration
      } catch (error) {
        setErrorMessage(error.message);
        setIsRegistering(false);
      }
    }
  };

  return (
    <>
      <div className="bg-[#F3F2F1] min-h-screen flex flex-col items-center">
        <div className="mt-8">
          <img src={logo} className="w-24 h-10 mx-auto" />
        </div>
        <div className="bg-white border border-gray-500 rounded-md w-1/4 mx-auto mt-4 p-4">
          <h1 className="text-lg font-bold mx-auto">Sign in with login code</h1>
          {/* email used by user will be displayed here */}
          <p>Create your password as {email}</p> 
          <form onSubmit={onSubmit} className="mx-auto">
            <input
              type="password"
              value={password}
              className="w-60 p-2 my-2 border border-black rounded-md"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              disabled={isRegistering}
              type="submit"
              className="flex items-center bg-blue-500  w-60 h-12 text-white p-4 my-2 rounded-md hover:bg-blue-600"
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

export default Password;
