import React, { useEffect, useState, useRef } from "react";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import axios from "axios";
import config from "../config";
import ListNews from "../component/ListNews";
import { Search } from "iconoir-react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { quill } from "../config";

function CreateNewsPage() {
  const { formats, modules, toolbarOptions } = quill;

  const [form, setForm] = useState({
    name: "",
    description: "",
    thumbnail: null, // new state for file input
  });

  const handleChange = (content, delta, source, editor) => {
    setForm((prev) => ({ ...prev, description: content }));
  };

  const handleFileChange = (e) => {
    // Update the 'thumbnail' property in the form state
    setForm((prev) => ({ ...prev, thumbnail: e.target.files[0] }));
  };

  const onChangeHandler = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create FormData object
      if(form.description === ""){
        alert("Isi Description Berita terlebih dahulu!")
        return
      }
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("thumbnail", form.thumbnail);
      const response = await axios.post(
        `${config.urlBackend}/api/posts`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message)
      navigate("/news")
      // console.log("Response:", response.data);
    } catch (error) {
      // console.log(error)
      alert("Error Create News")
    }
  };

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
        <form
          onSubmit={handleSubmit}
          className="mt-10 px-5 md:px-40 py-10 border shadow-xl rounded-xl"
        >
          <div className="flex flex-col gap-3 mb-10">
            <label className="text-sm font-medium">Thumbnail Berita : </label>
            {form.thumbnail && (
              <div className="w-full flex justify-center">
                <img
                  src={URL.createObjectURL(form.thumbnail)}
                  alt="Thumbnail Preview"
                  className="w-[20rem]"
                />
              </div>
            )}
            <input
              name="thumbnail"
              className="outline-none text-sm border border-gray-500 px-3 py-2 rounded-xl"
              type="file"
              onChange={handleFileChange} // Use the new handler
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium">Judul Berita : </label>
            <input
              onChange={onChangeHandler}
              value={form.name}
              name="name"
              className="outline-none text-sm border border-gray-500 px-3 py-2 rounded-xl"
              type="text"
              required
              placeholder="Masukkan Judul Berita"
            />
          </div>
          <div className="flex flex-col gap-3 mt-10">
            <label className="text-sm font-medium">Deskripsi Berita : </label>
            <ReactQuill
              className="bg-white overflow-auto"
              theme="snow"
              value={form.description}
              formats={formats}
              modules={modules}
              bounds={".quill"}
              onChange={handleChange}
              preserveWhitespace={true} // Preserve whitespace, including spaces
            />
          </div>

          <button
            type="submit"
            className="w-full my-10 hover:bg-blue-700 duration-300 ease-in-out border px-3 py-2 border-black rounded-xl bg-blue-500 text-white text-sm"
          >
            Buat Berita
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default CreateNewsPage;
