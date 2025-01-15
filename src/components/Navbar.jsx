import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSearch, FiMic } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsPlus } from "react-icons/bs";
import ytLogo from "../assets/ytLogo.png";

function Navbar() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search/${searchValue}`);
      setSearchValue("");
    }
  };

  return (
    <div className="h-14 bg-youtube-bg border-b border-youtube-border fixed top-0 left-[64px] right-0 z-10 flex items-center px-4">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-youtube-hover rounded-full">
          <GiHamburgerMenu className="w-6 h-6 text-youtube-text" />
        </button>
        <a href="/" className="flex items-center">
          <img
            src={ytLogo}
            alt="YouTube"
            className="h-6"
          />
        </a>
      </div>

      {/* Center search section */}
      <div className="flex-1 flex justify-center px-4">
        <form onSubmit={handleOnSubmit} className="w-full max-w-[600px] flex">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
            className="flex-1 bg-youtube-card border border-youtube-border rounded-l-full px-4 py-1.5 text-youtube-text placeholder-youtube-text-secondary focus:outline-none focus:border-youtube-text-secondary"
          />
          <button
            type="submit"
            className="bg-youtube-card border border-youtube-border border-l-0 rounded-r-full px-4 py-1.5 hover:bg-youtube-hover"
          >
            <FiSearch className="w-5 h-5 text-youtube-text" />
          </button>
          <button className="ml-2 p-2 bg-youtube-card rounded-full hover:bg-youtube-hover">
            <FiMic className="w-5 h-5 text-youtube-text" />
          </button>
        </form>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-youtube-hover rounded-full">
          <BsPlus className="w-6 h-6 text-youtube-text" />
        </button>
        <button className="p-2 hover:bg-youtube-hover rounded-full relative">
          <IoMdNotificationsOutline className="w-6 h-6 text-youtube-text" />
          <span className="absolute top-0 right-0 bg-youtube-red text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        <button className="w-8 h-8 rounded-full bg-youtube-red flex items-center justify-center text-white font-medium text-sm">
          U
        </button>
      </div>
    </div>
  );
}

export default Navbar;
