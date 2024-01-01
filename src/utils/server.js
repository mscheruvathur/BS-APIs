import express from "express";
import cors from "cors";
import * as ua from "express-useragent";
import helmet from "helmet";
import userRouter from "../api/routes/user/user.js";
import { throwErrorResponse } from "./response.js";

export default async function createServer() {
  const app = express();

  app.use(cors());
  app.set("trust proxy", true);
  app.use(ua.express());
  app.use(helmet({ expectCt: true }));
  app.use(express.json({ limit: "1024kb" }));
  app.use(express.urlencoded({ extended: true, limit: "1024kb" }));

  const versionPrefix = "/api";

  app.use(`${versionPrefix}/auth`, userRouter);

  app.use((err, req, res, next) => {
    const response = throwErrorResponse(res, err);
    if (!response) next();
    else return response;
  });

  return { app };
}
