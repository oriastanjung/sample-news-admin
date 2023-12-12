import axios from "axios";
import { EyeSolid, Trash } from "iconoir-react";
import React from "react";
import config from "../config";
import Cookies from "js-cookie";
import moment from "moment";
import { Link } from "react-router-dom";

function ListNews(props) {
  const deleteNews = async () => {
    try {
      const response = await axios.delete(
        `${config.urlBackend}/api/posts/${props.id}`,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      alert("Success Delete News");
    } catch (error) {
      console.log(error);
      alert("Failed Delete News");
    }
  };
  

  return (
    <>
      <div className="mb-5 hidden md:flex w-full items-center justify-between border px-3 py-2 rounded-xl border-black">
        <p className="w-1/5 px-5">{props.no}.</p>
        <div className="w-1/5 overflow-hidden">
          <img className="w-full" src={props.thumbnail} alt="" />
        </div>
        <p className="w-1/5 px-5 text-center">{props.name}</p>
        <p className="w-1/5 px-5 text-right">
          {moment(props.tanggal).format("MMMM Do YYYY")}
        </p>
        <p className="w-1/5 flex justify-end gap-2">
          <Link to={`/news/edit/${props.id}`}><button className="rounded-full bg-gray-500 p-2">
            <EyeSolid className="text-white" />
          </button></Link>
          <button onClick={deleteNews} className="rounded-full bg-red-500 p-2">
            <Trash className="text-white" />
          </button>
        </p>
      </div>
      <div className="mb-5 flex flex-col md:hidden w-full gap-5 items-center border px-3 py-2 rounded-xl border-black">
        <div className="w-1/2">
          <img className="object-cover" src={props.thumbnail} alt="" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-center">
            {props.no}. {props.name}
          </p>
          <p className="text-sm text-gray-600">
            Tanggal Post : {moment(props.tanggal).format("MMMM Do YYYY")}
          </p>
        </div>
        <p className="flex gap-3">
          <Link to={`/news/edit/${props.id}`}><button className="rounded-full bg-gray-500 p-2">
            <EyeSolid className="text-white" />
          </button></Link>
          <button onClick={deleteNews} className="rounded-full bg-red-500 p-2">
            <Trash className="text-white" />
          </button>
        </p>
      </div>
    </>
  );
}

export default ListNews;
