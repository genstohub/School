"use client";

import { REST_API } from "@/constants";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Atom,
  BadgeCheck,
  BarChart3,
  Binary,
  BookOpen,
  Calculator,
  Calendar,
  ChevronRight,
  Database,
  Edit,
  FlaskConical,
  Grid,
  Languages,
  List,
  ListIcon,
  Loader2,
  Plus,
  Search,
  SortAsc,
  SortDesc,
  Sprout,
  Timer,
} from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import TimeAgo from "javascript-time-ago";
// English.
import en from "javascript-time-ago/locale/en";
import { useRouter } from "next/navigation";

interface Topic {
  course_id: string | number;
  topic_id: string | number;
  course_title: string;
  course_code: string;
  level: string;
  status: "pending" | "published";
  content_uri: string;
  date_uploaded: Date;
  topic: string;
  topic_desc: string;
}

const getIcon = (code: string) => {
  const prefix = code.substring(0, 3).toUpperCase();
  switch (prefix) {
    case "MTH":
      return Calculator;
    case "PHY":
      return Atom;
    case "CHM":
      return FlaskConical;
    case "BIO":
      return BookOpen;
    case "STA":
      return BarChart3;
    case "CMP":
      return Binary;
    case "GST":
      return Languages;
    case "AGR":
      return Sprout;
    default:
      return BookOpen;
  }
};

export default function CreateMaterialPage() {
  const [search, setSearch] = useState(""),
    [topics, setTopics] = useState<Topic[]>([]),
    [topicsLoading, setTopicsLoading] = useState<boolean>(true),
    [topicsFetchError, setTopicsFetchError] = useState(false),
    [listStyleOpen, setListStyleOpen] = useState<boolean>(false),
    [sortStyleOpen, setSortStyleOpen] = useState<boolean>(false),
    [listStyle, setListStyle] = useState<"grid" | "list">("grid"),
    [sortStyle, setSortStyle] = useState<"A-Z" | "Z-A" | "oldest" | "newest">(
      "newest"
    );
  
  const router = useRouter()

  TimeAgo.addLocale(en);
  // Create formatter (English).
  const timeAgo = new TimeAgo("en-US");

  const filteredTopics = useMemo(() => {
    const searchFilteredTopics = topics.filter((c) => {
      const matchSearch =
        c.course_code.toLowerCase().includes(search.toLowerCase()) ||
        c.topic.toLowerCase().includes(search.toLowerCase()) ||
        c.course_title.toLowerCase().includes(search.toLowerCase()) ||
        c.topic_desc.toLowerCase().includes(search.toLowerCase()) ||
        c.level.toLowerCase().includes(search.toLowerCase());
      return matchSearch;
    });

    switch (sortStyle) {
      case "A-Z":
        return searchFilteredTopics.sort((a, b) =>
          a.topic.localeCompare(b.topic)
        );
      case "Z-A":
        return searchFilteredTopics.sort((a, b) =>
          b.topic.localeCompare(a.topic)
        );

      case "newest":
        return searchFilteredTopics.sort((a, b) =>
          a.date_uploaded
           .toString()
            .localeCompare(b.date_uploaded.toString())
        );

      case "oldest":
        return searchFilteredTopics.sort((a, b) =>
          b.date_uploaded
           .toString()
            .localeCompare(a.date_uploaded.toString())
        );
    }
  }, [search, topics, sortStyle]);

  useEffect(() => {
    const getAllInstructortopics = async () => {
      await fetch(REST_API + "/user/instructor/get/all-personal/topics", {
        method: "get",
        credentials: "include",
        headers: { "content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((res) => {
          if (res[0].course_id) {
            setTopics(res);
            setTopicsLoading(false);
          } else {
            setTopicsFetchError(true);
            setTopicsLoading(false);
          }
        })
        .catch(() => {
          setTopicsFetchError(true);
          setTopicsLoading(false);
        });
    };

    getAllInstructortopics();
  }, []);

  const onSortStyleHandle = useCallback((sortTo: typeof sortStyle) => {
    setSortStyle(sortTo);
    setSortStyleOpen(false);
  }, []);

  const onListStyleHandle = useCallback((listTo: typeof listStyle) => {
    switch (listTo) {
      case "grid":
        setListStyle("grid");
        break;

      case "list":
        setListStyle("list");
        break;

      default:
        break;
    }
    setListStyleOpen(false);
  }, []);

  const openSortStyleMenu = () => {
    setListStyleOpen(false);
    setSortStyleOpen(!sortStyleOpen);
  };

  const openListStyleMenu = () => {
    setSortStyleOpen(false);
    setListStyleOpen(!listStyleOpen);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 border-l-4 border-[#035b77] pl-6">
          <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase">
            Course <span className="text-[#035b77]">Materials</span>
          </h1>
          <p className="text-gray-500 text-xs font-bold tracking-[0.2em] mt-2 uppercase">
            Your material management system
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-row gap-6 mb-12 items-center justify-between relative">
          <div className="relative w-full lg:max-w-xl">
            <Search
              className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-gray-600"
              size={20}
            />
            <input
              type="text"
              placeholder="Filter by code or course name..."
              className="w-full bg-gray-900/40 border border-gray-800 rounded-[2rem] py-5 pl-12 md:pl-16 pr-4 md:pr-6 focus:outline-none focus:border-[#035b77] transition-all placeholder:text-gray-700 font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Create New Course */}
          <div className="flex bg-gray-900/40 p-1.5 rounded-3xl border border-gray-800 shrink-0 cursor-pointer">
            <div
              onClick={() => {router.push("/instructors/material/new")}}
              className={`flex z-20 lg:gap-4 lg:gap:2 gap-1 px-4 lg:px-8 py-3 rounded-2xl text-[10px]font-black tracking-widest transition-all bg-[#035b77] text-white shadow-xl shadow-[#035b77]/20 justify-center items-center`}
            >
              <Plus
                size={window.innerWidth > 500 ? 24 : 20}
                color="lightgray"
              />
              New
            </div>
          </div>

          {/* List style and sort button */}
          <div className="flex flex-row gap-2 lg:gap-4">
            <SortAsc
              size={24}
              color="blue"
              className="cursor-pointer"
              onClick={openSortStyleMenu}
            />
            <ListIcon
              size={24}
              color="blue"
              className="cursor-pointer"
              onClick={openListStyleMenu}
            />
          </div>

          {/* Sort Menu */}
          {sortStyleOpen && (
            <div className="absolute w-66 top-17 right-8 p-4 rounded-2xl z-30 border border-gray-800 transition-all bg-[#035b77] text-white shadow-xl shadow-[#035b77]/20 ">
              <div className="w-10 h-10 -z-10 bg-[#035b77] absolute -top-2 right-2 rotate-60"></div>
              <ul className="flex flex-col gap-3">
                <li
                  className="cursor-pointer font-bold flex gap-2 hover:bg-[#023342] p-2 rounded-sm"
                  onClick={() => onSortStyleHandle("A-Z")}
                >
                  <SortAsc
                    size={24}
                    color="lightgray"
                    className="cursor-pointer"
                  />{" "}
                  Ascending (A-Z)
                  {sortStyle === "A-Z" && (
                    <span className="text-white ml-3">✔</span>
                  )}
                </li>
                <li
                  className="cursor-pointer font-bold flex gap-2 hover:bg-[#023342] p-2 rounded-sm"
                  onClick={() => onSortStyleHandle("Z-A")}
                >
                  <SortDesc
                    size={24}
                    color="lightgray"
                    className="cursor-pointer"
                  />
                  Descending (Z-A)
                  {sortStyle === "Z-A" && (
                    <span className="text-white ml-3">✔</span>
                  )}
                </li>
                <li
                  className="cursor-pointer font-bold flex gap-2 hover:bg-[#023342] p-2 rounded-sm"
                  onClick={() => onSortStyleHandle("newest")}
                >
                  <Timer
                    size={24}
                    color="lightgray"
                    className="cursor-pointer"
                  />
                  Date (Newest first)
                  {sortStyle === "newest" && (
                    <span className="text-white ml-3">✔</span>
                  )}
                </li>
                <li
                  className="cursor-pointer font-bold flex gap-2 hover:bg-[#023342] p-2 rounded-sm"
                  onClick={() => onSortStyleHandle("oldest")}
                >
                  <Timer
                    size={24}
                    color="lightgray"
                    className="cursor-pointer"
                  />
                  Date (Oldest first)
                  {sortStyle === "oldest" && (
                    <span className="text-white ml-3">✔</span>
                  )}
                </li>
              </ul>
            </div>
          )}

          {/* List Style Menu */}
          {listStyleOpen && (
            <div className="absolute w-44 top-17 right-0 p-2 rounded-2xl z-30 border border-gray-800 transition-all bg-[#035b77] text-white shadow-xl shadow-[#035b77]/20 ">
              <div className="w-10 h-10 -z-10 bg-[#035b77] absolute -top-2 right-2 rotate-60"></div>
              <ul className="flex flex-col gap-3">
                <li
                  className="cursor-pointer font-bold flex gap-2 hover:bg-[#023342] p-2 rounded-sm"
                  onClick={() => onListStyleHandle("grid")}
                >
                  <Grid
                    size={24}
                    color="lightgray"
                    className="cursor-pointer"
                  />
                  Grid
                  {listStyle === "grid" && (
                    <span className="text-white ml-3">✔</span>
                  )}
                </li>
                <li
                  className="cursor-pointer font-bold flex gap-2 hover:bg-[#023342] p-2 rounded-sm"
                  onClick={() => onListStyleHandle("list")}
                >
                  <List
                    size={24}
                    color="lightgray"
                    className="cursor-pointer "
                  />
                  List
                  {listStyle === "list" && (
                    <span className="text-white ml-3">✔</span>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Content States */}
        {topicsLoading ? (
          <div className="py-32 flex flex-col items-center justify-center">
            <Loader2 className="w-12 h-12 text-[#035b77] animate-spin mb-6" />
            <p className="text-[10px] font-black tracking-[0.4em] text-gray-700 uppercase">
              Fetching your materials...
            </p>
          </div>
        ) : topicsFetchError ? (
          <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-[2rem] flex items-center gap-6 max-w-2xl mx-auto">
            <AlertCircle className="text-red-500" size={32} />
            <p className="font-bold text-red-500 uppercase tracking-tighter">
              Error fetching topics
            </p>
          </div>
        ) : listStyle === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredTopics.map((topic, idx) => {
                const Icon = getIcon(topic.course_code);
                return (
                  <motion.div
                    key={
                      topic.topic_id +
                      `${
                        idx +
                        parseFloat(Math.random().toString().substring(3, 7))
                      }`
                    }
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.01 }}
                    // onClick={() => router.push(`/students/topics/material/${topic.id}/topics`)}
                    className="group relative cursor-pointer bg-gray-900/20 border border-gray-800/60 p-8 rounded-[2.5rem] hover:bg-gray-900/40 hover:border-[#035b77]/40 transition-all overflow-hidden flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-14 h-14 bg-black border border-gray-800 rounded-2xl flex items-center justify-center text-[#035b77] group-hover:scale-110 group-hover:bg-[#035b77] group-hover:text-white transition-all duration-500">
                        <Icon size={24} />
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[8px] font-black tracking-widest bg-gray-950 px-3 py-1.5 rounded-full text-gray-500 border border-gray-900">
                          {topic.level}
                        </span>
                        {topic.status === "pending" ? (
                          <span className="text-xs flex gap-1 mt-2">
                            <Timer size={16} color="yellow" />
                            pending
                          </span>
                        ) : (
                          <span className="text-xs flex gap-1 mt-2">
                            <BadgeCheck size={16} color="green" />
                            published
                          </span>
                        )}
                      </div>
                    </div>

                    <h2 className="text-xl font-black uppercase tracking-tight mb-2 leading-none">
                      {topic.course_code}
                    </h2>
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-tighter line-clamp-1">
                      {topic.topic}
                    </h3>
                    <p className="text-[11px] text-gray-700 leading-relaxed font-medium line-clamp-3 mb-8">
                      {topic.topic_desc}
                    </p>

                    <div className="mt-auto py-4 px-4 border-t border-gray-800/40 flex items-center justify-between hover:bg-gray-900/40 hover:border-[#035b77]/40">
                      <span className="text-[9px] font-black uppercase tracking-widest text-gray-600 group-hover:text-[#035b77] transition-colors">
                        Open Material
                      </span>
                      <ChevronRight
                        size={14}
                        className="text-gray-800 group-hover:text-white group-hover:translate-x-1 transition-all"
                      />
                    </div>
                    <div className="mt-auto py-4 px-4 border-t border-gray-800/40 flex items-center justify-between hover:bg-gray-900/40 hover:border-[#035b77]/40">
                      <span className="text-[9px] font-black uppercase tracking-widest text-gray-600 group-hover:text-[#035b77] transition-colors">
                        Edit Material
                      </span>
                      <Edit
                        size={14}
                        className="text-gray-800 group-hover:text-white group-hover:translate-x-1 transition-all"
                      />
                    </div>
                    <div className="flex self-end mt-1 text-xs text-gray-500 font-semibold items-center gap-2"><Calendar size={10} color="lightgray"/>{timeAgo.format(topic.date_uploaded)}</div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <AnimatePresence mode="popLayout">
              {filteredTopics.map((topic, idx) => {
                const Icon = getIcon(topic.course_code);
                return (
                  <motion.div
                    key={
                      topic.topic_id +
                      `${
                        idx +
                        parseFloat(Math.random().toString().substring(3, 7))
                      }`
                    }
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.01 }}
                    // onClick={() => router.push(`/students/topics/material/${topic.id}/topics`)}
                    className="group relative cursor-pointer bg-gray-900/20 border border-gray-800/60 p-8 rounded-[2.5rem] transition-all overflow-hidden flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-14 h-14 bg-black border border-gray-800 rounded-2xl flex items-center justify-center text-[#035b77] group-hover:scale-110 group-hover:bg-[#035b77] group-hover:text-white transition-all duration-500">
                        <Icon size={24} />
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[12px] font-black tracking-widest bg-gray-950 px-3 py-1.5 rounded-full text-gray-500 border border-gray-900">
                          {topic.level}
                        </span>
                        {topic.status === "pending" ? (
                          <span className="text-xs md:text-sm items-center flex gap-1 mt-2">
                            <Timer size={16} color="yellow" />
                            pending
                          </span>
                        ) : (
                          <span className="text-xs md:text-sm items-center flex gap-1 mt-2">
                            <BadgeCheck size={16} color="green" />
                            published
                          </span>
                        )}
                      </div>
                    </div>

                    <h2 className="text-xl font-black uppercase tracking-tight mb-2 leading-none">
                      {topic.course_code}
                    </h2>
                    <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-tighter line-clamp-1">
                      {topic.topic}
                    </h3>
                    <p className="text-[11px] text-gray-700 leading-relaxed font-medium line-clamp-3 mb-8">
                      {topic.topic_desc}
                    </p>

                    <div className="mt-auto py-6 px-4 border-t border-gray-800/40 flex items-center justify-between hover:bg-gray-900/40 hover:border-[#035b77]/40">
                      <span className="text-[9px] font-black uppercase tracking-widest text-gray-600 group-hover:text-[#035b77] transition-colors">
                        Open Material
                      </span>
                      <ChevronRight
                        size={14}
                        className="text-gray-800 group-hover:text-white group-hover:translate-x-1 transition-all"
                      />
                    </div>

                    <div className="mt-auto py-6 px-4 border-t border-gray-800/40 flex items-center justify-between hover:bg-gray-900/40 hover:border-[#035b77]/40">
                      <span className="text-[9px] font-black uppercase tracking-widest text-gray-600 group-hover:text-[#035b77] transition-colors">
                        Edit Material
                      </span>
                      <Edit
                        size={14}
                        className="text-gray-800 group-hover:text-white group-hover:translate-x-1 transition-all"
                      />
                    </div>
                    <div className="flex self-end mt-1 text-sm text-gray-500 font-semibold items-center gap-2">
                      <Calendar size={14} color="lightgray" />
                      {timeAgo.format(topic.date_uploaded)}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Empty Result */}
        {!topicsFetchError && !topicsLoading && filteredTopics.length === 0 && (
          <div className="py-32 text-center border border-dashed border-gray-800 rounded-[3rem]">
            <Database size={48} className="mx-auto text-gray-800 mb-6" />
            <p className="text-[10px] font-black tracking-widest text-gray-600 uppercase">
              Search query returned zero results
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
