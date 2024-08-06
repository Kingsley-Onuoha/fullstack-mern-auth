import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((store) => store.user);
  
  return (
    <div className="bg-slate-200 flex justify-between items-center mx-auto p-6">
      <Link to="/">
        <h1 className="font-bold">Auth App</h1>
      </Link>
      <div className="flex gap-4 items-center">
        <Link to="/">
          <h3>Home</h3>
        </Link>
        <Link to="/about">
          <h3>About</h3>
        </Link>
        <Link to="/profile">
          {currentUser ? (
            <img
              className="rounded-full h-7 w-7 object-cover"
              src={currentUser.profilePhoto}
              alt="profile-picture"
            />
          ) : (
            <h3>Sign In</h3>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;
