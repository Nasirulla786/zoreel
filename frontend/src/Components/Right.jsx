import axios from "axios";
import React, { useState } from "react";
import { serverURL } from "../App";

const Right = () => {
  const [query, setQuery] = useState("");
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchReels = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `${serverURL}/api/user/searchapi?q=${query}`,
        { withCredentials: true }
      );
      setReels(res.data);
    } catch (err) {
      console.log("search error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="min-h-screen bg-[#0f0f0f] text-white p-5">
      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-8">
        <h2 className="text-2xl font-bold mb-4 text-orange-400">
          Search Food Reels
        </h2>

        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Burger, Pizza, Biryani..."
            className="flex-1 px-4 py-2 rounded-lg bg-[#181818] border border-[#2a2a2a]"
          />
          <button
            onClick={searchReels}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold"
          >
            Search
          </button>
        </div>
      </div>

      {/* Results */}
      {loading && (
        <p className="text-center text-gray-400">Searching...</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reels.map((reel) => (
          <div
            key={reel._id}
            className="bg-[#181818] rounded-2xl overflow-hidden border border-[#2a2a2a]"
          >
            <video
              src={reel.video}
              controls
              className="w-full h-44 object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold truncate">{reel.name}</h3>
              <p className="text-sm text-gray-400 line-clamp-2">
                {reel.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Right;
