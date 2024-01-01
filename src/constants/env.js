import { config } from "dotenv";
import {
  EnvError,
  bool,
  cleanEnv,
  email,
  makeValidator,
  num,
  port,
  str,
  url,
} from "envalid";

config();

const isValidURL = (url) => {
  try {
    const urlObject = new URL(url);
    return urlObject.protocol === "https:" || urlObject.protocol === "http:";
  } catch (err) {
    return false;
  }
};

const env = cleanEnv(
  process.env,
  {
    INSTANCE_NAME: str(),
    PORT: port({
      default: 3000,
      devDefault: 3001,
      desc: "Port on which Express server will start",
    }),
    INSTANCES: num({ default: 1, devDefault: 1 }),
  },
  {}
);

export default env;
