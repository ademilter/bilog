import type { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import prisma from "lib/prisma";
import generateSlug from "lib/generateSlug";
import generatePostId from "../../../lib/generatePostId";

// POST /api/post

async function createPost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { user } = getSession(req, res);

    if (!user) {
      throw new Error("Unauthorized");
    }

    const { title, content } = req.body;

    if (!title && !content) {
      throw new Error("Title or content is required");
    }

    const text = title ? title.substring(0, 128) : content.substring(0, 128);
    const id = generatePostId();
    const slug = generateSlug(id, user.nickname, text);

    const post = await prisma.post.create({
      data: {
        id,
        title: title,
        content: content,
        slug,
        user: { connect: { email: user.email } },
      },
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export default withApiAuthRequired(createPost);
