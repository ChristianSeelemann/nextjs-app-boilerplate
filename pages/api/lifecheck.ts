import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  check: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ check: "API is working!" });
}
