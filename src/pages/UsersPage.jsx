import React, { useEffect, useState } from "react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import axios from "axios";
import config from "../config";
import ListUser from "../component/ListUser";
import { Search } from "iconoir-react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await axios.get(`${config.urlBackend}/api/users`);
      setUsers(response.data.data);
    };
    setInterval(() => {
      fetchAllUsers();
    }, 5000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const token = Cookies.get("token");
  
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      return;
    }
  }, []);
  return (
    <>
      <NavBar />
      <main className="mb-10 px-3 py-2 min-h-screen max-h-screen overflow-scroll">
        <div className="flex md:flex-row flex-col justify-between items-center">
          <p></p>
          <h2 className="text-center font-medium mt-5 mb-8 text-lg">
            List Users
          </h2>
          <div className="flex border mb-5 md:mb-0 border-black rounded-lg px-3 py-2 items-center gap-2">
            <Search />
            <input
              className="outline-none"
              type="text"
              placeholder="Cari User"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="hidden md:flex w-full justify-between px-3 py-2 rounded-xl">
          <p className="font-medium">No</p>
          <p className="font-medium">Username</p>
          <p className="font-medium">Email</p>
          <p className="font-medium">Action</p>
        </div>
        {users.length>0 ? filteredUsers.map((user, idx) => (
          <ListUser
            id={user._id}
            no={idx + 1}
            key={idx}
            username={user.username}
            email={user.email}
          />
        )) : <p className="text-center p-8">Loading...</p>}
      </main>
      <Footer />
    </>
  );
}

export default UsersPage;
