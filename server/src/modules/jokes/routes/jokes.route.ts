import { Router } from "express";
import { verifyJWT } from "../../../middlewares/verifyUser";
import { getJokeController } from "../controllers/joke.controller";

const jokesRouter = Router();

jokesRouter.route("/random-joke").get(verifyJWT, getJokeController);

export { jokesRouter };
