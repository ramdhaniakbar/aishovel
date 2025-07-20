import { NextResponse } from 'next/server';
import ytpl from 'ytpl';
import ytdl from '@distube/ytdl-core';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playlistId = searchParams.get('id');

  if (!playlistId || !ytpl.validateID(playlistId)) {
    return NextResponse.json({ error: 'Invalid playlist ID' }, { status: 400 });
  }

  try {
    const playlist = await ytpl(playlistId, { pages: 1 });
    const allUrl = playlist.items
    const allVideo = await Promise.all(
      allUrl.slice(0, 5).map(async (video) => {
        const info = await ytdl.getInfo(video.url);
        const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

        return {
          title: info.videoDetails.title,
          videoUrl: video.url,
          audioUrl: audioFormat.url,
          description: info.videoDetails.description,
        };
      })
    );
    return NextResponse.json(allVideo);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}