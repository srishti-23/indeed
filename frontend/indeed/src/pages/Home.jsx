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

  const { state, dispatch } = useContext(BookmarksContext);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://indeed-app.onrender.com/api/job/details`)
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        setSelectedJob(data[0]);
      })
      .catch((error) => console.error("Error fetching jobs:", error))
      .finally(() => setLoading(false));
  }, []);

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
      const response = await fetch(`https://indeed-app.onrender.com/api/apply/${jobId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to apply for job");
      }

      alert("You have successfully applied for the job.");
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Error applying for job. Please try again.");
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
          className={`p-2 px-4 ${activeTab === "feed"
              ? "border-b-2 border-blue-800 font-semibold"
              : "text-gray-600"
            }`}
          onClick={() => setActiveTab("feed")}
        >
          Jobs For You
        </button>
        <button
          className={`p-2 px-4 ${activeTab === "search"
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
              {(searchResults.length > 0 ? searchResults : jobs).map(
                (job, index) => (
                  <div
                    key={index}
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
                )
              )}
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
                <button
                  onClick={() => handleApplyClick(selectedJob._id)}
                  className="p-2 bg-blue-800 text-white rounded-md"
                >
                  Apply Now
                </button>

                <button
                  onClick={() => toggleBookmark(selectedJob)}
                  className="p-2 bg-gray-200 text-gray-600 rounded-md"
                >
                  {state.bookmarks.some(
                    (bookmark) => bookmark._id === selectedJob._id // Ensure this line checks the correct property
                  ) ? (
                    <BsSlashCircle size={20} />
                  ) : (
                    <BsBookmark size={20} />
                  )}
                </button>

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
