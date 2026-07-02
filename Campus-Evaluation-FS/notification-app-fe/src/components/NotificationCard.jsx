import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";

export function NotificationCard({ notification }) {
  if (!notification) {
    return null;
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography variant="subtitle1" fontWeight={600}>
            {notification.Title || notification.title || "Notification"}
          </Typography>
          <Chip label={notification.Type || notification.type || "General"} size="small" />
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {notification.Message || notification.message || "No details available."}
        </Typography>
        <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: "block" }}>
          {notification.Timestamp || notification.timestamp || ""}
        </Typography>
      </CardContent>
    </Card>
  );
}
