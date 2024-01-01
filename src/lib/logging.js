import env from "./../constants/env.js";
import fs from "fs";
import winston, { format } from "winston";
import "winston-daily-rotate-file";

const LOG_DIR = process.env.LOG_DIR || "logs";

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.DailyRotateFile({
      format: format.combine(format.timestamp(), format.json()),
      maxFiles: "14d",
      level: "info",
      dirname: LOG_DIR,
      datePattern: "YYYY-MM-DD",
      filename: "%DATE%-info.log",
    }),
    new winston.transports.DailyRotateFile({
      format: format.combine(format.timestamp(), format.json()),
      maxFiles: "14d",
      level: "info",
      dirname: LOG_DIR,
      datePattern: "YYYY-MM-DD",
      filename: "%DATE%-error.log",
    }),
  ],
});

if (!env.isProduction || !env.isProd) {
  logger.add(
    new winston.transports.Console({
      format: format.combine(format.colorize(), format.simple()),
      level: "info",
    })
  );
}

export const logStream = {
  write(message) {
    logger.info(message.toString());
  },
};

export default logger;
