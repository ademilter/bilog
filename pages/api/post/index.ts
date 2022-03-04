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
    console.log(user);

    if (!user) {
      throw new Error("Unauthorized");
    }

    const { title, content } = req.body;

    if (!title) {
      throw new Error("Title is required");
    }

    // const slug = slugify(`${title}-${nanoid()}`);
    // const slug = `${user.nickname}/${pastPath}`;

    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        slug: slugify(title),
        user: { connect: { email: user.email } },
      },
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export default withApiAuthRequired(createPost);
