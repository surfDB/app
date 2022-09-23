// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import { createSpace } from "../../../app/utils/digitalOcean";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST":
      console.log(req.body);
      res
        .status(200)
        .json(
          await createSpace(
            req.body.name,
            req.body.accessKey,
            req.body.accessSecret
          )
        );
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
