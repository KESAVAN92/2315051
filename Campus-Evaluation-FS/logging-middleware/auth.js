import { ACCESS_TOKEN } from "./config.js";
export function getAuthHeaders() {
 return {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  };
}