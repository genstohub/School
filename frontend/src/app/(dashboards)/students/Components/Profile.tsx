"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Camera, 
  MapPin, 
  School, 
  BookOpen, 
  User, 
  Mail, 
  Save, 
  Loader2,
  CheckCircle2
} from "lucide-react";

interface StudentProfile {
  name: string;
  email: string;
  profilePic: string;
  institution: string;
  department: string;
  country: string;
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Fetch initial data
  useEffect(() => {
    async function fetchProfile() {
      try {
        // Replace with your actual auth-protected API
        const response = await fetch("/api/student/profile");
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        // Fallback for UI demonstration
        setProfile({
          name: "James Kuty",
          email: "james.kuty@example.com",
          profilePic: "", 
          institution: "University of Lagos",
          department: "Computer Science",
          country: "Nigeria"
        });
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && profile) {
      // Create local preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profilePic: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(res => setTimeout(res, 1000));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          {showSuccess && (
            <div className="flex items-center gap-2 text-green-400 animate-fade-in">
              <CheckCircle2 size={18} />
              <span className="text-sm font-medium">Profile Updated</span>
            </div>
          )}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Header/Cover Area */}
          <div className="h-32 bg-gradient-to-r from-blue-900 to-blue-700 relative"></div>

          <div className="px-8 pb-8">
            {/* Profile Picture Section */}
            <div className="relative -mt-16 mb-8 flex flex-col items-center sm:items-start">
              <div className="relative group">
                <div className="w-32 h-32 rounded-3xl border-4 border-gray-900 overflow-hidden bg-gray-800 shadow-xl">
                  {profile?.profilePic ? (
                    <img src={profile.profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500">
                      <User size={48} />
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg transition-transform active:scale-90"
                >
                  <Camera size={18} />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  accept="image/*" 
                />
              </div>
              <div className="mt-4 text-center sm:text-left">
                <h2 className="text-2xl font-bold">{profile?.name}</h2>
                <p className="text-gray-400 flex items-center justify-center sm:justify-start gap-2">
                  <Mail size={14} /> {profile?.email}
                </p>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileField 
                icon={<School className="text-blue-500" />} 
                label="Institution" 
                value={profile?.institution} 
              />
              <ProfileField 
                icon={<BookOpen className="text-purple-500" />} 
                label="Department" 
                value={profile?.department} 
              />
              <ProfileField 
                icon={<MapPin className="text-red-500" />} 
                label="Country" 
                value={profile?.country} 
              />
              <ProfileField 
                icon={<User className="text-green-500" />} 
                label="Full Name" 
                value={profile?.name} 
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-10 pt-8 border-t border-gray-800 flex justify-end">
              <button 
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50"
              >
                {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for clean organization
function ProfileField({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) {
  return (
    <div className="p-4 bg-gray-800/40 rounded-2xl border border-gray-800 group hover:border-gray-700 transition">
      <div className="flex items-center gap-3 mb-1">
        {icon}
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-gray-200 font-semibold pl-8">{value || "Not Set"}</p>
    </div>
  );
}