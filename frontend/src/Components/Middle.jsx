import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { serverURL } from "../App";
import { Link, useNavigate, useParams } from "react-router-dom";

/* ================= SVG ICONS ================= */

// Like Icon with dynamic color - Proper Heart Icon
export const IconLike = ({ isLiked = false }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={isLiked ? "#ef4444" : "none"}
    stroke={isLiked ? "#ef4444" : "#fff"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

// Comment Icon
export const IconComment = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      stroke="white"
      strokeWidth="1.2"
    />
  </svg>
);

// Save Icon with dynamic color
export const IconSave = ({ isSaved = false }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={isSaved ? "#ef4444" : "none"}
    stroke={isSaved ? "#ef4444" : "white"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
);
/* ================= REEL CARD ================= */

const ReelCard = ({ reel, index }) => {
  const [checkLike, setCheckLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [review, setReview] = useState(false);
  const [comment, setComment] = useState("");
  const [allCommentsStore, setAllCommentsStore] = useState([]);
  const navigate = useNavigate();
  // console.log("this is reel", reel);

  useEffect(() => {
    const fetchCommentsAndLikes = async () => {
      try {
        // Fetch all comments
        const commentsRes = await axios.get(
          `${serverURL}/api/user/getallcomment/${reel?._id}`,
          { withCredentials: true }
        );

        if (commentsRes) {
          setAllCommentsStore(commentsRes.data.comment);
        }

        // Fetch like count and status
        const likesRes = await axios.get(
          `${serverURL}/api/user/getlike/${reel?._id}`,
          { withCredentials: true }
        );

        if (likesRes) {
          setCheckLike(likesRes.data.liked);
          setLikeCount(likesRes.data.likeCount);
        }

        // Fetch save status
        const saveRes = await axios.get(
          `${serverURL}/api/user/checksave/${reel?._id}`,
          { withCredentials: true }
        );

        if (saveRes) {
          setIsSaved(saveRes.data.isSaved || false);
        }
      } catch (error) {
        console.log("Fetch error", error);
      }
    };

    fetchCommentsAndLikes();
  }, [reel?._id]);

  // console.log(allCommentsStore)

  const handleLike = async () => {
    try {
      // Update UI in real-time immediately
      const newLikeStatus = !checkLike;
      setCheckLike(newLikeStatus);
      setLikeCount(newLikeStatus ? likeCount + 1 : likeCount - 1);

      // Send like/unlike to server
      const res = await axios.get(
        `${serverURL}/api/user/getlike/${reel?._id}`,
        { withCredentials: true }
      );

      if (res.data) {
        // Sync with server response
        setCheckLike(res.data.liked);
        setLikeCount(res.data.likeCount);
      }
    } catch (error) {
      console.log("handleLike error", error);
      // Revert on error
      setCheckLike(!checkLike);
      setLikeCount(checkLike ? likeCount + 1 : likeCount - 1);
    }
  };

  const handleReview = async () => {
    if (!comment.trim()) return;

    try {
      const res = await axios.post(
        `${serverURL}/api/user/getcomment/${reel?._id}`,
        { comment },
        { withCredentials: true }
      );

      if (res.data) {
        // Add comment to the list in real-time
        const newComment = {
          comment: comment,
          createdAt: new Date().toISOString(),
        };
        setAllCommentsStore([...allCommentsStore, newComment]);
        setComment(""); // Clear input
      }
    } catch (error) {
      console.log("comment error", error);
    }
  };

  const handleSave = async () => {
    try {
      // Update UI in real-time immediately
      const newSaveStatus = !isSaved;
      setIsSaved(newSaveStatus);

      // Send save/unsave to server
      const res = await axios.get(
        `${serverURL}/api/user/savereel/${reel?._id}`,
        { withCredentials: true }
      );

      if (res.data) {
        console.log("Save response:", res.data);
      }
    } catch (error) {
      console.log("save reel frontend error", error);
      // Revert on error
      setIsSaved(!isSaved);
    }
  };

  return (
    <section className="reel" role="article" aria-label={`Reel ${index + 1}`}>
      <div className="reel-media">
        <video src={reel?.video} autoPlay loop muted playsInline />
      </div>

{/* ===== VISIT STORE BUTTONS ===== */}
<div className="absolute my-5  top-4 inset-x-0 flex items-center  px-4 z-20">



  {/* RIGHT – Food Theme (Yellow → Orange → Red) */}
  <Link
    to={`/profile/${reel.foodpartner}`}
    className="absolute right-4 px-5 py-2 rounded-full
               bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500
               text-black font-bold text-sm
               shadow-xl
               hover:scale-105 hover:shadow-orange-500/50
               transition-all duration-300"
  >
    🍔 Store
  </Link>

</div>


      <div className="reel-actions flex flex-col gap-4 absolute right-4 bottom-20">
        {/* Like Section */}
        <div className="flex flex-col items-center gap-2">
          <button
            className="p-3 rounded-full
           bg-black/60 backdrop-blur-md
           hover:scale-110 hover:bg-black/80
           transition-all duration-300"
            onClick={handleLike}
            title="Like this reel"
          >
            <IconLike isLiked={checkLike} />
          </button>
          <span className="text-white text-sm font-semibold">{likeCount}</span>
        </div>

        {/* Comment Section */}
        <div className="relative">
          <div className="flex items-center justify-center flex-col gap-1">
            <button
              className="p-3 rounded-full
           bg-black/60 backdrop-blur-md
           hover:scale-110 hover:bg-black/80
           transition-all duration-300"
              onClick={() => {
                setReview((pre) => !pre);
              }}
              title="View comments"
            >
              <IconComment />
            </button>

            <h1>{allCommentsStore.length || 0}</h1>
          </div>

          {review && (
            <div className="absolute t right-0 w-80 bg-gradient-to-b from-gray-900 to-black border border-gray-700 rounded-lg shadow-2xl p-4 z-50 flex flex-col max-h-96">
              {/* Input Section */}
              <div className="flex gap-2 mb-3 border-b border-gray-700 pb-3">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-gray-800 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500"
                />
                <button
                  onClick={handleReview}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200"
                >
                  Post
                </button>
              </div>

              {/* Comments List */}
              <div className="overflow-y-auto fLEX-1 relative bottom-0 space-y-2 hide-scrollbar">
                {allCommentsStore && allCommentsStore.length > 0 ? (
                  allCommentsStore.map((value, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-800 rounded-lg p-2 hover:bg-gray-750 transition-colors"
                    >
                      <p className="text-white text-sm break-words">
                        {value.comment}
                      </p>
                      <span className="text-gray-400 text-xs mt-1 block">
                        {new Date(value.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400 text-sm py-4">
                    No comments yet. Be the first!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Save Button */}
        <button
          className="p-3 rounded-full
           bg-black/60 backdrop-blur-md
           hover:scale-110 hover:bg-black/80
           transition-all duration-300"
          title="Save this reel"
          onClick={handleSave}
        >
          <IconSave isSaved={isSaved} />
        </button>
      </div>

      <div className="absolute bottom-6 left-4 right-24 text-white">
        <h3 className="font-bold text-lg drop-shadow-lg">
          {reel?.name || "Food Item"}
        </h3>

        <p
          className="text-sm text-gray-200 mt-1
                bg-black/40 inline-block
                px-3 py-1 rounded-lg
                backdrop-blur-md"
        >
          {reel?.description || "Delicious food available now"}
        </p>
      </div>
    </section>
  );
};

/* ================= MIDDLE FEED ================= */

const Middle = ({ reel }) => {
  return (
    <main className="feed-column">
      <div className="feed-scroll" role="region" aria-label="Reels feed">
        {reel.length === 0 ? (
          <div className="empty-feed">No reels found</div>
        ) : (
          reel.map((reel, idx) => (
            <ReelCard key={reel._id || idx} reel={reel} index={idx} />
          ))
        )}
      </div>
    </main>
  );
};

export default Middle;
