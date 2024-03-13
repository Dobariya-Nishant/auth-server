import { sign } from "jsonwebtoken";
import { UserDocument, UserModel } from "../models/users.model";
import bcrypt from "bcrypt";
import { env } from "../../../config/env";

async function hashPassword(password: string) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

function getUser(username: string, email: string) {
  return UserModel.findOne({
    $or: [{ username }, { email }],
  }).lean();
}

function updateSessionOfUser(userId: string, token?: string) {
  if (!token) {
    token = "";
  }
  return UserModel.updateOne(
    {
      _id: userId,
    },
    { $set: { session: token } }
  );
}

function sanitizeUser(user: UserDocument) {
  //@ts-ignore
  delete user.password;
  //@ts-ignore
  delete user.createdAt;
  //@ts-ignore
  delete user.updatedAt;
  //@ts-ignore
  delete user.session;

  return user;
}

function generateUserAccessToken(user: UserDocument) {
  const payload = {
    username: user.username,
    email: user.email,
  };

  const accessToken = sign(payload, env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });

  return accessToken;
}

async function createUser(
  email: string,
  username: string,
  password: string,
  age: number
) {
  password = await hashPassword(password);
  return UserModel.create({
    email,
    username,
    password,
    age,
  });
}

export {
  getUser,
  createUser,
  verifyPassword,
  generateUserAccessToken,
  sanitizeUser,
  updateSessionOfUser,
};
