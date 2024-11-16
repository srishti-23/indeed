import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { BsBookmark, BsSlashCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BookmarksContext } from "../contexts/BookmarkContext";
import { useAuth } from "../contexts/AuthContext";
import "./home.css";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeTab, setActiveTab] = useState("feed");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]); // State for applied jobs

  const { state, dispatch } = useContext(BookmarksContext);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Fetch job details on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`https://indeed-vmus.onrender.com/api/job/details`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();
        setJobs(data);
        setSelectedJob(data[0]);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Fetch applied jobs when currentUser changes
  useEffect(() => {
    if (currentUser) {
      const fetchAppliedJobs = async () => {
        try {
          const token = localStorage.getItem("authToken");
          const response = await fetch(
            "https://indeed-vmus.onrender.com/api/apply/details",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              credentials: "include",
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch applied jobs");
          }

          const data = await response.json();
          // Extract job IDs from the applied data
          const jobIds = data.flatMap((apply) =>
            apply.jobs.map((job) => job._id.toString())
          );
          setAppliedJobs(jobIds);
        } catch (error) {
          console.error("Error fetching applied jobs:", error);
        }
      };

      fetchAppliedJobs();
    } else {
      setAppliedJobs([]); // Reset appliedJobs if no user is logged in
    }
  }, [currentUser]);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleApplyClick = async (jobId) => {
    if (!currentUser) {
      alert("You need to sign in to apply for this job.");
      navigate("/signup");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`https://indeed-vmus.onrender.com/api/apply/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server response:", errorData);
        throw new Error(errorData.message || "Failed to apply for job");
      }
      
      const newApplication = await response.json();
      setAppliedJobs((prev) => [...prev, jobId])
      // Update context state to include the newly applied job
      dispatch({
        type: "SET_APPLIED_JOBS",
        // payload: [...state.applied, newApplication],
        payload: [...(state.applied || []), newApplication],
      });

      console.log("Job applied successfully:", newApplication);
      
      alert("You have successfully applied for the job.");
  
      
    } catch (error) {
      console.error("Error applying for job:", error);
      alert(error.message || "Error applying for job. Please try again.");
    }
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setActiveTab("feed");
    if (results.length > 0) {
      setSelectedJob(results[0]);
    }
  };

  const toggleBookmark = (job) => {
    if (!currentUser) {
      alert("You need to sign in to bookmark jobs");
      return;
    }
    dispatch({ type: "TOGGLE_BOOKMARK", payload: job });
  };

  return (
    <>
      <div className="items-center z-0 pt-10 flex flex-col mt-20 px-4 tablet:px-8">
        <SearchBar onSearchResults={handleSearchResults} />
      </div>

      <div className="flex justify-center border-b border-gray-200 mt-4 mb-8">
        <button
          className={`p-2 px-4 ${
            activeTab === "feed"
              ? "border-b-2 border-blue-800 font-semibold"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("feed")}
        >
          Jobs For You
        </button>
        <button
          className={`p-2 px-4 ${
            activeTab === "search"
              ? "border-b-2 border-blue-800 font-semibold"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("search")}
        >
          Job Search
        </button>
      </div>

      <div className="flex flex-col laptop:flex-row justify-between max-w-6xl mx-auto mt-10">
        <div className="w-full laptop:w-7/12 laptop:ml-4">
          {loading ? (
            <p>Loading jobs...</p>
          ) : (
            <div className="w-[86%] laptop:max-w-md ml-16 laptop:ml-0">
              {(searchResults.length > 0 ? searchResults : jobs).map((job) => (
                <div
                  key={job._id} // Use job._id as the key for better performance and consistency
                  onClick={() => handleJobClick(job)}
                  className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm mb-4 cursor-pointer"
                >
                  <h2 className="text-lg font-bold text-gray-800">
                    {job.title}
                  </h2>
                  <p className="text-sm text-gray-600 li-none">
                    {job.company.name}
                  </p>
                  <p className="text-sm text-gray-600">{job.location}</p>
                  <ul className="list-none list-inside text-sm text-gray-700 mt-2">
                    {job.jobDescription
                      .split(". ")
                      .slice(0, 2)
                      .map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                  </ul>
                  <p className="text-xs text-gray-500 mt-4">
                    Active {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full laptop:w-5/12">
          {selectedJob && (
            <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold text-gray-800">
                {selectedJob.title}
              </h2>
              <p className="underline text-sm text-gray-600">
                {selectedJob.company.name}
              </p>
              <p className="text-sm text-gray-600">{selectedJob.location}</p>
              <div className="mt-4 flex items-center space-x-2">
                {/* Apply Button */}
                <button
                  onClick={() => handleApplyClick(selectedJob._id)}
                  className={`p-2 rounded-md ${
                    appliedJobs.includes(selectedJob._id)
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-blue-800 text-white"
                  }`}
                  disabled={appliedJobs.includes(selectedJob._id)}
                >
                  {appliedJobs.includes(selectedJob._id)
                    ? "Applied"
                    : "Apply Now"}
                </button>
               
                <button
                  onClick={() => toggleBookmark(selectedJob)}
                  className="p-2 bg-gray-200 text-gray-600 rounded-md"
                >
                  {state.bookmarks.some(
                    (bookmark) => bookmark._id === selectedJob._id
                  ) ? (
                    <BsSlashCircle size={20} />
                  ) : (
                    <BsBookmark size={20} />
                  )}
                </button>

                {/* View Bookmarks Link */}
                <Link to="/bookmark">
                  <button className="ml-2 p-2 bg-gray-200 text-gray-600 rounded-md">
                    View Bookmarks
                  </button>
                </Link>
              </div>

              <p className="text-sm text-gray-700 mt-4">
                {selectedJob.jobDescription}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
