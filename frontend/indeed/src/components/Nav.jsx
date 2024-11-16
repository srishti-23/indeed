// import React, { useState } from "react";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import msg from "../assets/msg.svg";
// import Profile from "../assets/Profile.svg";
// import notification from "../assets/notification.svg";
// import { FaBars, FaTimes } from "react-icons/fa";
// import "./Nav.css";
// import { useAuth } from "../contexts/AuthContext";


// //Navbar component with all links to the different pages of the website
// const Nav = () => {
//   const [nav, setNav] = useState(false);
//   const { userLoggedIn } = useAuth();//using auth to check whether user has signed in or not
//   const navigate = useNavigate();

//   //to handle the logout 
//   const handleLogout = async () => {
//     try {
//       await auth.signOut();
//       navigate("/");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <>
//       {/* Desktop Navigation */}
//       <div className="desktop-nav hidden laptop:flex justify-between items-center p-4 text-base z-10">
//         {/* Left Section: Logo + Links */}
//         <div className="flex items-center list-none gap-4 absolute top-0 left-40 left-section">
//           <NavLink to="/home" className="hover-underline mt-6">
//             Home
//           </NavLink>
//           <NavLink to="/companyReviews" className="hover-underline mt-6">
//             Company reviews
//           </NavLink>
//           <NavLink to="/salaryGuide" className="hover-underline mt-6">
//             Salary guide
//           </NavLink>
//           <NavLink to="/bookmark" className="hover-underline mt-6">
//             My Jobs
//           </NavLink>
//         </div>

//         {/* Right Section: Icons */}
//         {userLoggedIn ? (
//           <ul className="flex list-none gap-2 items-center">
//             <li className="ml-10 hover-underline hover:bg-sky-100 h-[68px] hover:rounded-md">
//               <img
//                 src={msg}
//                 alt="msg icon"
//                 className="w-10 h-6 text-[#2D2D2D] cursor-pointer mt-4 icon"
//               />
//             </li>

//             <NavLink
//               to="/notification"
//               className="hover-underline hover:bg-sky-100 h-[68px] hover:rounded-md"
//             >
//               <img
//                 src={notification}
//                 alt="notification icon"
//                 className="w-10 h-6 text-[#2D2D2D] cursor-pointer mt-4 icon"
//               />
//             </NavLink>

//             <li className="profile-icon hover-underline hover:bg-sky-100 h-[68px] hover:rounded-md">
//               <img
//                 src={Profile}
//                 alt="Profile icon"
//                 className="w-10 h-6 text-[#2D2D2D] cursor-pointer mt-4 icon"
//                 onClick={handleLogout}
//               />
//             </li>

//             <li className="w-8 h-10 mt-4">|</li>
//           </ul>
//         ) : (
//           //if the user has not signed in then to show the button otherwise the icons
//           <Link to="/signup">
//             <span className="font-medium text-blue-500 mr-4">Sign in</span>
//           </Link>
//         )}
//         <li className="font-thin tracking-normal list-none">
//           Employers/Post job
//         </li>
//       </div>

//       {/* Hamburger Icon 
//       To be displayed for smaller screens */}
//       <div
//         onClick={() => setNav(!nav)}
//         className="hamburger-icon laptop:hidden cursor-pointer pr-4 z-10 text-gray-500 absolute top-4 right-2"
//       >
//         {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
//       </div>

//       {/* Mobile Navigation */}
//       {nav && (
//         <div className="mobile-nav">
//           <div className="absolute top-4 right-4">
//             <FaTimes
//               size={30}
//               onClick={() => setNav(false)} // Close nav when clicked
//               className="cursor-pointer text-gray-500"
//             />
//           </div>
//           <NavLink
//             to="/home"
//             className="list-none mx-auto my-4"
//             onClick={() => setNav(false)}
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/companyReviews"
//             className="list-none mx-auto my-4"
//             onClick={() => setNav(false)}
//           >
//             Company reviews
//           </NavLink>
//           <NavLink
//             to="/salaryGuide"
//             className="list-none mx-auto my-4"
//             onClick={() => setNav(false)}
//           >
//             Salary guide
//           </NavLink>
//           <NavLink
//             to="/profile"
//             className="list-none mx-auto my-4"
//             onClick={() => setNav(false)}
         
//           >
//             Profile
//           </NavLink>
//           <NavLink
//             to="/bookmark"
//             className="list-none mx-auto my-4"
//             onClick={() => setNav(false)}
//           >
//             My Jobs
//           </NavLink>
//         </div>
//       )}
//     </>
//   );
// };

// export default Nav;
import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import msg from "../assets/msg.svg";
import Profile from "../assets/Profile.svg";
import notification from "../assets/notification.svg";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Nav.css";
import { useAuth } from "../contexts/AuthContext";

// Navbar component with all links to the different pages of the website
const Nav = () => {
  const [nav, setNav] = useState(false);
  const { currentUser, logout } = useAuth(); // Using currentUser from AuthContext
  const navigate = useNavigate();

  // To handle the logout 
  const handleLogout = async () => {
    try {
      logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="desktop-nav hidden laptop:flex justify-between items-center p-4 text-base z-10">
        {/* Left Section: Logo + Links */}
        <div className="flex items-center list-none gap-4 absolute top-0 left-40 left-section">
          <NavLink to="/home" className="hover-underline mt-6">
            Home
          </NavLink>
          <NavLink to="/companyReviews" className="hover-underline mt-6">
            Company reviews
          </NavLink>
          <NavLink to="/salaryGuide" className="hover-underline mt-6">
            Salary guide
          </NavLink>
          <NavLink to="/myjobs" className="hover-underline mt-6">
            My Jobs
          </NavLink>
        </div>

        {/* Right Section: Icons */}
        {currentUser ? (
          <ul className="flex list-none gap-2 items-center">
            <li className="ml-10 hover-underline hover:bg-sky-100 h-[68px] hover:rounded-md">
              <img
                src={msg}
                alt="msg icon"
                className="w-10 h-6 text-[#2D2D2D] cursor-pointer mt-4 icon"
              />
            </li>

            <NavLink
              to="/notification"
              className="hover-underline hover:bg-sky-100 h-[68px] hover:rounded-md"
            >
              <img
                src={notification}
                alt="notification icon"
                className="w-10 h-6 text-[#2D2D2D] cursor-pointer mt-4 icon"
              />
            </NavLink>

            <li className="profile-icon hover-underline hover:bg-sky-100 h-[68px] hover:rounded-md">
              <img
                src={Profile}
                alt="Profile icon"
                className="w-10 h-6 text-[#2D2D2D] cursor-pointer mt-4 icon"
                onClick={handleLogout}
              />
            </li>

            <li className="w-8 h-10 mt-4">|</li>
          </ul>
        ) : (
          // If the user has not signed in, show the Sign in button
          <Link to="/signup">
            <span className="font-medium text-blue-500 mr-4">Sign in</span>
          </Link>
        )}
        <li className="font-thin tracking-normal list-none">
          Employers/Post job
        </li>
      </div>

      {/* Hamburger Icon for smaller screens */}
      <div
        onClick={() => setNav(!nav)}
        className="hamburger-icon laptop:hidden cursor-pointer pr-4 z-10 text-gray-500 absolute top-4 right-2"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {/* Mobile Navigation */}
      {nav && (
        <div className="mobile-nav">
          <div className="absolute top-4 right-4">
            <FaTimes
              size={30}
              onClick={() => setNav(false)} // Close nav when clicked
              className="cursor-pointer text-gray-500"
            />
          </div>
          <NavLink
            to="/home"
            className="list-none mx-auto my-4"
            onClick={() => setNav(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/companyReviews"
            className="list-none mx-auto my-4"
            onClick={() => setNav(false)}
          >
            Company reviews
          </NavLink>
          <NavLink
            to="/salaryGuide"
            className="list-none mx-auto my-4"
            onClick={() => setNav(false)}
          >
            Salary guide
          </NavLink>
          <NavLink
            to="/profile"
            className="list-none mx-auto my-4"
            onClick={() => setNav(false)}
          >
            Profile
          </NavLink>
          <NavLink
            to="/myjobs"
            className="list-none mx-auto my-4"
            onClick={() => setNav(false)}
          >
            My Jobs
          </NavLink>
        </div>
      )}
    </>
  );
};

export default Nav;
