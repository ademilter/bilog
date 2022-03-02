import prisma from "lib/prisma";

// DELETE|PUT  api/post/:id
export default async function (req, res) {
  try {
    const { method } = req;
    const postId = Number(req.query.id);
    const { title = "", content = "", published } = req.body;

    switch (method) {
      case "GET":
        const getPost = await prisma.post.findUnique({
          where: { id: postId },
        });
        if (!getPost) {
          throw new Error("Post not found");
        }
        res.status(200).json(getPost);
        break;
      case "DELETE":
        await prisma.post.delete({
          where: { id: postId },
        });
        res.status(200).json({ message: "Post deleted" });
        break;
      case "PUT":
        if (!title && !content) {
          throw new Error("title, content are required");
        }
        const updatePost = await prisma.post.update({
          where: { id: postId },
          data: { title, content, published },
        });
        if (!updatePost) {
          throw new Error("Post not found");
        }
        res.status(200).json({ message: "Post updated" });
        break;
      default:
        res.setHeader("Allow", ["DELETE", "PUT"]);
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
