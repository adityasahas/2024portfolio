// @ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { Image, Progress, Link } from "@nextui-org/react";
import { FaGithub } from "react-icons/fa";
import { SiSpotify } from "react-icons/si";
export default function NameAndGitandSpotify() {
  const [commit, setCommit] = useState(null);
  const [playbackState, setPlaybackState] = useState(null);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())

      .then((data) => {
        setCommit(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the latest commit:", error);
        setIsLoading(false);
      });
  }, []);

  const fetchPlaybackState = async () => {
    setIsLoading(true);
    const response = await fetch("/api/spotify", { cache: "no-cache" });

    const data = await response.json();
    if (!data || !data.item) {
      throw new Error("Invalid data format");
    }

    setPlaybackState(data);
    setProgressPercentage((data.progress_ms / data.item.duration_ms) * 100);
  };

  useEffect(() => {
    fetchPlaybackState();

    const interval = setInterval(() => {
      if (playbackState && playbackState.is_playing) {
        let newProgress =
          ((playbackState.progress_ms + 1000) /
            playbackState.item.duration_ms) *
          100;

        if (newProgress >= 100) {
          fetchPlaybackState();
        } else {
          setProgressPercentage(newProgress);
          setPlaybackState((prevState) => ({
            ...prevState,
            progress_ms: prevState.progress_ms + 1000,
          }));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [playbackState]);
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="flex md:flex-row flex-col gap-8">
        <div className="bg-[#131315] flex-grow rounded-3xl p-6">
          <h1 className="text-white text-3xl md:text-5xl">
            aditya sahas,
            <span className="text-[#8A8A93]  mt-2 ">
              <br />
              biryani enthusiast,
              <br /> full-stack developer, <br />
              and a startup founder.
            </span>
          </h1>
        </div>

        <div className="flex flex-col md:w-1/2 w-full gap-8">
          <div className="bg-[#131315] rounded-3xl p-6 md:col-span-1">
            <div className="flex items-center">
              <FaGithub size={40} color="#8A8A93" />
              <h2 className="text-white text-lg ml-4">GitHub </h2>
            </div>
            <p className="text-[#8A8A93] mt-2">
              Latest commit in{" "}
              {commit && commit.repoVisibility === "private" ? (
                <Link
                  isDisabled
                  isExternal
                  showAnchorIcon
                  color="primary"
                  isBlock
                >
                  {commit.repoName}
                </Link>
              ) : (
                <Link
                  color="primary"
                  showAnchorIcon
                  isBlock
                  isExternal
                  href={commit?.commitUrl}
                >
                  {commit?.repoName}
                </Link>
              )}
              <br />
              <code>{commit ? commit.commitMessage : "loading..."}</code>
              <br />
              Committed on{" "}
              <span className="font-mono">
                {commit
                  ? new Date(commit.commitDate).toLocaleString()
                  : "loading..."}
              </span>
            </p>
          </div>

          <div className="bg-[#131315] rounded-3xl p-6 md:col-span-1">
            <div className="flex items-center">
              <SiSpotify size={40} color="#8A8A93" />
              <h2 className="text-white text-lg ml-4">
                Spotify Currently Playing{" "}
              </h2>
            </div>
            {playbackState && playbackState.item ? (
              <div className="mt-2">
                <div className="flex items-center">
                  <Image
                    src={
                      playbackState.item.album.images &&
                      playbackState.item.album.images.length > 0
                        ? playbackState.item.album.images[0].url
                        : "/next.svg"
                    }
                    alt="Album cover"
                    width={100}
                    height={100}
                    className="object-cover"
                  />

                  <div className="ml-4">
                    <p className="text-white">
                      {playbackState.item.name} -{" "}
                      {playbackState.item.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                    </p>
                    <p className="text-[#8A8A93]">
                      {playbackState.item.album.name}
                    </p>
                  </div>
                </div>
                <Progress value={progressPercentage} className="mt-4" />
              </div>
            ) : (
              <p>Loading Spotify playback state...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
