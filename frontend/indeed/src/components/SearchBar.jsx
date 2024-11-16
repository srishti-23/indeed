import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");
  const [locQuery, setLocQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (query.trim() === "" && locQuery.trim() === "") {
      alert("Please enter a search query");
      return;
    }

    setLoading(true);
    setError(null);

    // Update the URL to point to your backend search endpoint
    const url = `https://indeed-vmus.onrender.com/api/search?title=${encodeURIComponent(query)}&location=${encodeURIComponent(locQuery)}`;

    try {
      const response = await fetch(url); // Make sure this fetches from your backend
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      onSearchResults(data); // Pass results up to the parent component
    } catch (error) {
      setError("Error fetching data. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="flex flex-col tablet:flex-row items-center mb-4 laptop:border laptop:border-gray-500 rounded-md overflow-hidden shadow-md  w-full max-w-4xl mt-[-7%]">
        <div className="relative w-full tablet:w-auto flex-grow laptop:border-none tablet:border tablet:border-gray-500 ">
          <IoMdSearch
            size={24}
            className="absolute left-4 top-1.5 text-gray-800 mt-1"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Job title, keywords, or company"
            className="p-2 outline-none pl-14 w-full tablet:w-70 border-b tablet:border-b-0 tablet:border-r border-gray-200 mt-1 text-base text-gray-1000"
          />
        </div>
        <div className="relative w-full tablet:w-auto flex-grow ">
          <FaLocationDot
            size={22}
            className="absolute left-4 top-1.5 text-gray-800 mt-1"
          />
          <input
            type="text"
            value={locQuery}
            onChange={(e) => setLocQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="City, state, zip code, or 'remote'"
            className="p-2 pl-14 w-full tablet:w-full mt-1 text-base text-gray-1000 outline-none ml-0"
          />
        </div>
        <button
          onClick={handleSearch}
          className="p-2 m-2 rounded-lg bg-blue-800 text-white w-full tablet:w-auto"
        >
          Find jobs
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </>
  );
};

export default SearchBar;
