import { NextResponse } from "next/server";

async function refreshAccessToken(refreshToken) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const data = await response.json();
  return data.access_token;
}

export async function GET(req, res) {
  const accessToken = await refreshAccessToken(
    process.env.SPOTIFY_REFRESH_TOKEN
  );

  const playbackResponse = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      // next: { revalidate: 0 },
      cache: "no-cache",
    }
  );

  const playbackState = await playbackResponse.json();
  return NextResponse.json(playbackState);
}
