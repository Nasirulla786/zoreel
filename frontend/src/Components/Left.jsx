import axios from "axios";
import React from "react";
import { serverURL } from "../App";
import { useNavigate } from "react-router-dom";

const Left = ({ reel }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await axios.get(`${serverURL}/api/user/userlogut`, {
      withCredentials: true,
    });

    if (res) {
      navigate("/userlogin");
    }
  };

  return (
    <aside className="w-full md:w-72 min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#111] border-r border-orange-900/30 p-4">
      {/* Card */}
      <div className="bg-[#151515] rounded-2xl p-5 shadow-xl text-center">
        {/* Avatar */}
        <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center
        bg-gradient-to-br from-orange-500 via-yellow-400 to-red-500
        text-black text-2xl font-bold shadow-lg">
          {reel?.name?.charAt(0) || "?"}
        </div>

        {/* Name */}
        <h2 className="mt-3 text-lg font-semibold text-white truncate">
          {reel?.name || "User"}
        </h2>

        {/* Role */}
        <p className="text-sm text-gray-400 mt-1">
          Logged in as{" "}
          <span className="text-orange-400 font-semibold">User</span>
        </p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent my-4" />

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/savereel")}
            className="w-full py-2 rounded-xl
            bg-gradient-to-r from-orange-500 to-yellow-400
            text-black font-semibold hover:scale-[1.02] transition"
          >
            Saved Reels
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-2 rounded-xl
            bg-[#1f1f1f] text-red-400 border border-red-500/30
            hover:bg-red-500 hover:text-white transition font-semibold"
          >
            Logout
          </button>
        </div>

        {/* Footer Text */}
        <p className="text-xs text-gray-500 mt-5">
          Food vibes only 🍕🔥
        </p>
      </div>
    </aside>
  );
};

export default Left;
