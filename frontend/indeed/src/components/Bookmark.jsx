import React, { useContext } from "react";
import { BookmarksContext } from "../contexts/BookmarkContext";

//Bookmark component to store the jobs bookmark by the user that will appear under my jobs section
function Bookmark() {
  const { state, dispatch } = useContext(BookmarksContext);//using useContext hook

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
            <p className="text-sm text-gray-600">
              {job.company.display_name}
            </p>
            <p className="text-sm text-gray-600">{job.location.display_name}</p>
            {/* To remove the bookmarked job */}
            <button
              onClick={() => dispatch({ type: "TOGGLE_BOOKMARK", payload: job })}
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
