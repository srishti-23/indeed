import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import rating from "../assets/rating.png";
import { useNavigate } from "react-router-dom";

const CompanyReviews = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://api.adzuna.com/v1/api/jobs/gb/top_companies?app_id=7ba37328&app_key=5cd06c669e15639b874c09749126949e&what=cook&content-type=application/json`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.leaderboard) {
          setCompanies(data.leaderboard);
        } else {
          throw new Error("Results not found");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleCompanyClick = (company) => {
    navigate(
      (window.location.href =
        "https://www.ambitionbox.com/list-of-companies")
    );
  };

  return (
    <>
      <div className="max-w-screen-lg mx-auto px-4 laptop:px-8">
        <h1 className="text-3xl tablet:text-4xl laptop:text-5xl font-bold text-[#2D2D2D] mt-12 tablet:mt-20 ml-16 tablet:ml-4">
          Find great places to work
        </h1>
        <h4 className="text-gray-500 mt-6 tablet:mt-8 text-lg tablet:text-xl ml-16 tablet:ml-4">
          Get access to millions of company reviews
        </h4>
        <h4 className="text-lg tablet:text-xl font-medium mt-6 tablet:mt-8 text-[#2D2D2D] ml-16 tablet:ml-4">
          Company name or job title
        </h4>
        <div className="flex flex-col tablet:flex-row items-center justify-center w-full mt-4 laptop:ml-[-7%] ">
          <div className="flex items-center w-full tablet:w-3/5 laptop:w-2/4 relative ">
            <input
              type="text"
              className="border border-b-2 border-[#2557A7] h-10 rounded-md w-[96%] "
            />
            <IoMdSearch
              size={25}
              className="text-gray-400 absolute left-[88%] top-2.5"
            />
          </div>
          <button className="bg-[#2557A7] mr-4 w-full tablet:w-1/4 h-10 text-white font-medium rounded-md mt-4 tablet:mt-0 ">
            Find Companies
          </button>
        </div>
        <p className="mt-2 underline text-[#2557A7] cursor-pointer ml-16 sm:ml-4">
          Do you want to search for salaries?
        </p>

        <div className="mt-8">
          <h1 className="text-2xl md:text-3xl font-bold ml-16 sm:ml-4">
            Popular Companies
          </h1>

          {loading && <p>Loading...</p>}
          {error && (
            <p className="text-red-500">
              Error: {error.message}
            </p>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-4 mt-4 ml-16 sm:ml-4">
              {companies.map((company, index) => (
                <div
                  key={index}
                  onClick={() => handleCompanyClick(company)}
                  className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm mb-4 cursor-pointer"
                >
                  <h2 className="text-md md:text-lg font-bold text-gray-800">
                    {company.canonical_name || "Unknown Company"}
                  </h2>
                  <div className="flex p-2">
                    <FaStar style={{ color: "#facc15" }} />
                    <FaStar style={{ color: "#facc15" }} />
                    <FaStar style={{ color: "#facc15" }} />
                    <FaStar style={{ color: "#facc15" }} />
                    <span className="ml-2 md:ml-auto text-sm md:text-md">
                      9187 reviews
                    </span>
                  </div>
                  <div className="text-sm md:text-md font-medium text-gray-800 flex gap-4">
                    <a
                      href="https://in.indeed.com/cmp/Kpmg-0828bc85/salaries"
                      className="hover:underline"
                    >
                      Salaries
                    </a>
                    <a
                      href="https://in.indeed.com/cmp/Kpmg-0828bc85/faq"
                      className="hover:underline"
                    >
                      Questions
                    </a>
                    <a
                      href="https://in.indeed.com/cmp/Kpmg-0828bc85/jobs"
                      className="hover:underline"
                    >
                      Open jobs
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="w-[80%] md:w-[70%] lg:w-[60%] mx-auto bg-[#F5FBF9] p-4 justify-center font-bold text-md md:text-xl text-gray-800 flex mt-8">
          <img src={rating} className="w-14 h-14 md:w-20 md:h-20 mr-4" />
          Rate your recent employer :
          <div className="bg-white w-24 h-8 flex p-2 ml-4">
            <FaStar className="text-blue hover:text-[#3730a3] mx-auto my-auto" />
            <FaStar className="text-blue hover:text-[#3730a3] mx-auto my-auto" />
            <FaStar className="text-blue hover:text-[#3730a3] mx-auto my-auto" />
            <FaStar className="text-blue hover:text-[#3730a3] mx-auto my-auto" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyReviews;
