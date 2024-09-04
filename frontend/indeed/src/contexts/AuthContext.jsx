import React, { useContext, useEffect, useState, createContext } from "react";
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
    const token = localStorage.getItem("authToken");

    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      fetch(`https://indeed-app.onrender.com/api/user/status/${user._id}`, {
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
            localStorage.removeItem("user");
            navigate("/login"); // Redirect to login
          }
        })
        .catch((err) => console.log("Error validating token:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const login = async (credentials) => {
    try {
      const response = await fetch("https://indeed-app.onrender.com/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setCurrentUser(data.user);
        navigate("/home"); // Redirect to home after successful login
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
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
