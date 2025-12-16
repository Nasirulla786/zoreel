import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { serverURL } from "../App";

const Profile = () => {
  const { profile } = useParams();
  const navigate = useNavigate();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoodPartner = async () => {
      try {
        const res = await axios.get(
          `${serverURL}/api/foodpartner/getfoodpartner/${profile}`,
          { withCredentials: true }
        );
        setPartner(res.data);
      } catch (error) {
        console.log("fetch foodpartner error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodPartner();
  }, [profile]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
        Loading profile...
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-400">
        Profile not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-6 sm:px-6 lg:px-12 relative">

      {/* ================= BACK / HOME BUTTONS ================= */}
      <div className="fixed top-4 left-4 z-50 flex gap-2">
        <button
          onClick={() => navigate(-1)}
          className="bg-slate-800/80 backdrop-blur border border-white/10 text-white px-4 py-2 rounded-xl text-sm hover:bg-slate-700 transition"
        >
          ⬅ Back
        </button>


      </div>

      {/* ================= MAIN CARD ================= */}
      <div className="max-w-5xl mx-auto bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/5">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/90 text-slate-900 flex items-center justify-center text-3xl sm:text-4xl font-bold shadow-lg">
              {partner.businessName.charAt(0)}
            </div>

            <div className="text-center sm:text-left text-white">
              <h1 className="text-2xl sm:text-3xl font-bold">
                {partner.businessName}
              </h1>
              <p className="text-sm opacity-90">📍 {partner.location}</p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-200">

          <div className="bg-slate-800/60 rounded-2xl p-5 border border-white/5">
            <h2 className="text-lg font-semibold mb-4 text-orange-400">
              Contact Information
            </h2>
            <p className="break-all"><span className="text-slate-400">Email:</span> {partner.email}</p>
            <p><span className="text-slate-400">Phone:</span> {partner.phone}</p>
            <p><span className="text-slate-400">Location:</span> {partner.location}</p>
          </div>

          <div className="bg-slate-800/60 rounded-2xl p-5 border border-white/5">
            <h2 className="text-lg font-semibold mb-4 text-pink-400">
              Business Details
            </h2>
            <div className="grid grid-cols-2 gap-4 text-center mb-4">
              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-2xl font-bold text-orange-400">{partner.outlets}</p>
                <p className="text-xs text-slate-400">Outlets</p>
              </div>
              <div className="bg-slate-900 rounded-xl p-4">
                <p className="text-2xl font-bold text-pink-400">{partner.visits}</p>
                <p className="text-xs text-slate-400">Visits</p>
              </div>
            </div>
            <p><span className="text-slate-400">Joined:</span> {new Date(partner.createdAt).toLocaleDateString()}</p>
            <p><span className="text-slate-400">Updated:</span> {new Date(partner.updatedAt).toLocaleDateString()}</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
