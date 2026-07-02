import { useEffect, useState } from "react";
import { fetchNotifications } from "../api/notificationsApi";

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await fetchNotifications();
        setNotifications(Array.isArray(data) ? data : []);
        setError("");
      } catch (error) {
        console.error(error);
        setNotifications([]);
        setError(error.message || "Unable to load notifications");
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, []);

  return {
    notifications,
    loading,
    error,
    totalPages: Math.max(1, Math.ceil(notifications.length / 5)),
  };
}