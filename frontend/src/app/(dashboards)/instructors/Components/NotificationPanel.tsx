import { useUser } from "@/hooks";
import { Notification } from "@/types";
import { Bell, Book, Brain, Loader2, MessageSquare, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const NotificationPanel = ({
  isNotificationOpen,
  setIsNotificationOpen,
  notifications,
  setNotifications,
}: {
  isNotificationOpen: boolean;
  setIsNotificationOpen: Dispatch<SetStateAction<boolean>>;
  notifications: Notification[];
  setNotifications: Dispatch<SetStateAction<Notification[]>>;
}) => {
  const [loading, setLoading] = useState(false);
  
  const {user} = useUser()

  // 1. Fetch Notifications from REST API / Worker
  useEffect(() => {
    async function getNotifications() {
      if (!isNotificationOpen) return; // Only fetch when the drawer opens

      try {
        setLoading(true);
        const res = await fetch("/notifications/get-all-notifications/"+ user.user_id, {
            credentials: "include",
            headers: {"content-Type": "application/json"},
            method: "get"
        }); 
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setNotifications(data.notifications || []);
        setLoading(false)
        alert(notifications);
      } catch (err) {
        console.error("Notification error:", err);
      } finally {
        setLoading(false);
      }
    }
    getNotifications();
  }, []);

  return (
    <>
      <div
        onClick={() => setIsNotificationOpen(false)}
        className="fixed inset-0 bg-black/70 z-40 transition-opacity"
      />
      <div className="fixed top-0 right-0 h-full w-80 bg-gray-900 border-l border-gray-800 shadow-2xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-bold text-white">Notifications</h2>
          <button
            onClick={() => setIsNotificationOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-500">
              <Loader2 className="animate-spin mb-2" size={24} />
              <p className="text-xs">Checking for updates...</p>
            </div>
          ) : notifications.length > 0 ? (
            notifications.map((n) => (
              <div
                key={n.notification_id}
                className={`p-3 rounded-xl border transition-all ${n.status==="read" ? "bg-transparent border-gray-800" : "bg-gray-800/50 border-gray-700 shadow-sm"}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getIcon(n.notification_type)}</div>
                  <div className="flex-1">
                    <p
                      className={`text-sm leading-snug ${n.status==="read" ? "text-gray-400" : "text-gray-200"}`}
                    >
                      {n.notification}
                    </p>
                    <span className="text-[10px] text-gray-500 mt-2 block font-medium uppercase tracking-tight">
                      {n.date_updated}
                    </span>
                  </div>
                  {n.status==="unread" && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Bell className="text-gray-600" size={24} />
              </div>
              <p className="text-gray-400 text-sm">All caught up!</p>
              <p className="text-xs text-gray-600 mt-1">
                No new notifications for you.
              </p>
            </div>
          )}
        </div>

        {notifications.length > 0 && (
          <div className="p-4 border-t border-gray-800">
            <button
              className="w-full py-2 text-xs font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest transition"
              onClick={() =>
                setNotifications((prev) =>
                  prev.map((n) => ({ ...n, isRead: true })),
                )
              }
            >
              Mark all as read
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationPanel;

// Helper to render icon based on type
const getIcon = (type: string) => {
  switch (type) {
    case "course":
      return <Book size={16} className="text-blue-400" />;
    case "quiz":
      return <Brain size={16} className="text-purple-400" />;
    case "message":
      return <MessageSquare size={16} className="text-green-400" />;
    default:
      return <Bell size={16} className="text-gray-400" />;
  }
};
