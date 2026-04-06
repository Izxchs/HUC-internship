import { verifyToken } from "./auth";

export function getUserFromReq(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  return verifyToken(token);
}