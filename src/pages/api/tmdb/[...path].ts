import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path } = req.query;
  const apiPath = Array.isArray(path) ? path.join("/") : path;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${apiPath}${
        req.url?.includes("?") ? req.url.substring(req.url.indexOf("?")) : ""
      }`,
      {
        method: req.method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.status_message || "Failed to fetch data");
    }
    res.status(response.status).json(data);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch data";
    res.status(500).json({ error: errorMessage });
  }
}
