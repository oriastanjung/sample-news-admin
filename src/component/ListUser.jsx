import axios from "axios";
import { Trash } from "iconoir-react";
import React from "react";
import config from "../config";
import Cookies from "js-cookie";

function ListUser(props) {
  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `${config.urlBackend}/api/users/${props.id}`,
        { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
      );
      alert("Success Delete User")
    } catch (error) {
      console.log(error);
      alert("Failed Delete User");
    }
  };
  return (
    <>
      <div className="mb-5 hidden md:flex w-full items-center justify-between border px-3 py-2 rounded-xl border-black">
        <p className="w-1/4">{props.no}.</p>

        <p className="w-1/4 truncate">{props.username}</p>

        <p className="w-1/4 truncate">{props.email}</p>
        <p className="w-1/4 flex justify-end">
          <button onClick={deleteUser} className="rounded-full bg-red-500 p-2 ">
            <Trash className="text-white" />
          </button>
        </p>
      </div>
      <div className="mb-5 flex md:hidden w-full gap-5 items-center border px-3 py-2 rounded-xl border-black">
        <p>{props.no}.</p>

        <div>
          <p>{props.username}</p>

          <p>{props.email}</p>
        </div>
        <p className="pl-14">
          <button onClick={deleteUser} className="rounded-full bg-red-500 p-2 ">
            <Trash className="text-white" />
          </button>
        </p>
      </div>
    </>
  );
}

export default ListUser;
