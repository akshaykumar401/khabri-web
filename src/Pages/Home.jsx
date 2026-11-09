import React, { useEffect, useState, useMemo } from 'react';
import { CreatePost, PostCard } from "../Components/Components.js";
import { useSelector, useDispatch } from 'react-redux';
import { viewAllPost } from '../Features/Post/post.slice.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faCompass,
  faMagnifyingGlass,
  faXmark,
  faFire,
  faBolt,
  faMicrochip,
  faLandmark,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const dispatch = useDispatch();
  const { allPost, loading } = useSelector((state) => state.post);
  const { userData } = useSelector((state) => state.user);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");

  // Fetch all posts on mount and immediately when user logs in / auth state updates
  useEffect(() => {
    dispatch(viewAllPost());
  }, [dispatch, userData?._id]);

  // Keep posts sorted newest first
  const posts = useMemo(() => {
    if (!Array.isArray(allPost)) return [];
    return [...allPost].sort((a, b) => {
      const timeB = new Date(b.createdAt || b.updatedAt || 0).getTime();
      const timeA = new Date(a.createdAt || a.updatedAt || 0).getTime();
      if (timeB && timeA && timeB !== timeA) return timeB - timeA;
      if (b._id && a._id) return String(b._id).localeCompare(String(a._id));
      return 0;
    });
  }, [allPost]);

  const topics = [
    { id: "All", label: "All Stories", icon: faCompass },
    { id: "Breaking", label: "Breaking", icon: faFire },
    { id: "Tech", label: "Technology", icon: faMicrochip },
    { id: "Politics", label: "Politics", icon: faLandmark },
    { id: "Business", label: "Business", icon: faBriefcase },
    { id: "Live", label: "Live Updates", icon: faBolt },
  ];

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Search matching across title, description, and author
      const query = searchQuery.toLowerCase().trim();
      const title = (post?.title || "").toLowerCase();
      const desc = (post?.description || "").toLowerCase();
      const author = (post?.user?.fullName || post?.user?.username || "").toLowerCase();

      const matchesSearch =
        !query ||
        title.includes(query) ||
        desc.includes(query) ||
        author.includes(query);

      if (!matchesSearch) return false;

      // Topic matching
      if (selectedTopic === "All") return true;

      const combinedText = `${title} ${desc}`;

      if (selectedTopic === "Breaking") {
        return (
          combinedText.includes("break") ||
          combinedText.includes("urgent") ||
          combinedText.includes("alert") ||
          combinedText.includes("just in")
        );
      }
      if (selectedTopic === "Tech") {
        return (
          combinedText.includes("tech") ||
          combinedText.includes("ai") ||
          combinedText.includes("software") ||
          combinedText.includes("google") ||
          combinedText.includes("apple") ||
          combinedText.includes("code") ||
          combinedText.includes("digital") ||
          combinedText.includes("cyber")
        );
      }
      if (selectedTopic === "Politics") {
        return (
          combinedText.includes("politic") ||
          combinedText.includes("government") ||
          combinedText.includes("election") ||
          combinedText.includes("minister") ||
          combinedText.includes("parliament") ||
          combinedText.includes("policy")
        );
      }
      if (selectedTopic === "Business") {
        return (
          combinedText.includes("business") ||
          combinedText.includes("market") ||
          combinedText.includes("economy") ||
          combinedText.includes("startup") ||
          combinedText.includes("stock") ||
          combinedText.includes("fund") ||
          combinedText.includes("finance")
        );
      }
      if (selectedTopic === "Live") {
        return (
          combinedText.includes("live") ||
          combinedText.includes("today") ||
          combinedText.includes("now")
        );
      }

      return true;
    });
  }, [posts, searchQuery, selectedTopic]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedTopic("All");
  };

  return (
    <div className="w-full animate-fade-in">
      {/* Feed Page Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold font-brand tracking-tight text-[#1D3557] dark:text-white flex items-center gap-2.5">
            <span>Explore Feed</span>
          </h1>
          <p className="text-xs text-[#6B7280] dark:text-slate-400 mt-0.5">
            Latest stories, breaking news, and community updates
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E76F51]/10 text-[#E76F51] border border-[#E76F51]/20 text-xs font-semibold">
          <FontAwesomeIcon icon={faCompass} />
          <span>Latest</span>
        </div>
      </div>

      {/* Inline Create Post Widget */}
      <CreatePost />

      {/* Search & Topic Filters Bar */}
      <div className="mb-5 space-y-3">
        {/* Search Input Field */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xs" />
          </span>
          <input
            type="text"
            placeholder="Search stories by headline, keyword, or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] text-slate-900 dark:text-white placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2E5BFF]/20 focus:border-[#2E5BFF] transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <FontAwesomeIcon icon={faXmark} className="text-xs" />
            </button>
          )}
        </div>

        {/* Topic Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedTopic === topic.id
                  ? "bg-[#2E5BFF] text-white shadow-sm shadow-[#2E5BFF]/25"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {topic.icon && <FontAwesomeIcon icon={topic.icon} className="text-[10px]" />}
              <span>{topic.label}</span>
            </button>
          ))}
        </div>

        {/* Filter Results Info Banner */}
        {(searchQuery || selectedTopic !== "All") && (
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 px-1">
            <span>
              Showing <strong className="text-slate-900 dark:text-white">{filteredPosts.length}</strong> {filteredPosts.length === 1 ? 'story' : 'stories'}
              {searchQuery && <> for &ldquo;<span className="text-[#2E5BFF]">{searchQuery}</span>&rdquo;</>}
              {selectedTopic !== "All" && <> in <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTopic}</span></>}
            </span>
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-[#2E5BFF] hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Feed Posts */}
      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post._id} id={post._id} post={post} />
          ))
        ) : loading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-3 border-[#2E5BFF]/30 border-t-[#2E5BFF] rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-400">Loading stories...</p>
          </div>
        ) : searchQuery || selectedTopic !== "All" ? (
          <div className="text-center py-16 px-4 rounded-3xl bg-white dark:bg-[#111827] border border-dashed border-slate-200 dark:border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-[#E76F51]/10 text-[#E76F51] mx-auto flex items-center justify-center mb-3">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="text-xl" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No matching stories found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto mb-4">
              We couldn't find any stories matching your query. Try different keywords or clear your active filters.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl bg-[#2E5BFF] hover:bg-[#1d45e0] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-3xl bg-white dark:bg-[#111827] border border-dashed border-slate-200 dark:border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-[#2E5BFF]/10 text-[#2E5BFF] mx-auto flex items-center justify-center mb-3">
              <FontAwesomeIcon icon={faNewspaper} className="text-xl" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No stories yet</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Be the first to share an update with the Khabri community!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
