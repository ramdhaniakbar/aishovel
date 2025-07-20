import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

type VideoMeta = {
  id: string;
  title: string;
  description: string;
};

const extractPlaylistId = (url: string): string | null => {
  const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

export const fetchPlaylistData = async (playlistUrl: string, dataLength: number): Promise<VideoMeta[]> => {
  const playlistId = extractPlaylistId(playlistUrl);
  if (!playlistId) {
    throw new Error('Invalid playlist URL');
  }
  let nextPageToken = '';
  let allItems: VideoMeta[] = [];
  const targetBatch = dataLength; // misalnya batch ke-3
  let currentBatch = 1;
  try {
    do {
    const res = await axios.get(`${BASE_URL}/playlistItems`, {
      params: {
        part: 'snippet,contentDetails',
        playlistId,
        maxResults: 10,
        pageToken: nextPageToken,
        key: API_KEY,
      },
    });
    nextPageToken = res.data.nextPageToken;
        if (currentBatch === targetBatch) {
          const items = res.data.items.map((item: any): VideoMeta => ({
            id: item.contentDetails.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
          }));
          allItems = [...allItems, ...items];
          break; // berhenti setelah dapet batch yang dimaksud
        }
        currentBatch++;
      } while (nextPageToken);
      return allItems;
    } catch (err) {
      console.error("Gagal fetch data:", err);
      return [];
    }
};
