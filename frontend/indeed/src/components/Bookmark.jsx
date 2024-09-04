import React, { useContext } from "react";
import { BookmarksContext } from "../contexts/BookmarkContext";
import axios from 'axios';

function Bookmark() {
  const { state, dispatch } = useContext(BookmarksContext);

  const handleToggleBookmark = async (job) => {
    const isBookmarked = state.bookmarks.some(
      (bookmark) => bookmark._id === job._id // Ensure this line checks the correct property
    );

    try {
      if (isBookmarked) {
        // Remove bookmark
        await axios.delete(`https://indeed-app.onrender.com/api/bookmark/${job._id}`);
        dispatch({ type: "REMOVE_BOOKMARK", payload: job });
      } else {
        // Add bookmark
        const response = await axios.post("https://indeed-app.onrender.com/api/bookmark", job);
        dispatch({ type: "ADD_BOOKMARK", payload: response.data });
      }
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Bookmarked Jobs</h1>
      {state.bookmarks.length > 0 ? (
        state.bookmarks.map((job, index) => (
          <div
            key={index}
            className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm mb-4"
          >
            <h2 className="text-lg font-bold text-gray-800">{job.title}</h2>
            <p className="text-sm text-gray-600">{job.company.display_name}</p>
            <p className="text-sm text-gray-600">{job.location.display_name}</p>
            <button
              onClick={() => handleToggleBookmark(job)}
              className="mt-2 p-2 bg-gray-200 text-gray-600 rounded-md"
            >
              Remove Bookmark
            </button>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-600">No bookmarked jobs.</p>
      )}
    </div>
  );
}

export default Bookmark;
