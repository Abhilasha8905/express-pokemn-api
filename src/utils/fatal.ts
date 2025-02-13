/**
 * Makes sure that the process doesn't shut down
 * for any uncaught errors – and logs them to
 * for easier debugging.
 */
export const handleUncaughtErrors = (): void => {
  process.on("unhandledRejection", (err: any) => {
    console.error("Unhandled Rejection = ", err);
  });

  process.on("uncaughtException", (err: any) => {
    console.error("Unhandled Exception = ", err);
  });
};
