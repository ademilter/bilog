import type { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import prisma from "lib/prisma";
import slugify from "@sindresorhus/slugify";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdefghijklmnoprstuvyzqw", 10);

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

    const text = title ? title.substring(0, 8) : content.substring(0, 8);

    const id = nanoid();
    const postSlug = slugify(`${text}-${id}`);
    const slug = `/${user.nickname}/${postSlug}`;

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
