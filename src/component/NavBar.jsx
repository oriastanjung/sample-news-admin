import { Menu, Xmark } from "iconoir-react";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function NavBar() {
  const [showMenu, setShowMenu] = useState(false);
  const handleLogout = () => {
    Cookies.remove("token");
    window.location.reload()
  };
  return (
    <>
      <nav className="flex w-full justify-between py-2 px-3">
        <Link to={"/"} className="cursor-pointer">
          <h1 className="font-bold">ANAKRANTAU News</h1>
          <p className="text-sm">Admin Dashboard</p>
        </Link>
        <ul className="hidden md:flex flex-row gap-10 justify-center items-center">
          <li className="text-sm hover:underline">
            <Link to={"/users"}>Users Management</Link>
          </li>
          <li className="text-sm hover:underline">
            <Link to={"/news"}>News Management</Link>
          </li>
        </ul>
        <div className="hidden md:block">
          <button
            onClick={handleLogout}
            className="text-sm border border-black py-2 px-3 rounded-xl bg-red-500 text-white hover:bg-red-700 duration-300 ease-in-out"
          >
            Logout
          </button>
        </div>
        <div className="flex md:hidden">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="border border-black p-2 rounded-lg"
          >
            <Menu />
          </button>
        </div>
      </nav>
      <div
        className={`w-full transition-all duration-300 ${
          showMenu ? "flex md:hidden" : "hidden"
        } flex-col fixed z-[100] top-0 h-screen bg-white`}
      >
        <div className="flex justify-end p-3">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="border border-black p-2 rounded-lg"
          >
            <Xmark />
          </button>
        </div>
        <div className="flex justify-center">
          <Link to={"/"} className="cursor-pointer flex flex-col items-center">
            <h1 className="text-2xl font-bold">ANAKRANTAUNews</h1>
            <p className="text-xl">Admin Dashboard</p>
          </Link>
        </div>
        <ul className="mt-20 flex flex-col gap-10 justify-center items-center">
          <li className="border border-black px-3 py-2 rounded-xl text-xl hover:underline">
            <Link to={"/users"}>Users Management</Link>
          </li>
          <li className="border border-black px-3 py-2 rounded-xl text-xl hover:underline">
            <Link to={"/news"}>News Management</Link>
          </li>

          <button
            onClick={handleLogout}
            className="text-sm border border-black py-2 px-3 rounded-xl bg-red-500 text-white hover:bg-red-700 duration-300 ease-in-out"
          >
            Logout
          </button>
        </ul>
      </div>
    </>
  );
}

export default NavBar;
