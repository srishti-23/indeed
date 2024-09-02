// import { createContext, useEffect ,useContext,useState} from 'react'
// import {auth} from '../firebase/firebase'
//  const AuthContext= createContext()

//  export const AuthProvider=({children})=>{
//     const [currentUser, setCurrentUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const[userLoggedIn,setUserLoggedIn]=useState(false)


//     useEffect(()=>{
//         const unsubscribe=auth.onAuthStateChanged(
//             user=>{
//                 setCurrentUser(user)
//                 setLoading(false)
//                 setUserLoggedIn(true)

//             }
//         )
//         return unsubscribe
//     },[])
//     const value = {
//         currentUser,
//         userLoggedIn: !!currentUser,
//         loading
//       };
//        return(
//         <AuthContext.Provider value={value}>
//         {!loading && children}
//       </AuthContext.Provider>
//        )

//  };
//  export const useAuth = () => {
//     return useContext(AuthContext);
//   };
import React, { useContext, useEffect, useState ,createContext} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // On app load, check for the token
    const token = localStorage.getItem("authToken"); 

    if (token) {
      // Validate token and get user data
      fetch(`http://localhost:8080/api/user/status`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setCurrentUser(data.user);
          } else {
            localStorage.removeItem("authToken"); // Remove invalid token
          }
        })
        .catch((err) => console.error("Error validating token:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const response = await fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("authToken", data.token); // Store JWT token
      setCurrentUser(data.currentUser); // Set the user data
      navigate("/home"); // Redirect to home page after login
    } else {
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken"); // Remove JWT token
    setCurrentUser(null);
    navigate("/login");
  };

  const value = {
    currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
