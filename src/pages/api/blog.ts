import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../sanityClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const posts = await client.fetch(
    `*[_type == "post"]|order(_createdAt desc){
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      body,
      categories[]->{
        _id,
        title
      }
    }`,
  );
  res.status(200).json(posts);
}
