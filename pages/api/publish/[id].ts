import prisma from "lib/prisma";

export default async function (req, res) {
  try {
    const { method } = req;
    const id = Number(req.query.id);

    switch (method) {
      case "PUT":
        const post = await prisma.post.update({
          where: { id },
          data: { published: true },
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
