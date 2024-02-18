import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET(req, res) {
  const githubUsername = "adityasahas";
  const token = process.env.GITHUB_TOKEN;

  const commitsResponse = await fetch(
    `https://api.github.com/search/commits?q=author:${githubUsername}&sort=author-date&order=desc`,
    {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.cloak-preview",
      },
    }
  );

  const commitsData = await commitsResponse.json();

  const latestCommit = commitsData.items[0];

  const repoResponse = await fetch(latestCommit.repository.url, {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  const repoData = await repoResponse.json();
  const response = {
    commitMessage: latestCommit.commit.message,
    commitUrl: latestCommit.html_url,
    repoName: repoData.name,
    repoUrl: repoData.html_url,
    repoStars: repoData.stargazers_count,
    commitDate: latestCommit.commit.author.date,
    repoVisibility: repoData.visibility,
  };

  return NextResponse.json(response);
}
