"use client";

import React, { useState } from "react";
import { 
  User as UserIcon, 
  Lock, 
  Bell, 
  Shield, 
  Save, 
  Camera, 
  Mail, 
  Globe,
  Loader2,
  CheckCircle2
} from "lucide-react";
import { useUser } from "@/hooks";

// --- Interfaces ---
interface UserData {
  first_name?: string;
  last_name?: string;
  email?: string;
  profile_pic?: string;
}

type TabType = "profile" | "security" | "notifications";

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

interface ToggleItemProps {
  title: string;
  description: string;
  defaultChecked?: boolean;
}

export default function SettingsPage() {
  const { user } = useUser() as { user: UserData }; // Assuming useUser returns an object with user
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-gray-400">Manage your profile information and security preferences.</p>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 space-y-2">
            <TabButton 
              active={activeTab === "profile"} 
              onClick={() => setActiveTab("profile")}
              icon={<UserIcon size={18} />}
              label="Public Profile"
            />
            <TabButton 
              active={activeTab === "security"} 
              onClick={() => setActiveTab("security")}
              icon={<Lock size={18} />}
              label="Security"
            />
            <TabButton 
              active={activeTab === "notifications"} 
              onClick={() => setActiveTab("notifications")}
              icon={<Bell size={18} />}
              label="Notifications"
            />
          </aside>

          <main className="flex-1 bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-8 relative">
            {activeTab === "profile" && <ProfileSettings user={user} />}
            {activeTab === "security" && <SecuritySettings />}
            {activeTab === "notifications" && <NotificationSettings />}

            <div className="mt-10 pt-6 border-t border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-green-400 h-6">
                {showSuccess && (
                  <>
                    <CheckCircle2 size={18} />
                    <span className="text-sm font-medium">Changes saved successfully!</span>
                  </>
                )}
              </div>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all"
              >
                {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// --- Sub-Components ---

function ProfileSettings({ user }: { user: UserData }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6 mb-8">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-gray-800 border-2 border-gray-700 overflow-hidden">
            {user?.profile_pic ? (
              <img src={user.profile_pic} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500"><UserIcon size={40} /></div>
            )}
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full border-4 border-gray-900 hover:bg-blue-500 transition shadow-lg">
            <Camera size={14} />
          </button>
        </div>
        <div>
          <h3 className="font-bold text-lg">Profile Picture</h3>
          <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size of 2MB.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="First Name" defaultValue={user?.first_name} />
        <Input label="Last Name" defaultValue={user?.last_name} />
        <Input label="Email Address" defaultValue={user?.email} icon={<Mail size={16} />} disabled />
        <Input label="Location" placeholder="Lagos, Nigeria" icon={<Globe size={16} />} />
      </div>
      
      <div>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Bio</label>
        <textarea 
          className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition min-h-[100px]"
          placeholder="Tell us a little bit about yourself..."
        />
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex gap-3">
        <Shield className="text-blue-400 shrink-0" size={20} />
        <p className="text-xs text-blue-100 leading-relaxed">
          Ensure your account is using a strong password. We recommend using a mix of letters, numbers, and special characters.
        </p>
      </div>
      <div className="space-y-4">
        <Input label="Current Password" type="password" />
        <Input label="New Password" type="password" />
        <Input label="Confirm New Password" type="password" />
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="space-y-4">
      <ToggleItem title="Email Notifications" description="Receive course updates and announcements via email." defaultChecked />
      <ToggleItem title="Push Notifications" description="Get instant alerts for live classes and quiz starts." defaultChecked />
      <ToggleItem title="Marketing Emails" description="Receive offers and news about new features." />
    </div>
  );
}

// --- UI Elements ---

function TabButton({ active, onClick, icon, label }: TabButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
        active ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
      }`}
    >
      {icon} {label}
    </button>
  );
}

function Input({ label, icon, ...props }: InputProps) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">{icon}</div>}
        <input 
          {...props}
          className={`w-full bg-gray-800 border border-gray-700 rounded-xl py-3 outline-none focus:ring-2 focus:ring-blue-500 transition text-sm ${icon ? 'pl-11 pr-4' : 'px-4'}`}
        />
      </div>
    </div>
  );
}

function ToggleItem({ title, description, defaultChecked }: ToggleItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl border border-gray-800">
      <div>
        <h4 className="text-sm font-bold text-gray-200">{title}</h4>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <input type="checkbox" defaultChecked={defaultChecked} className="w-5 h-5 accent-blue-600 cursor-pointer" />
    </div>
  );
}