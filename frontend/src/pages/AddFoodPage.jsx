import axios from "axios";
import React, { useRef, useState } from "react";
import { serverURL } from "../App";
import { useNavigate } from "react-router-dom";

export default function AddFoodPage() {
  const videoTarget = useRef();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoStore, setVideoStore] = useState("");
  const [sendBackendVideo, setSendBackendVideo] = useState("");
  const navigate = useNavigate();



const handleSubmit = async () => {
  try {
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("description", description);
    formdata.append("video", sendBackendVideo);

    const res = await axios.post(
      `${serverURL}/api/foodpartner/additem`,
      formdata,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    navigate(`/userlogin`);
    console.log(res);



  } catch (error) {
    console.log("add food error", error.response?.data || error.message);
  }
};



  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 ">
      <div className="w-full max-w-lg bg-slate-900 rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">
          Add Food Video
        </h1>

        {/* Video Name */}
        <div className="mb-4">
          <label className="block text-sm text-slate-300 mb-1">Food Name</label>
          <input
            type="text"
            placeholder="Enter Food name"
            className="w-full rounded-xl bg-slate-800 text-white px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm text-slate-300 mb-1">
            Description
          </label>
          <textarea
            rows="4"
            placeholder="Enter description"
            className="w-full rounded-xl bg-slate-800 text-white px-4 py-2 outline-none focus:ring-2 focus:ring-orange-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>



        {/* Video Upload */}
        <div className="mb-6">
          <label
            className="  mb-1 h-10  w-38 bg-orange-500 flex items-center justify-center rounded  text-white cursor-pointer"
            onClick={() => {
              videoTarget.current.click();

            }}
          >
            Upload Video
          </label>

        {
          videoStore &&  <div >
          <video src={videoStore} controls className="w-38 h-37.5 object-cover"></video>
         </div>
        }


          <input
            type="file"
            className="hidden"
            ref={videoTarget}
            accept="video/*"
            onChange={(e) => {
              const file = e.target.files[0];
              const preview = URL.createObjectURL(file);
              setVideoStore(preview);
              setSendBackendVideo(file);
            }}
          />
        </div>

        {/* Button */}
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl font-medium transition" onClick={handleSubmit}>
          Add Food
        </button>
      </div>
    </div>
  );
}
