import React from 'react';

import '../App.css'
//SAlary guide static page
const SalaryGuide = () => {
  return (
    <div className="text-white min-h-screen">
      <div className="bg-blue-900 px-4 pt-20 pb-16 rounded-br-[50px] "> 
        <h1 className="text-2xl font-bold mb-3">Discover your earning potential</h1>
        <p className="mb-10">Explore high-paying careers, salaries, and job openings by industry and location.</p>
      </div>

      <div className="bg-white rounded-lg rounded-tr-[40px] shadow-md p-10 max-w-4xl mx-auto -mt-20">
        <div className="flex flex-col  tablet:flex-row items-center justify-between space-y-4 tablet:space-y-0 tablet:space-x-4">
          <div className="w-full tablet:w-1/2">
            <label htmlFor="job-title" className="block text-gray-700 font-bold mb-2">What</label>
            <input
              type="text"
              id="job-title"
              placeholder="Job title"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="w-full tablet:w-1/2">
            <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Where</label>
            <input
              type="text"
              id="location"
              placeholder="India"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className='btn '>
          <button className="w-full tablet:w-auto bg-blue-900 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 ">
            Search
          </button>
          </div>
        </div>
      </div>

      {/* New section for top-paying jobs by industry */}
      <div className="bg-white p-10 max-w-6xl mx-auto mt-10">
        <h2 className="text-gray-900 text-2xl font-bold mb-6">Browse top-paying jobs by industry</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 laptop:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-900">Elementary School Teacher</h3>
            <p className="font-bold text-blue-900 mb-4">Average GuiSalaryGuide ₹2,44,939 per year</p>
            <a href="#" className="text-gray-900 underline">Job openings</a>
          </div>
          
          <div className="border rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-900">Human Resources Specialist</h3>
            <p className="font-bold text-blue-900 mb-4">Average salary ₹2,66,637 per year</p>
            <a href="#" className =" text-gray-900 underline">Job openings</a>
          </div>

          <div className="border rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-900">Accountant</h3>
            <p className=" font-bold text-blue-900 mb-4">Average salary ₹2,59,285 per year</p>
            <a href="#" className="text-gray-900 underline">Job openings</a>
          </div>

          <div className="border rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-900">Customer Care Specialist</h3>
            <p className="font-bold text-blue-900 mb-4">Average salary ₹2,38,957 per year</p>
            <a href="#" className="text-gray-900 underline">Job openings</a>
          </div>

          <div className="border rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-900">Office Assistant</h3>
            <p className="font-bold text-blue-900 mb-4">Average salary ₹2,00,149 per year</p>
            <a href="#" className="text-gray-900 underline">Job openings</a>
          </div>

          <div className="border rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-900">Back Office Executive</h3>
            <p className="font-bold text-blue-900 mb-4">Average salary ₹4,28,279 per year</p>
            <a href="#" className="text-gray-900 underline">Job openings</a>
          </div>

          <div className="border rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-900">Data Entry Clerk</h3>
            <p className="text-bold text-blue-900 mb-4">Average salary ₹2,63,419 per year</p>
            <a href="#" className="text-gray-900 underline">Job openings</a>
          </div>

          <div className="border rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-900">Graphic Designer</h3>
            <p className="font-bold first-letter:text-blue-900 mb-4">Average salary ₹2,69,761 per year</p>
            <a href="#" className="text-gray-900 underline">Job openings</a>
          </div>

          <div className="border rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-900">Front Desk Manager</h3>
            <p className="font-bold text-blue-900 mb-4">Average salary ₹2,17,139 per year</p>
            <a href="#" className="text-gray-900 underline">Job openings</a>
          </div>
        </div>
      </div>


             
         
    </div>
  );
};

export default SalaryGuide;