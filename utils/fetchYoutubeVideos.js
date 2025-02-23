import axios from "axios";

const DEFAULT_PLAYLIST_ID = "PLjcNzWp8XCA8g6K6QzRMxi0gyVeke-cBf"; // Default Playlist
const MAX_RESULTS = 6;

export async function fetchYoutubeVideos(playlistId = DEFAULT_PLAYLIST_ID, limit = MAX_RESULTS) {
  try {
    const response = await axios.get(`/api/youtube`, {
      params: {
        playlistId,
        limit,
      },
    });

    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching YouTube videos from internal API:", error);
    return [];
  }
}
