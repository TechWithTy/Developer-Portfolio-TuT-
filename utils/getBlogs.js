import { personalData } from "./data/personal-data";

export async function getBlogs() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const apiUrl = `${baseUrl}/api/getBlogs`;
  console.log("🔍 Fetching from:", apiUrl);

  try {
    const res = await fetch(apiUrl);

    // 🚨 Log error response status
    if (!res.ok) {
      console.error(`❌ API request failed: ${res.status} ${res.statusText}`);
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    let data = await res.json();
    console.log("✅ Fetched Blogs Data (Raw):", data);

    // 🔥 Ensure data is an array before filtering
    if (!Array.isArray(data)) {
      console.error("❌ Error: API response is not an array!", data);
      return [];
    }

    // ✅ Filter only articles with a cover image
    const filteredBlogs = data.filter((item) => item?.cover_image);
    console.log("✅ Filtered Blogs:", filteredBlogs);

    return filteredBlogs;
  } catch (error) {
    console.warn("⚠️ Base URL:", baseUrl);
    console.error(
      "❌ Error fetching blogs:",
      `${baseUrl}/api/getBlogs`,

      error
    );

    return [];
  }
}
