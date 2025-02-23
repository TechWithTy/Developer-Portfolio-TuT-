import { NextResponse } from "next/server";
import youtubesearchapi from "youtube-search-api";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const playlistId = searchParams.get("playlistId");
    const limitParam = searchParams.get("limit");

    // ✅ Convert limit to a number or use null if not provided
    const limit = limitParam ? parseInt(limitParam, 10) : null;

    // Validate required parameter
    if (!playlistId) {
      return NextResponse.json(
        { success: false, message: "playlistId is required" },
        { status: 400 }
      );
    }

    // Fetch videos from the playlist (no limit if not provided)
    const videos = await youtubesearchapi.GetPlaylistData(playlistId, limit || undefined);

    // ✅ Format videos with URLs & channel info
    const formattedVideos = videos.items.map((video) => ({
      id: video.id,
      title: video.title,
      thumbnail: video.thumbnail,
      url: `https://www.youtube.com/watch?v=${video.id}`,
      duration: video.length?.simpleText || "N/A",
      channel: video.shortBylineText?.runs?.[0]?.text || "Unknown",
    }));

    return NextResponse.json(
      { success: true, data: formattedVideos, originalResponse: videos },
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
