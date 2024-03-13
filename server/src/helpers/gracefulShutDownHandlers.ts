/* this function mounts uncaughtException and unhandledRejection 
used for handling Critical error like developers code error and database crash etc*/

function mountCriticalErrorHandlers() {
  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
  });
}

export { mountCriticalErrorHandlers };
