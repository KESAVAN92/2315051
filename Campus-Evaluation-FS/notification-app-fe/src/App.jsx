import { Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from "@mui/material";

import { NotificationsPage } from "./pages/NotificationsPage";

export default function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Campus Notification System
          </Typography>

          <Button color="inherit" component={Link} to="/">
            Notifications
          </Button>

          <Button color="inherit" component={Link} to="/priority">
            Priority
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<NotificationsPage />} />
          <Route path="/priority" element={<NotificationsPage />} />
        </Routes>
      </Container>
    </>
  );
}