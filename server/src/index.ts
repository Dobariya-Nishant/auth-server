import { httpServer } from "./app";
import { env } from "./config/env";
import { connectDB } from "./db/connectDB";
import { mountCriticalErrorHandlers } from "./helpers/gracefulShutDownHandlers";

mountCriticalErrorHandlers();

const db = connectDB();
/* connect db first then start server to listen for request */
db.then(() => {
  httpServer.listen(env.PORT, () => {
    console.log("Server is started at port", env.PORT);
  });
});
