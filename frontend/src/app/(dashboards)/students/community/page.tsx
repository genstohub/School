"use client";

import React, { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  Search, 
  Plus, 
  Users, 
  Flame, 
  Globe,
  Loader2,
  Trophy,
  MoreHorizontal
} from "lucide-react";
import { useUser } from "@/hooks";

// --- Types & Interfaces ---
interface UserProfile {
  first_name?: string;
  last_name?: string;
  profile_pic?: string;
}

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  tags: string[];
}

interface TrendingGroup {
  id: string;
  name: string;
  members: number;
  category: string;
}

interface NavOptionProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export default function CommunityPage() {
  // Specify UserProfile type instead of any
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
        // Fallback Mock Data for FE development
        setPosts([
          {
            id: "p1",
            author: { name: "Amina K.", avatar: "", role: "Medical Student" },
            content: "Just found an incredible mnemonic for the Krebs cycle! Who wants it? 🧠✨",
            likes: 24,
            comments: 5,
            timestamp: "10m ago",
            tags: ["Science", "StudyHacks"]
          },
          {
            id: "p2",
            author: { name: "Dr. Ojo", avatar: "", role: "Instructor" },
            content: "Reminder: The Live Physics marathon starts in 2 hours. Bring your questions! ⚡",
            likes: 89,
            comments: 12,
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

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Profile Summary */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl font-bold uppercase">
                {user?.first_name?.[0] || <Users size={32} />}
              </div>
              <h3 className="font-bold text-lg">{user?.first_name || "Student"} {user?.last_name || ""}</h3>
              <p className="text-gray-500 text-sm">@{user?.first_name?.toLowerCase() || "user"}_edu</p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-800 grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-xl font-bold">1.2k</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Points</p>
              </div>
              <div>
                <p className="text-xl font-bold">12</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold">Badges</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            <NavOption icon={<Globe size={18}/>} label="Global Feed" active />
            <NavOption icon={<Users size={18}/>} label="Study Groups" />
            <NavOption icon={<Trophy size={18}/>} label="Leaderboard" />
          </nav>
        </div>

        {/* MIDDLE COLUMN: Feed */}
        <main className="lg:col-span-6 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-4 shadow-xl">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-800 flex-shrink-0 flex items-center justify-center">
                <Plus className="text-gray-600" size={20} />
              </div>
              <textarea 
                placeholder="Share what you learned today..."
                className="w-full bg-transparent border-none outline-none text-sm py-2 resize-none h-20 placeholder:text-gray-600"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
              <div className="flex gap-2">
                 <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 transition-colors">
                   <Search size={18} />
                 </button>
              </div>
              <button 
                disabled={!newPost.trim()}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-xl text-sm font-bold transition"
              >
                Post
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center p-12"><Loader2 className="animate-spin text-blue-500" /></div>
          ) : (
            posts.map(post => <PostCard key={post.id} post={post} />)
          )}
        </main>

        {/* RIGHT COLUMN: Trending */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Flame size={18} className="text-orange-500" /> Trending Groups
            </h3>
            <div className="space-y-4">
              <TrendingGroupItem id="g1" name="IELTS Prep 2026" members={2403} category="English" />
              <TrendingGroupItem id="g2" name="Python Beginners" members={1102} category="Coding" />
              <TrendingGroupItem id="g3" name="Medical Ethics" members={890} category="Medicine" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Sub-Components ---

function NavOption({ icon, label, active = false }: NavOptionProps) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
      active 
        ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20' 
        : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200'
    }`}>
      {icon} <span className="text-sm font-bold">{label}</span>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-gray-700 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg">
            {post.author.name[0]}
          </div>
          <div>
            <h4 className="font-bold text-sm">{post.author.name}</h4>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">{post.author.role} • {post.timestamp}</p>
          </div>
        </div>
        <button className="text-gray-600 hover:text-white transition-colors"><MoreHorizontal size={18}/></button>
      </div>
      
      <p className="text-sm text-gray-300 leading-relaxed mb-4">{post.content}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map(tag => (
          <span key={tag} className="text-[10px] bg-gray-800/50 text-gray-400 px-2 py-1 rounded-md border border-gray-800">#{tag}</span>
        ))}
      </div>

      <div className="flex items-center gap-6 pt-4 border-t border-gray-800">
        <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors text-xs font-bold">
          <Heart size={16} /> {post.likes}
        </button>
        <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors text-xs font-bold">
          <MessageSquare size={16} /> {post.comments}
        </button>
        <button className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs ml-auto">
          <Share2 size={16} />
        </button>
      </div>
    </div>
  );
}

function TrendingGroupItem({ name, members, category }: TrendingGroup) {
  return (
    <div className="group cursor-pointer p-2 -mx-2 rounded-xl hover:bg-gray-800/50 transition-colors">
      <p className="text-xs font-bold group-hover:text-blue-500 transition-colors">{name}</p>
      <div className="flex justify-between text-[10px] text-gray-500 mt-1 uppercase font-semibold">
        <span>{category}</span>
        <span>{members.toLocaleString()} members</span>
      </div>
    </div>
  );
}