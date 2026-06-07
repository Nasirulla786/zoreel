import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { serverURL } from "../App";

const FoodPartnerDash = () => {
  const navigate = useNavigate();
  const [partner, setPartner] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [busyItem, setBusyItem] = useState(null);

  useEffect(() => {
    fetchStore();
  }, []);

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  const fetchStore = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${serverURL}/api/foodpartner/my-store`, {
        withCredentials: true,
      });
      setPartner({ ...res.data.partner, rating: res.data.rating, reviews: res.data.reviews });
      setItems(res.data.items || []);
    } catch (error) {
      console.log("fetch store error", error);
      setAlert({ type: "error", message: "Could not load your store. Please login again." });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      setBusyItem(itemId);
      const res = await axios.delete(`${serverURL}/api/foodpartner/item/${itemId}`, {
        withCredentials: true,
      });
      setItems((prev) => prev.filter((item) => item._id !== itemId));
      setAlert({ type: "success", message: res.data?.message || "Item removed from store." });
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Unable to delete item. Please try again.",
      });
      console.log("delete item error", error);
    } finally {
      setBusyItem(null);
    }
  };

  const copyStoreLink = async () => {
    if (!partner) return;
    const url = `${window.location.origin}/foodpartnerdetail/${partner._id}`;
    try {
      await navigator.clipboard.writeText(url);
      setAlert({ type: "success", message: "Public store link copied to clipboard." });
    } catch (error) {
      setAlert({ type: "error", message: "Cannot copy link automatically. Please copy it manually." });
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${serverURL}/api/foodpartner/foodpartnerlogout`, { withCredentials: true });
      navigate("/foodpartnerlogin");
    } catch (error) {
      setAlert({ type: "error", message: "Logout failed. Please try again." });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-orange-600 via-red-600 to-pink-700 flex items-center justify-center text-white px-4 py-6">
        <div className="rounded-3xl bg-white/10 border border-white/10 p-8 shadow-2xl backdrop-blur-xl">
          <p className="text-xl font-semibold">Loading your food partner dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-600 via-red-600 to-pink-700 px-4 py-6 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 rounded-4xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm">
              Food Partner Dashboard
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white">Manage your store</h1>
            <p className="max-w-2xl text-slate-100/90">
              Upload videos, track items, and keep your menu ready for customers.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/addfood"
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
            >
              + Add New Item
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Logout
            </button>
          </div>
        </div>

        {alert && (
          <div className={`mb-6 flex items-start justify-between gap-4 rounded-3xl border px-5 py-4 text-sm font-medium ${alert.type === "success" ? "border-emerald-200/70 bg-emerald-500/10 text-emerald-100" : "border-rose-200/70 bg-rose-500/10 text-rose-100"}`}>
            <span>{alert.message}</span>
            <button
              type="button"
              onClick={() => setAlert(null)}
              className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
            >
              ×
            </button>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-6 rounded-4xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <div className="rounded-[28px] bg-linear-to-br from-orange-500 via-red-500 to-pink-500 p-6 text-white shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/20 text-3xl font-bold">
                  {partner?.businessName?.charAt(0) || "F"}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/80">Business</p>
                  <h2 className="text-2xl font-bold">{partner?.businessName || "Your restaurant"}</h2>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/90">{partner?.location || "Location not set"}</p>
            </div>

            <div className="grid gap-4 rounded-[28px] border border-white/10 bg-slate-950/20 p-5">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Email</span>
                <span>{partner?.email}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Phone</span>
                <span>{partner?.phone || "—"}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Outlets</span>
                <span>{partner?.outlets || 0}</span>
              </div>
            </div>

            <div className="grid gap-3 rounded-[28px] border border-white/10 bg-slate-950/20 p-5">
              <button
                type="button"
                onClick={copyStoreLink}
                className="rounded-3xl bg-white/10 px-4 py-3 text-left text-sm text-white transition hover:bg-white/20"
              >
                Copy public store link
              </button>
              <Link
                to={`/foodpartnerdetail/${partner?._id}`}
                className="rounded-3xl bg-white/10 px-4 py-3 text-left text-sm text-white transition hover:bg-white/20"
              >
                View public menu page
              </Link>
            </div>
          </aside>

          <section className="rounded-4xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-300/80">Active menu items</p>
                <h2 className="text-2xl font-semibold text-white">{items.length} items in your menu</h2>
              </div>
              <div className="rounded-full bg-slate-950/30 px-4 py-2 text-sm text-slate-200">
                Rating {partner?.rating || "4.5"} · {partner?.reviews || 0} reviews
              </div>
            </div>

            {items.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-white/20 bg-slate-950/10 p-10 text-center text-slate-300">
                You have not added any food videos yet. Use the button above to upload your first item.
              </div>
            ) : (
              <div className="space-y-5">
                {items.map((item) => (
                  <article key={item._id} className="grid gap-4 rounded-[28px] border border-white/10 bg-slate-950/20 p-4 lg:grid-cols-[1.2fr_220px]">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{item.name || "Untitled Food"}</h3>
                          <p className="text-sm text-slate-300 line-clamp-2">{item.description || "No description available."}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDelete(item._id)}
                          disabled={busyItem === item._id}
                          className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {busyItem === item._id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                        <span>• {item.like?.length || 0} likes</span>
                        <span>• {item.comment?.length || 0} comments</span>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/70">
                      <video src={item.video} controls className="h-48 w-full object-cover" />
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerDash;
