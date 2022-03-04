import prisma from "lib/prisma";

export default async function (req, res) {
  try {
    const { method } = req;
    const { id } = req.query;
    const { title, content } = req.body;

    switch (method) {
      case "PUT":
        if (!title && !content) {
          throw new Error("title, content are required");
        }

        const post = await prisma.post.update({
          where: { id },
          data: { title, content, published: true },
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
