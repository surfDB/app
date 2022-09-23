// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import { surfClient } from "../../../lib/surfClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST":
      console.log(req.body);
      res.status(200).json(
        await surfClient.create(req, res, {
          schema: req.query.schema as string,
          data: req.body,
        })
      );
      break;
    case "PATCH":
      res.status(200).json(
        await surfClient.update(req, res, {
          schema: req.query.schema as string,
          data: req.body,
          id: req.query.id as string,
        })
      );
      break;

    case "GET":
      res.status(200).json(
        (await surfClient.getAll(req, res, {
          schema: req.query.schema as string,
          accessAddress: req.query.accessAddress as string,
        })) as any
      );
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
