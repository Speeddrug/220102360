// LoggingMiddleware/logger.js

const API_URL = "http://20.244.56.144/evaluation-service/logs";
const TOKEN = " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwcmFnYXRpYWdnYXJ3YWwyMDA1QGdtYWlsLmNvbSIsImV4cCI6MTc1ODM0Nzg1OCwiaWF0IjoxNzU4MzQ2OTU4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNTE2MmQ2MzItYjU0OC00NGU1LWJmMjAtZTI0NGExMzRmNDkzIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicHJhZ2F0aSBhZ2dhcndhbCIsInN1YiI6IjEzYWRhMDc4LTNmOWQtNGFmMy04ZDQ4LThjMmRlNWFhODM0ZSJ9LCJlbWFpbCI6InByYWdhdGlhZ2dhcndhbDIwMDVAZ21haWwuY29tIiwibmFtZSI6InByYWdhdGkgYWdnYXJ3YWwiLCJyb2xsTm8iOiIyMjAxMDIzNjAiLCJhY2Nlc3NDb2RlIjoiU2ttbmV3IiwiY2xpZW50SUQiOiIxM2FkYTA3OC0zZjlkLTRhZjMtOGQ0OC04YzJkZTVhYTgzNGUiLCJjbGllbnRTZWNyZXQiOiJUS1JIeVJHQVl1UlJHUkpLIn0.Ok4pikUFI73H14F-ylm8--QSEalrxsKsxGFtTHAr-4Q"; // full token

const ALLOWED_STACKS = ["backend", "frontend"];
const ALLOWED_LEVELS = ["debug", "info", "warn", "error", "fatal"];
const FRONTEND_PACKAGES = ["component", "hook", "page", "state", "style"];
const COMMON_PACKAGES = ["auth", "config", "middleware", "utils"];

/**
 * Reusable log function
 */
export async function Log(stack, level, packageName, message) {
  stack = stack.toLowerCase();
  level = level.toLowerCase();
  packageName = packageName.toLowerCase();

  if (!ALLOWED_STACKS.includes(stack)) throw new Error(`Invalid stack: ${stack}`);
  if (!ALLOWED_LEVELS.includes(level)) throw new Error(`Invalid level: ${level}`);

  const validPackages = [...FRONTEND_PACKAGES, ...COMMON_PACKAGES];
  if (!validPackages.includes(packageName)) {
    throw new Error(`Invalid package: ${packageName} for stack: ${stack}`);
  }

  const payload = { stack, level, package: packageName, message };

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": TOKEN
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error("Failed to send log:", err);
  }
}
