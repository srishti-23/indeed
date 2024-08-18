import { React } from "react";
import logo from "../assets/logo.svg";
import Nav from './Nav';
import { Link } from "react-router-dom";
//Header component containg logo and navbar
const Header = () => {
  return (
    <>
      <header className="sticky top-0 h-20 z-20 flex w-full items-center justify-between border-b border-gray-100 font-sans bg-white">
       <Link to="/">
        <img src={logo} className="w-28  top-0 mb-2 ml-4" /></Link>
        <Nav />
      </header>
    </>
  );
};

export default Header;
