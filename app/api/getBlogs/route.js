export async function GET() {
  try {
    const DEVTO_API_URL = "https://dev.to/api/articles/me";

    console.log("🔍 Fetching API from:", DEVTO_API_URL);

    const response = await fetch(DEVTO_API_URL, {
      headers: {
        Accept: "application/vnd.forem.api-v1+json",
        "api-key": process.env.DEVTO_API_KEY, // Ensure this is in `.env.local`
        "User-Agent": "curl/7.64.1",
        Connection: "close",
      },
      cache: "no-store", // 🚀 Disable fetch caching
    });

    if (!response.ok) {
      console.error(
        `❌ Failed to fetch: ${response.status} ${response.statusText}`
      );
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ API Response Data (Before Sending):", data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("❌ API Route Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch blogs" }), {
      status: 500,
    });
  }
}
