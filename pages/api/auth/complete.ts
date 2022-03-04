import type { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import prisma from "lib/prisma";

async function complete(req: NextApiRequest, res: NextApiResponse) {
  const { user } = getSession(req, res);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const savedUser = await prisma.user.findUnique({
    where: { email: user.email },
  });
  if (savedUser)
    return res.status(200).json({ message: "User already exists" });

  await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      username: user.nickname,
      picture: user.picture,
      sub: user.sub,
    },
  });

  res.status(200).json({ message: "User created" });
}

export default withApiAuthRequired(complete);
