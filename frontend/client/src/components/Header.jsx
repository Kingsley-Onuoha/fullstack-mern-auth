import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-200 flex justify-between items-center mx-auto p-6">
      <Link to="/"><h1 className="font-bold">Auth App</h1></Link>
      <div className="flex gap-4">
        <Link to="/"><h3>Home</h3></Link>
        <Link to="/about"><h3>About</h3></Link>
        <Link to="/signin"><h3>SignIn</h3></Link>
      </div>
    </div>
  );
};

export default Header;
