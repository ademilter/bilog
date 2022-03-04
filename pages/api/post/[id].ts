import prisma from "lib/prisma";

// DELETE|PUT  api/post/:id
export default async function (req, res) {
  try {
    const { method } = req;
    const { id } = req.query;
    const { title = "", content = "" } = req.body;

    switch (method) {
      case "GET":
        const getPost = await prisma.post.findUnique({
          where: { id },
        });

        if (!getPost) {
          throw new Error("Post not found");
        }

        res.status(200).json(getPost);
        break;

      case "PUT":
        if (!title && !content) {
          throw new Error("title, content are required");
        }

        const updatePost = await prisma.post.update({
          where: { id },
          data: { title, content },
        });

        if (!updatePost) {
          throw new Error("Post not found");
        }

        res.status(200).json({ message: "Post updated" });
        break;

      case "DELETE":
        await prisma.post.delete({
          where: { id },
        });

        res.status(200).json({ message: "Post deleted" });
        break;

      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
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
