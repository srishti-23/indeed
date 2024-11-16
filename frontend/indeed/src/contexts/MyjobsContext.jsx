// import {React,createContext,useEffect,useReducer} from "react";
// import axios from "axios";

// const initialState={applied:[]}

// function reducer(state,action){
//     switch(action.type){
//         case "APPLY":
//             return{...state,applied:action.payload}
//         default:
//             return state
//     }

// }
// export const MyJobsContext=createContext()
// export const MyJobsContextProvider=({children})=>{
//     const[state,dispatch]=useReducer(reducer,initialState)

//     useEffect(() => {
//         async function fetchappliedJobs() {
//             try {
//                 const response = await axios.get('http://localhost:8080/api/apply/details', { withCredentials: true });
//                 console.log('Fetched applied jobs:', response.data); // Debugging line
//                 dispatch({ type: "APPLY", payload: response.data });
//             } catch (error) {
//                 console.error("Failed to fetch applied jobs", error);
//             }
//         }
//         fetchappliedJobs();
//     }, []);

//     return (
//         <MyJobsContext.Provider value={{state,dispatch}}>
//             {children}

//         </MyJobsContext.Provider>
//     )

// }
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
  // useEffect(() => {
  //   async function fetchAppliedJobs() {
  //     try {
  //       const response = await fetch('http://localhost:8080/api/apply/details');
  //       const jobs = await response.json();
  //       dispatch({ type: 'SET_APPLIED_JOBS', payload: jobs });
  //     } catch (error) {
  //       console.error('Error fetching applied jobs:', error);
  //     }
  //   }

  //   fetchAppliedJobs();
  // }, []);
  useEffect(() => {
    async function fetchAppliedJobs() {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          console.error("No token found, please log in.");
          return;
        }

        const response = await fetch(
          "http://localhost:8080/api/apply/details",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // const response = await fetch('http://localhost:8080/api/apply/details', {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('token')}`,
        //   },
        // });

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
  // useEffect(() => {
  //   const fetchAppliedJobs = async () => {
  //     try {
  //       const token = localStorage.getItem("authToken");
  //       if (!token) return;
  
  //       const response = await fetch("http://localhost:8080/api/apply/details", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         credentials: "include",
  //       });
  
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch applied jobs");
  //       }
  
  //       const data = await response.json();
  //       const jobIds = data.flatMap((apply) =>
  //         apply.jobs.map((job) => job._id.toString())
  //       );
  
  //       // Update Context State
  //       dispatch({ type: "SET_APPLIED_JOBS", payload: jobIds });
  //     } catch (error) {
  //       console.error("Error fetching applied jobs:", error);
  //     }
  //   };
  
  //   fetchAppliedJobs();
  // }, []);
  

  return (
    <MyJobsContext.Provider value={{ state, dispatch }}>
      {children}
    </MyJobsContext.Provider>
  );
};
