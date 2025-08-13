import { API_BASE_URL, API_KEY } from "@env";

export const config = {
  api: {
    baseUrl: API_BASE_URL,
    key: API_KEY,
  },
} as const;

// Validate required environment variables
if (!API_BASE_URL) {
  console.warn("API_BASE_URL is not set in environment variables");
}

if (!API_KEY) {
  console.warn("API_KEY is not set in environment variables");
}

export default config;
