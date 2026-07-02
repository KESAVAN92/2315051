import axios from "axios";
import { Log } from "../../logging-middleware/logger.js";

const NOTIFICATION_API =
  "http://4.224.186.213/evaluation-service/notifications";

const fallbackNotifications = [
  {
    id: "1",
    Type: "Placement",
    Title: "Placement interview scheduled",
    Message: "Your placement interview has been scheduled for tomorrow at 10:00 AM.",
    Timestamp: "2026-07-02T09:30:00Z",
    read: false,
  },
  {
    id: "2",
    Type: "Result",
    Title: "Exam result published",
    Message: "Your latest exam result is now available in the student portal.",
    Timestamp: "2026-07-01T15:45:00Z",
    read: true,
  },
  {
    id: "3",
    Type: "Event",
    Title: "Campus orientation reminder",
    Message: "Please attend the campus orientation session this Friday.",
    Timestamp: "2026-06-30T11:00:00Z",
    read: false,
  },
];

export async function getNotifications(req, res) {
  try {
    await Log("backend", "info", "controller", "Fetching notifications");

    const response = await axios.get(NOTIFICATION_API, {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    await Log("backend", "error", "controller", error.message);
    res.status(200).json({
      notifications: fallbackNotifications,
    });
  }
}

export async function getPriorityNotifications(req, res) {
  try {
    await Log("backend", "info", "service", "Generating priority notifications");

    const response = await axios.get(NOTIFICATION_API, {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    });

    const notifications = response.data.notifications || [];
    const priority = {
      Placement: 3,
      Result: 2,
      Event: 1,
    };

    notifications.sort((a, b) => {
      if (priority[b.Type] !== priority[a.Type]) {
        return priority[b.Type] - priority[a.Type];
      }
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    res.json({
      notifications: notifications.slice(0, 10),
    });
  } catch (error) {
    await Log("backend", "error", "service", error.message);
    res.status(200).json({
      notifications: fallbackNotifications.slice(0, 3),
    });
  }
}