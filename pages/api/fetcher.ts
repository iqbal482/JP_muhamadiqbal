// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { API } from "@configs";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

type Data = {
  data: any;
  error: any
};

/**
 * 描述
 * @date 2022-09-11
 * @param {NextApiRequest} req
 * @param {NextApiResponse<Data>} res
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const session = await getSession({req});
  console.log(session, "session");
  let api = new API(
    session?.accessToken as string,
    process.env.NEXT_PUBLIC_API_URL
  );

  if(req.body && req.body.method === "get") {
    api = api.get(req.body.url);
  }

  if (req.body && req.body.method === "post") {
    api = api.post(req.body.url);
  }

  if (req.body && req.body.method === "put") {
    api = api.put(req.body.url);
  }
  if(req.body && req.body.method === "delete") {
    api = api.delete(req.body.url);
  }
  if(req && req.body){
    api = api.payload(req.body.payload);
  }

  

  const d = await api.fetch()
  const {data, error} = d
  res.status(200).json({ data, error });
}
