import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
//Searchbar component for searching the jobs
const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");
  const[locQuery,setLocQuery]=useState("")
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => { //defining function to handle the search
    if (query.trim() === ""  && locQuery.trim()==="") { //checking if the query is empty or not
      alert("Please enter a search query");
      return;
    }
   
    setLoading(true);
    setError(null);
    const url = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=7ba37328&app_key=5cd06c669e15639b874c09749126949e&results_per_page=20&what=${encodeURIComponent(
      query+locQuery
    )}&content-type=application/json`;//url for the api

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data)
      onSearchResults(data.results); // Pass results up to the parent component
    } catch (error) {
      setError("Error fetching data. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") { //to present the search jobs even if the enter key is pressed
      handleSearch();
    }
  };

  return (
    <>
      <div className="flex flex-col tablet:flex-row items-center mb-4 border border-gray-500 rounded-md overflow-hidden shadow-md  w-full max-w-4xl mt-[-7%]">
        <div className="relative w-full tablet:w-auto flex-grow">
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
        <div className="relative w-auto tablet:w-auto flex-grow">
          <FaLocationDot
            size={22}
            className="absolute left-3 top-1.2 text-gray-800 mt-2"
          />
          <input
            type="text"
            value={locQuery}
            onChange={(e) => setLocQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="City, state, zip code, or 'remote'"
            className="p-2 pl-14 w-full md:w-70 mt-1 text-base text-gray-1000 outline-none"
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
