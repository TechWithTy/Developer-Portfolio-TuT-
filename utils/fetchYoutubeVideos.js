import { getYoutubeVideos } from "@/api/getYoutubeVideos";

const DEFAULT_SEARCH_QUERY = "AI technology"; // Change this to match your use case
const MAX_RESULTS = 6;

export async function fetchYoutubeVideos(searchQuery = DEFAULT_SEARCH_QUERY) {
  return await getYoutubeVideos(searchQuery, MAX_RESULTS);
}
