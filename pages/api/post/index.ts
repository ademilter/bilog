import { getSession } from "next-auth/react";
import prisma from "lib/prisma";

// POST /api/post

export default async function (req, res) {
  try {
    const session = await getSession({ req });

    if (!session) {
      throw new Error("Not authenticated");
    }

    const { title, content } = req.body;

    if (!title && !content) {
      throw new Error("Title and content are required");
    }

    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { email: session?.user?.email } },
      },
    });

    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
