import { NextResponse } from "next/server";
import youtubesearchapi from "youtube-search-api";

export async function GET(req) {
  try {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const playlistId = searchParams.get("playlistId");
    const limit = parseInt(searchParams.get("limit") || "10", 10); // Default limit: 10 videos

    // Validate required parameter
    if (!playlistId) {
      return NextResponse.json(
        { success: false, message: "playlistId is required" },
        { status: 400 }
      );
    }

    // Fetch videos from the playlist
    const videos = await youtubesearchapi.GetPlaylistData(playlistId, limit);

    // ✅ Add full video URLs to each item
    const formattedVideos = videos.items.map((video) => ({
      id: video.id,
      title: video.title,
      thumbnail: video.thumbnail, // Keep thumbnail data
      url: `https://www.youtube.com/watch?v=${video.id}`, // Generate video URL
      duration: video.length?.simpleText || "N/A", // Duration if available
      channel: video.channelTitle || "Unknown", // Channel name
    }));

    return NextResponse.json(
      { success: true, data: formattedVideos },
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
