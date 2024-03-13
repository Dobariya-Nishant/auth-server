import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { usersRouter } from "./modules/users/routes/users.route";
import { globalErrorHandler } from "./middlewares/errorHandler";
import { jokesRouter } from "./modules/jokes/routes/jokes.route";

const app = express();

/* middlewares */
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

/* routes */
app.use("/api/users", usersRouter);
app.use("/api", jokesRouter);

app.use(globalErrorHandler);

const httpServer = createServer(app);

export { httpServer };
