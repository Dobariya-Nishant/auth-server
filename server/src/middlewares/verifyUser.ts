import { verify } from "jsonwebtoken";
import { env } from "../config/env";
import { getUser } from "../modules/users/services/users.service";
import { asyncHandler } from "../helpers/asyncHandler";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req?.cookies?.access_token ||
    req?.headers?.authorization?.split("Bearer ")[1];

  if (!token || token === "undefined") {
    throw new Error("UnauthorizedUser");
  }

  const decoded = verify(token, env.JWT_SECRET_KEY) as {
    [key: string]: any;
  };

  const user = await getUser(decoded?.username, decoded?.email);

  if (!user || user?.session !== token) {
    throw new Error("UnauthorizedUser");
  }

  //@ts-ignore
  req.body["user"] = decoded; // Attach the decoded user object to the request
  return next();
});

export { verifyJWT };
