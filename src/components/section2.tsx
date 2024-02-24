// @ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import { Image, Progress, Link } from "@nextui-org/react";
import { FaGithub } from "react-icons/fa";
import { SiSpotify } from "react-icons/si";
import { SiNextdotjs, SiTailwindcss, SiPython, SiJavascript, SiTensorflow, SiNumpy, SiAmazonaws } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";

export default function NameAndGitandSpotify() {
  const [commit, setCommit] = useState(null);
  const [playbackState, setPlaybackState] = useState(null);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const skills = [
    {
      name: "Next.js",
      icon: SiNextdotjs,
    },
    {
      name: "Tailwind CSS",
      icon: SiTailwindcss,
    },
    {
      name: "Python",
      icon: SiPython,
    },
    {
      name: "JavaScript",
      icon: SiJavascript,
    },
    {
      name: "Node.js",
      icon: FaNodeJs,
    },
    {
      name: "Tensorflow",
      icon: SiTensorflow,
    },
    {
      name: "NumPy",
      icon: SiNumpy,
    },
    {
      name: "AWS",
      icon: SiAmazonaws,
    },
  ];
  
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
    const response = await fetch("/api/spotify");

    const data = await response.json();

    if (data.currentlyPlaying === false) {
      setPlaybackState(null);
      setIsLoading(false);
      return;
    }

    setPlaybackState(data);
    console.log(data);
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
    }, 2000);

    return () => clearInterval(interval);
  }, [playbackState]);
  return (
    <div className="max-w-6xl mx-auto mt-5">
      <div className="flex md:flex-row flex-col gap-8">
        <div className=" flex flex-col md:w-1/2 w-full gap-8">
          <div className="bg-[#131315] flex-grow rounded-xl p-6 transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
            <h1 className="text-white text-3xl md:text-5xl">
              aditya sahas,
              <span className="text-[#8A8A93]  mt-2 ">
                <br />
                high schooler,
                <br /> full-stack developer, <br />
                and a startup founder.
              </span>
            </h1>
          </div>
          <div className="bg-[#131315] rounded-xl p-6 md:col-span-1 transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
 
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {skills.map((skill) => (
      <div key={skill.name} className="bg-[#131315] rounded-xl p-3 transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] flex items-center justify-center">
        <skill.icon size={22} color="#FFF" />
      </div>
    ))}
  </div>
</div>


        </div>


        <div className="flex flex-col md:w-1/2 w-full gap-8">
          <div className="bg-[#131315] rounded-xl p-6 md:col-span-1 transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
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

          <div className="bg-[#131315] rounded-xl p-6 md:col-span-1 transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]">
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
                    <p className="text-white text-2xl">
                      {playbackState.item.name}

                    </p>
                    <p className="text-[#8A8A93]">
                      {playbackState.item.artists
                        .map((artist) => artist.name)
                        .join(", ")}                    </p>
                  </div>
                </div>
                {playbackState.is_playing === false && (
                  <Progress
                    value={0}
                    className="mt-4"
                    size="sm"
                    label="Paused"
                  />
                )

                }
                {playbackState.is_playing === true && (
                  <Progress
                    value={progressPercentage}
                    className="mt-4"
                  />
                )}
              </div>
            ) : (
              <p>Not playing Spotify right now.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
