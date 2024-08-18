import React from 'react'
import {NavLink} from 'react-router-dom'
//A footer component to be displayed on the footer of each page of the website 
const Footer = () => {
  return (
    <>
    <footer className="w-full flex flex-col items-center text-gray-500 text-sm my-8 px-4 ">
        <div className="flex flex-wrap justify-center mb-2 text-center">
          <NavLink to="#" className="hover:underline mx-2">Career advice</NavLink>
          <span>|</span>
          <NavLink to="#" className="hover:underline mx-2">Browse Jobs</NavLink>
          <span>|</span>
          <NavLink to="#" className="hover:underline mx-2">Browse Companies</NavLink>
          <span>|</span>
          <NavLink to="#" className="hover:underline mx-2">Salaries</NavLink>
          <span>|</span>
          <NavLink to="#" className="hover:underline mx-2">Indeed Events</NavLink>
          <span>|</span>
          <NavLink to="#" className="hover:underline mx-2">Work at Indeed</NavLink>
          <span>|</span>
          <NavLink to="#" className="hover:underline mx-2">Countries</NavLink>
          <span>|</span>
          <NavLink to="#" className="hover:underline mx-2">About</NavLink>
          <span>|</span>
          <NavLink to="#" className="hover:underline mx-2">Help Centre</NavLink>
          <span>|</span>
          <NavLink to="#" className="hover:underline mx-2">ESG at Indeed</NavLink>
        </div>
        <div className="flex flex-wrap justify-center mb-2 text-center">
          <NavLink to="#" className="hover:underline mx-2">Guidelines for safe job search</NavLink>
          <span>|</span>
          <NavLink to="#" className="hover:underline mx-2">Post a job</NavLink>
        </div>
        <div className="flex flex-wrap justify-center text-center">
          <span className="mx-2">© 2024 Indeed</span>
          <span>|</span>
          <NavLink to="#" className="hover:underline mx-2">Accessibility at Indeed</NavLink>
          <span>|</span>
          <NavLink to="#" className="hover:underline mx-2">Privacy Centre and Ad Choices</NavLink>
          <span>|</span>
          <NavLink to="#" className="hover:underline mx-2">Terms</NavLink>
        </div>
      </footer>
    </>
  )
}

export default Footer
