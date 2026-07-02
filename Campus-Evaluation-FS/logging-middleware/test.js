import { Log } from "./logger.js";
async function testLogger() {
  await Log(
    "frontend",
    "info",
    "component",
    "Notification page loaded successfully."
  );
  await Log(
    "frontend",
    "warn",
    "api",
    "Notification API response is taking longer than expected."
  );
  await Log(
    "backend",
    "error",
    "handler",
    "Unexpected value received while processing notification."
  );
}
testLogger();