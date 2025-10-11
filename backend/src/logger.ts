import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";

// Get log level from environment variable, with defaults based on NODE_ENV
const logLevel = process.env.LOG_LEVEL || (isProduction ? "info" : "debug");

// Configure Pino with environment-based settings
const logger = pino({
  level: logLevel,
  // Use pino-pretty transport in development for readable output
  transport: !isProduction
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      }
    : undefined,
  // In production, output structured JSON logs
  base: {
    env: process.env.NODE_ENV,
  },
});

export default logger;
