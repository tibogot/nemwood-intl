import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "my0lnpp8",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false, // Disable CDN for development to avoid module resolution issues
  token: process.env.SANITY_API_TOKEN, // Add token if you have one
});

export default client;
