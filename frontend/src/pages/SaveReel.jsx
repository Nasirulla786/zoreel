import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverURL } from "../App";
import { useNavigate } from "react-router-dom";

const SaveReel = () => {
  const [savedReels, setSavedReels] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllSaveReels = async () => {
      try {
        const res = await axios.get(
          `${serverURL}/api/user/getsavereel`,
          { withCredentials: true }
        );

        if (res.data?.saveReel) {
          setSavedReels(res.data.saveReel);
        }
      } catch (error) {
        console.log("fetchAllSaveReels", error);
      }
    };

    fetchAllSaveReels();
  }, []);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-6">

      {/* ===== Back Button ===== */}
      <button
        onClick={() => navigate("/")}
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back to Home
      </button>

      {/* ===== Heading ===== */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Saved Reels
      </h1>

      {/* ===== Empty State ===== */}
      {savedReels.length === 0 && (
        <p className="text-center text-gray-400">
          No saved reels found
        </p>
      )}

      {/* ===== Reels Grid ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {savedReels.map((reel) => (
          <div
            key={reel._id}
            className={`relative rounded-xl overflow-hidden border transition-all duration-300
              ${
                selected.includes(reel._id)
                  ? "border-red-500 ring-2 ring-red-500"
                  : "border-gray-700 hover:border-gray-500"
              }
            `}
          >
            <video
              src={reel.video}
              controls
              className="w-full h-56 object-cover"
            />

            <div className="p-4 bg-gray-900">
              <h2 className="text-lg font-semibold truncate">
                {reel.name || "Food Reel"}
              </h2>

              <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                {reel.description || "No description"}
              </p>

              {reel.foodpartner && (
                <div className="text-xs text-gray-400 mt-2">
                  <span className="font-semibold text-gray-300">
                    {reel.foodpartner.businessName}
                  </span>{" "}
                  • {reel.foodpartner.location}
                </div>
              )}

              <button
                onClick={() => toggleSelect(reel._id)}
                className={`mt-3 w-full py-2 rounded-lg font-medium transition
                  ${
                    selected.includes(reel._id)
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-gray-800 hover:bg-gray-700"
                  }
                `}
              >
                {selected.includes(reel._id)
                  ? "Selected"
                  : "Select Reel"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 border border-gray-700 px-6 py-3 rounded-full shadow-xl">
          <span className="text-sm font-semibold">
            {selected.length} reel(s) selected
          </span>
        </div>
      )}
    </div>
  );
};

export default SaveReel;
