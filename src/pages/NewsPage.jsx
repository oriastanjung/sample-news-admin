import React, { useEffect, useState } from "react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import axios from "axios";
import config from "../config";
import ListNews from "../component/ListNews";
import { Search } from "iconoir-react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function NewsPage() {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await axios.get(`${config.urlBackend}/api/posts`);
      // console.log(response.data.data)
      setNews(response.data.data);
    };
    setInterval(() => {
      fetchAllUsers();
    }, 5000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredNews = news.filter((item) =>
    item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
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
            List News
          </h2>
          <div className="flex border mb-5 md:mb-0 border-black rounded-lg px-3 py-2 items-center gap-2">
            <Search />
            <input
              className="outline-none"
              type="text"
              placeholder="Cari News"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="flex justify-center md:justify-end my-4">
          <Link to={"/news/create"}>
            <button className="border border-black rounded-lg px-3 py-2 bg-green-500 text-white text-sm duration-300 ease-in-out hover:bg-green-700">
              Buat Berita Baru
            </button>
          </Link>
        </div>

        <div className="hidden md:flex w-full justify-between px-3 py-2 rounded-xl">
          <p className="font-medium">No</p>
          <p className="font-medium">Thumbnail</p>
          <p className="font-medium">Judul</p>
          <p className="font-medium">Tanggal Posting</p>
          <p className="font-medium">Action</p>
        </div>
        {news.length > 0 ? (
          filteredNews.map((item, idx) => (
            <ListNews
              id={item._id}
              no={idx + 1}
              thumbnail={item.thumbnailUrl}
              key={idx}
              name={item.name}
              tanggal={item.createdAt}
            />
          ))
        ) : (
          <p className="text-center p-8">Loading...</p>
        )}
      </main>
      <Footer />
    </>
  );
}

export default NewsPage;
