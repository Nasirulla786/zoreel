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
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name.trim() || !description.trim() || !sendBackendVideo) {
      setError("Please complete all fields and choose a video.");
      return;
    }

    try {
      setLoading(true);
      setProgress(0);
      setMessage("");
      setError("");

      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("video", sendBackendVideo);

      const res = await axios.post(`${serverURL}/api/foodpartner/additem`, formdata, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percent);
          }
        },
      });

      setProgress(100);
      setMessage("Food item uploaded successfully.");
      setTimeout(() => {
        setLoading(false);
        navigate("/partner-dash");
      }, 600);

    } catch (error) {
      setLoading(false);
      setProgress(0);
      const responseMessage = error.response?.data?.message || error.message || "Upload failed.";
      setError(responseMessage);
      console.log("add food error", responseMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">

        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Add Food Video
        </h1>

        {/* Food Name */}
        <div className="mb-4">
          <label className="block text-sm text-gray-200 mb-1">Food Name</label>
          <input
            type="text"
            autoComplete="off"
            placeholder="Enter food name"
            className="w-full rounded-lg bg-white/20 text-white px-4 py-2 outline-none border border-white/30 focus:ring-2 focus:ring-orange-400 placeholder-gray-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm text-gray-200 mb-1">Description</label>
          <textarea
            rows="4"
            autoComplete="off"
            placeholder="Enter description"
            className="w-full rounded-lg bg-white/20 text-white px-4 py-2 outline-none border border-white/30 focus:ring-2 focus:ring-orange-400 placeholder-gray-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Video Upload */}
        <div className="mb-6">
          <label
            className="block w-full py-2 bg-gradient-to-r from-orange-500 to-red-500 text-center rounded-lg text-white font-semibold cursor-pointer hover:from-orange-600 hover:to-red-600 transition"
            onClick={() => videoTarget.current.click()}
          >
            Upload Video
          </label>

          {videoStore && (
            <div className="mt-4 rounded-lg overflow-hidden shadow-lg border border-white/20">
              <video src={videoStore} controls className="w-full h-64 object-cover rounded-lg"></video>
            </div>
          )}

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

        {message && (
          <div className="mb-4 rounded-2xl border border-emerald-200/60 bg-emerald-500/10 px-4 py-3 text-emerald-100">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 rounded-2xl border border-rose-200/60 bg-rose-500/10 px-4 py-3 text-rose-100">
            {error}
          </div>
        )}

        {/* Progress Bar */}
        {loading && (
          <div className="w-full bg-white/20 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Submit Button */}
        <button
          disabled={loading}
          className={`w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg transition ${loading ? "cursor-not-allowed opacity-60" : "hover:from-orange-600 hover:to-red-600"}`}
          onClick={handleSubmit}
        >
          {loading ? "Uploading..." : "Add Food"}
        </button>
      </div>
    </div>
  );
}
