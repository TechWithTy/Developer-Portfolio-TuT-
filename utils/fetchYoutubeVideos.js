import axios from "axios";

const DEFAULT_PLAYLIST_ID = process.env.youtubePlaylistID || "PLjcNzWp8XCA8g6K6QzRMxi0gyVeke-cBf"; // Default Playlist

export async function fetchYoutubeVideos(playlistId = DEFAULT_PLAYLIST_ID, limit = null) {
  try {
    const response = await axios.get(`/api/youtube`, {
      params: {
        playlistId,
        ...(limit && { limit }), // ✅ Only add limit if it's provided
      },
    });

    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching YouTube videos from internal API:", error);
    return [];
  }
}
