// import {React,useContext} from 'react'
// import { MyJobsContext } from '../contexts/MyjobsContext'
// import axios from "axios"

// const MyJobs = () => {
//   const {state,dispatch}=useContext(MyJobsContext)
//   return (
//    <>
//      <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Applied Jobs</h1>
//       {state.applied.length > 0 ? (
//         state.applied.map((job, index) => (
//           <div
//             key={index}
//             className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm mb-4"
//           >
//             <h2 className="text-lg font-bold text-gray-800">{job.title}</h2>
//             <p className="text-sm text-gray-600">{job.company.display_name}</p>
//             <p className="text-sm text-gray-600">{job.location.display_name}</p>
//             <button
//               onClick={() => handleToggleBookmark(job)}
//               className="mt-2 p-2 bg-gray-200 text-gray-600 rounded-md"
//             >
//               Applied jobs
//             </button>
//           </div>
//         ))
//       ) : (
//         <p className="text-sm text-gray-600">No applied jobs.</p>
//       )}
//     </div>
    
//    </>
//   )
// }

// export default MyJobs
import React, { useContext, useEffect } from "react";
import { MyJobsContext } from "../contexts/MyjobsContext";

function MyJobs() {
  const { state,dispatch } = useContext(MyJobsContext);

  useEffect(() => {
    console.log("Applied jobs in MyJobs component:", state.applied);
  }, [state.applied]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Applied Jobs</h1>
      {state.applied && state.applied.length > 0 ? (
        state.applied.map((job, index) => (
          <div
            key={index}
            className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm mb-4"
          >
            <h2 className="text-lg font-bold text-gray-800">{job.title || "No title available"}</h2>
            <p className="text-sm text-gray-600">{job.company?.name || "No company available"}</p>
            <p className="text-sm text-gray-600">{job.location || "No location available"}</p>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-600">No applied jobs yet.</p>
      )}
    </div>
  );
}

export default MyJobs;


