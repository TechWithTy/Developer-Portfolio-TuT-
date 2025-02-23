export async function GET(req, { params }) {
    try {
      const { id } = params; // Extract blog ID from request parameters
  
      if (!id) {
        return new Response(JSON.stringify({ error: "Blog ID is required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      const DEVTO_API_URL = `https://dev.to/api/articles/${id}`;
  
      console.log("🔍 Fetching single blog from:", DEVTO_API_URL);
  
      const response = await fetch(DEVTO_API_URL, {
        headers: {
          Accept: "application/vnd.forem.api-v1+json",
          "api-key": process.env.DEVTO_API_KEY, // Ensure this is in `.env.local`
        },
      });
  
      if (!response.ok) {
        console.error(
          `❌ Failed to fetch blog: ${response.status} ${response.statusText}`
        );
        throw new Error(`Failed to fetch blog: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("✅ Single Blog API Response:", data);
  
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("❌ API Route Error:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch blog" }), {
        status: 500,
      });
    }
  }
  