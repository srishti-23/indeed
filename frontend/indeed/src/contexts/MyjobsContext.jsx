


import React, { createContext, useEffect, useReducer } from "react";

export const MyJobsContext = createContext();

const initialState = {
  applied: [], // Applied jobs should populate here
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_APPLIED_JOBS":
      return { ...state, applied: action.payload || []};
    default:
      return state;
  }
};

export const MyJobsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
 
  
  useEffect(() => {
    async function fetchAppliedJobs() {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          console.error("No token found, please log in.");
          return;
        }

        const response = await fetch(
          "https://indeed-vmus.onrender.com/api/apply/details",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched applied jobs:", data); // Debug log
        const jobs = data.flatMap((apply) => apply.jobs);
        dispatch({ type: "SET_APPLIED_JOBS", payload: jobs });
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    }

    fetchAppliedJobs();
  }, []);
  
   

  return (
    <MyJobsContext.Provider value={{ state, dispatch }}>
      {children}
    </MyJobsContext.Provider>
  );
};
