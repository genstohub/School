"use client";

import React, { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Heart, 
  Search, 
  Plus, 
  Users, 
  Globe,
  Loader2,
  Trophy,
  MoreHorizontal,
  UserPlus,
  UserCheck
} from "lucide-react";
import { useUser } from "@/hooks";
import Link from "next/link";

// --- Types & Interfaces ---
interface UserProfile {
  first_name?: string;
  last_name?: string;
  profile_pic?: string;
  followers_count?: number;
  top_wins?: number;
}

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    isFollowing: boolean;
  };
  content: string;
  likes: number;
  comments: number;
  hasLiked: boolean;
  timestamp: string;
  tags: string[];
}

interface ActiveStudent {
  id: string;
  name: string;
  role: string;
  isOnline: boolean;
}

export default function CommunityPage() {
  const { user } = useUser() as { user: UserProfile | null };
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    async function fetchFeed() {
      try {
        setLoading(true);
        const res = await fetch("/api/community/feed");
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (err) {
        setPosts([
          {
            id: "p1",
            author: { name: "Amina K.", avatar: "", role: "Medical Student", isFollowing: false },
            content: "Just found an incredible mnemonic for the Krebs cycle! Who wants it? 🧠✨",
            likes: 24,
            comments: 5,
            hasLiked: false,
            timestamp: "10m ago",
            tags: ["Science", "StudyHacks"]
          },
          {
            id: "p2",
            author: { name: "Dr. Ojo", avatar: "", role: "Instructor", isFollowing: true },
            content: "Reminder: The Live Physics marathon starts in 2 hours. Bring your questions! ⚡",
            likes: 89,
            comments: 12,
            hasLiked: true,
            timestamp: "1h ago",
            tags: ["Announcement", "Physics"]
          }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchFeed();
  }, []);

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          hasLiked: !post.hasLiked,
          likes: post.hasLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Profile & Navigation */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-[2rem] p-6 shadow-xl">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-3xl mx-auto mb-4 flex items-center justify-center text-2xl font-bold uppercase shadow-lg">
                {user?.first_name?.[0] || "S"}
              </div>
              <h3 className="font-bold text-lg">{user?.first_name || "Student"} {user?.last_name || ""}</h3>
              <p className="text-gray-500 text-sm">@{user?.first_name?.toLowerCase() || "user"}_edu</p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-800 grid grid-cols-2 gap-4 text-center">
              <div className="group cursor-help">
                <p className="text-xl font-bold text-blue-400 group-hover:scale-110 transition-transform">1.2k</p>
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Followers</p>
              </div>
              <div className="group cursor-help">
                <p className="text-xl font-bold text-yellow-500 group-hover:scale-110 transition-transform">08</p>
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Top Wins</p>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            <NavOption icon={<Globe size={20}/>} label="Global Feed" active />
            <Link href="/students/department">
              <NavOption icon={<Users size={20}/>} label="Study Groups" />
            </Link>
          </nav>
        </div>

        {/* MIDDLE COLUMN: Feed */}
        <main className="lg:col-span-6 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-[2rem] p-5 shadow-2xl">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-800 flex-shrink-0 flex items-center justify-center text-blue-500">
                <Plus size={24} />
              </div>
              <textarea 
                placeholder="Share a study tip or ask a question..."
                className="w-full bg-transparent border-none outline-none text-sm py-2 resize-none h-20 placeholder:text-gray-600"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
              <button className="p-2.5 hover:bg-gray-800 rounded-xl text-gray-400 transition-all">
                <Search size={20} />
              </button>
              <button 
                disabled={!newPost.trim()}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:grayscale text-white px-8 py-2.5 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-blue-900/20"
              >
                Post
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center p-12"><Loader2 className="animate-spin text-blue-500" /></div>
          ) : (
            posts.map(post => <PostCard key={post.id} post={post} onLike={() => handleLike(post.id)} />)
          )}
        </main>

        {/* RIGHT COLUMN: Active Students */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-[2rem] p-6 shadow-xl">
            <h3 className="font-bold mb-5 flex items-center gap-2 text-sm uppercase tracking-widest text-gray-400">
              <Users size={16} className="text-blue-500" /> Active Students
            </h3>
            <div className="space-y-5">
              <ActiveStudentItem name="Sarah Jenkins" role="Pharmacy" isOnline={true} id={""} />
              <ActiveStudentItem name="Isaac Newton" role="Physics" isOnline={true} id={""} />
              <ActiveStudentItem name="Chioma Ade" role="Law" isOnline={false} id={""} />
            </div>
            <button className="w-full mt-6 py-3 text-xs font-bold text-gray-500 hover:text-white transition-colors border-t border-gray-800">
              View All Online
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Sub-Components ---

function NavOption({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl cursor-pointer transition-all duration-300 ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' 
        : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200'
    }`}>
      {icon} <span className="text-sm font-bold tracking-tight">{label}</span>
    </div>
  );
}

function PostCard({ post, onLike }: { post: Post, onLike: () => void }) {
  const [isReplying, setIsReplying] = useState(false);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-[2rem] p-6 hover:border-gray-700 transition-all group shadow-sm">
      <div className="flex justify-between items-start mb-5">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-inner">
            {post.author.name[0]}
          </div>
          <div>
            <h4 className="font-bold text-sm flex items-center gap-2">
              {post.author.name}
              {post.author.isFollowing && <span className="text-[10px] bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full border border-blue-500/20">Following</span>}
            </h4>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{post.author.role} • {post.timestamp}</p>
          </div>
        </div>
        <button className="text-gray-600 hover:text-white p-2 rounded-xl hover:bg-gray-800 transition-all">
          <MoreHorizontal size={20}/>
        </button>
      </div>
      
      <p className="text-sm text-gray-300 leading-relaxed mb-5 px-1">{post.content}</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map(tag => (
          <span key={tag} className="text-[10px] bg-gray-950 text-gray-500 px-3 py-1.5 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors cursor-pointer">#{tag}</span>
        ))}
      </div>

      <div className="flex items-center gap-8 pt-4 border-t border-gray-800/50">
        <button 
          onClick={onLike}
          className={`flex items-center gap-2 transition-all text-xs font-bold ${post.hasLiked ? 'text-red-500 scale-110' : 'text-gray-500 hover:text-red-500'}`}
        >
          <Heart size={18} fill={post.hasLiked ? "currentColor" : "none"} /> {post.likes}
        </button>
        <button 
          onClick={() => setIsReplying(!isReplying)}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-all text-xs font-bold"
        >
          <MessageSquare size={18} /> {post.comments}
        </button>
      </div>

      {isReplying && (
        <div className="mt-4 pt-4 animate-in slide-in-from-top-2 duration-300">
          <div className="flex gap-3">
            <input 
              autoFocus
              type="text" 
              placeholder="Write a reply..." 
              className="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="text-blue-500 text-xs font-bold px-2">Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ActiveStudentItem({ name, role, isOnline }: ActiveStudent) {
  const [followed, setFollowed] = useState(false);

  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center text-xs font-bold">
            {name[0]}
          </div>
          {isOnline && (
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-gray-900 rounded-full shadow-sm" />
          )}
        </div>
        <div>
          <p className="text-xs font-bold">{name}</p>
          <p className="text-[10px] text-gray-500 font-medium">{role}</p>
        </div>
      </div>
      <button 
        onClick={() => setFollowed(!followed)}
        className={`p-2 rounded-xl transition-all ${followed ? 'text-blue-500 bg-blue-500/10' : 'text-gray-600 hover:bg-gray-800 hover:text-white'}`}
      >
        {followed ? <UserCheck size={18} /> : <UserPlus size={18} />}
      </button>
    </div>
  );
}