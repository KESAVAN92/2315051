import axios from "axios";
const BASE_URL = "http://localhost:5000/api/notifications";
export async function fetchNotifications() {
    const response = await axios.get(BASE_URL);
    return response.data.notifications;
}
export async function fetchPriorityNotifications() {
    const response = await axios.get(
        `${BASE_URL}/priority`
    );
    return response.data.notifications;
}