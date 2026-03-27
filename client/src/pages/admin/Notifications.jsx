import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../services/api";
import AdminNavbar from "../../components/layout/AdminNavbar";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await API.get("/notifications");
      setNotifications(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch notifications");
    }
  };

  const markRead = async (id) => {
    setLoadingId(id);
    try {
      await API.put(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      toast.success("Notification marked as read");
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark notification as read");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-xl mb-4 font-semibold">Notifications</h2>

        {notifications.length === 0 ? (
          <div className="card text-gray-500">No notifications found.</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n._id}
              className={`card mb-3 ${n.isRead ? "opacity-70" : "border-l-4 border-blue-500"}`}
            >
              <p className="font-medium">{n.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(n.createdAt).toLocaleString()} • {n.type}
              </p>

              {!n.isRead && (
                <button
                  onClick={() => markRead(n._id)}
                  className="btn btn-primary mt-3"
                  disabled={loadingId === n._id}
                >
                  {loadingId === n._id ? "Processing..." : "Mark as Read"}
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
