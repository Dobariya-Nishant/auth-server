import { error } from "../../../config/errors";
import { asyncHandler } from "../../../helpers/asyncHandler";
import { cookieOptions } from "../constants/const";
import {
  createUser,
  generateUserAccessToken,
  getUser,
  sanitizeUser,
  updateSessionOfUser,
  verifyPassword,
} from "../services/users.service";

const signupController = asyncHandler(async (req, res) => {
  const { username, email, password, age } = req.body;

  const user = await getUser(username, email);

  if (user) {
    throw new Error(error.USER_ALREADY_EXIST);
  }

  await createUser(email, username, password, age);

  return res
    .status(200)
    .send({ message: "User Created SuccessFully Please Login" });
});

const loginController = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const user = await getUser(username, email);

  if (!user) {
    throw new Error(error.INVALID_CREDENSTIALS);
  }

  const isPasswordValid = await verifyPassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error(error.INVALID_CREDENSTIALS);
  }

  const token = generateUserAccessToken(user);
  await updateSessionOfUser(user._id, token);

  return res.status(200).cookie("access_token", token, cookieOptions).send({
    message: "User LoggedIn SuccessFully",
    access_token: token,
  });
});

const logoutController = asyncHandler(async (req, res) => {
  const { user } = req.body;

  const userfromdb = await getUser(user.username, user.email);

  if (!userfromdb) {
    throw new Error(error.UNAUTHORIZED_USER);
  }

  await updateSessionOfUser(userfromdb._id);

  return res
    .status(200)
    .clearCookie("access_token", cookieOptions)
    .send({ message: "User LogOut SuccessFully!" });
});

const profileController = asyncHandler(async (req, res) => {
  const { user } = req.body;

  const userfromdb = await getUser(user.username, user.email);

  if (!userfromdb) {
    throw new Error(error.UNAUTHORIZED_USER);
  }

  const sanitizedUser = sanitizeUser(userfromdb);

  return res.status(200).send(sanitizedUser);
});

export {
  signupController,
  loginController,
  profileController,
  logoutController,
};
