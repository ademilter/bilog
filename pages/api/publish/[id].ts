import prisma from "lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

async function publish(req: NextApiRequest, res: NextApiResponse) {
  const { user } = getSession(req, res);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const { method } = req;
  const { id } = req.query;
  const { title, content } = req.body;

  const post = await prisma.post.findUnique({
    where: { id: id as string },
    include: { user: true },
  });

  // Check if post exists
  if (!post) return res.status(404).json({ message: "Post not found" });

  // Check if the user is the author of the post
  if (post.user.username !== user.nickname)
    return res.status(403).json({ message: "Unauthorized" });

  try {
    switch (method) {
      case "PUT":
        if (!title && !content) {
          throw new Error("title, content are required");
        }

        const post = await prisma.post.update({
          where: { id: id as string },
          data: { title, content, published: true, publishedAt: new Date() },
        });

        if (!post) {
          throw new Error("Post not found");
        }

        res.status(200).json({ message: "Post published" });
        break;
      default:
        res.setHeader("Allow", ["PUT"]);
        res.status(405).json({
          message: `Method ${method} Not Allowed`,
        });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export default withApiAuthRequired(publish);
