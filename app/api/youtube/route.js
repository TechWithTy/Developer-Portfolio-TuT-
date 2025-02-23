import { NextResponse } from "next/server";
import youtubesearchapi from "youtube-search-api";

export async function GET(req) {
  try {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const playlistId = searchParams.get("playlistId");
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    // Validate required parameter
    if (!playlistId) {
      return NextResponse.json(
        { success: false, message: "playlistId is required" },
        { status: 400 }
      );
    }

    // Fetch videos from the playlist
    const videos = await youtubesearchapi.GetPlaylistData(playlistId, limit);

    // ✅ Add full video URLs & extract channel name
    const formattedVideos = videos.items.map((video) => ({
      id: video.id,
      title: video.title,
      thumbnail: video.thumbnail,
      url: `https://www.youtube.com/watch?v=${video.id}`,
      duration: video.length?.simpleText || "N/A",
      channel: video.shortBylineText?.runs?.[0]?.text || "Unknown", // ✅ Fixed channel name extraction
    }));

    return NextResponse.json(
      { success: true, data: formattedVideos, originalResponse: videos }, // ✅ Include raw API response
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching YouTube playlist videos:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch playlist videos" },
      { status: 500 }
    );
  }
}
