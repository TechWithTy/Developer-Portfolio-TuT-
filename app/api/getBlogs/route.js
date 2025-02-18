
export async function GET() {
  try {
    const DEVTO_API_URL = "https://dev.to/api/articles/me";

    console.log("🔍 Fetching API from:", DEVTO_API_URL);

    const response = await fetch(DEVTO_API_URL, {
      headers: {
        Accept: "application/vnd.forem.api-v1+json",
        "api-key": process.env.DEVTO_API_KEY, // 🔥 Ensure this is defined in `.env.local`
        "User-Agent": "curl/7.64.1", // 🚀 Mimic cURL's user agent
        Connection: "close", // 🔥 Prevents keep-alive issues
      },
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
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ API Route Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch blogs" }), {
      status: 500,
    });
  }
}
