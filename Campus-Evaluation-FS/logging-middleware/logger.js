import axios from "axios";
import { LOG_API_URL } from "./config.js";
import { getAuthHeaders } from "./auth.js";
export async function Log(stack, level, packageName, message) {
try {
    const response = await axios.post(
      LOG_API_URL,
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Logging API Error:",
      error.response?.data || error.message
    );
return null;
  }
}