import React, { useEffect } from "react";
import NavBar from "../component/NavBar";
import HeroHomePage from "../component/HeroHomePage";
import Footer from "../component/Footer";
import Card from "../component/Card";
import { Group, Post } from "iconoir-react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function HomePage() {
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
      <main className="mb-10  px-3 py-2">
        <HeroHomePage />
        <section className="mt-20 flex w-full justify-around flex-wrap gap-5">
          <Card>
            <h2 className="font-semibold text-base flex  gap-2 ">
              <Group /> Users Management
            </h2>
            <p className="font-light text-sm mt-10">
              Klik kartu ini untuk segera pergi dan memulai Manage Users yang
              ada pada ANAKRANTAUNews
            </p>
            <div className="flex justify-end">
              <Link to={"/users"}>
                <button className="border hover:bg-green-700 duration-300 ease-in-out bg-green-500 text-white border-black px-3 py-2 rounded-xl mt-10">
                  Cek Sekarang {">"}
                </button>
              </Link>
            </div>
          </Card>
          <Card>
            <h2 className="font-semibold text-base flex  gap-2 ">
              <Post /> News Management
            </h2>
            <p className="font-light text-sm mt-10">
              Klik kartu ini untuk segera pergi dan memulai Manage Berita yang
              ada pada ANAKRANTAUNews
            </p>
            <div className="flex justify-end">
              <Link to={"/news"}>
                <button className="border hover:bg-blue-700 duration-300 ease-in-out bg-blue-500 text-white border-black px-3 py-2 rounded-xl mt-10">
                  Cek Sekarang {">"}
                </button>
              </Link>
            </div>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
