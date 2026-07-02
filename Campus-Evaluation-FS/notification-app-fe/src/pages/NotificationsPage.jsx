import { useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { NotificationCard } from "../components/NotificationCard";
import NotificationFilter from "../components/NotificationFilter";
import useNotifications from "../hooks/useNotifications";

export function NotificationsPage() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const { notifications, totalPages, loading, error } = useNotifications();

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const filteredNotifications = useMemo(() => {
    if (!filter || filter === "All") {
      return notifications;
    }
    return notifications.filter((notification) => notification.Type === filter);
  }, [filter, notifications]);

  const pageSize = 5;
  const totalPagesCount = Math.max(1, Math.ceil(filteredNotifications.length / pageSize));
  const visibleNotifications = filteredNotifications.slice((page - 1) * pageSize, page * pageSize);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(1);
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", px: 2, py: 4 }}>
      <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
        <Badge badgeContent={unreadCount} color="primary" max={99}>
          <NotificationsIcon sx={{ fontSize: 28 }} />
        </Badge>
        <Typography variant="h5" fontWeight={700}>
          Notifications
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ marginBottom: 3 }}>
        <NotificationFilter value={filter} onChange={handleFilterChange} />
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error">Failed to load notifications: {error}</Alert>
      )}

      {!loading && !error && filteredNotifications.length === 0 && (
        <Alert severity="info">No notifications to display right now.</Alert>
      )}

      {!loading && !error && filteredNotifications.length > 0 && (
        <Stack spacing={1.5}>
          {visibleNotifications.map((notification) => (
            <NotificationCard
              key={notification.id || notification.Timestamp || notification.Title}
              notification={notification}
            />
          ))}
        </Stack>
      )}

      {!loading && !error && totalPagesCount > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPagesCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
}
