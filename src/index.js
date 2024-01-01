import env from "./constants/env.js";
import createServer from "./utils/server.js";
import cluster from "node:cluster";
import os from "node:os";
import logger from "./lib/logging.js";

const PORT = env.PORT;

async function main() {
  if (env.isDev) {
    const { app } = await createServer();
    app.listen(PORT, async () => {
      logger.info(`🚀 Server ready at http://localhost:${PORT}`);
    });

    process.on("uncaughtException", async (e) => {
      logger.error(e);
      setTimeout(() => {
        process.exit(1);
      }, 600);
    });
  } else {
    if (cluster.isPrimary) {
      let totalNumberOfInstances = env.INSTANCES;
      const totalCPUs = os.cpus().length;

      if (totalNumberOfInstances > totalCPUs) {
        logger.warn(`Number of instances is greater than number of CPUs. Setting instances to ${totalCPUs}`);
        totalNumberOfInstances = totalCPUs;
      }

      logger.info(`Number of instances: ${totalNumberOfInstances}`);

      for (let cpu = 0; cpu < totalNumberOfInstances; cpu++) {
        cluster.fork();
      }

      cluster.on("online", (worker) => {
        logger.info(`Worker ${worker.process.pid} is online`);
      });

      cluster.on("exit", (worker, code, signal) => {
        logger.info("Starting a new worker");
        cluster.fork();
      });
    } else {
      const { app } = await createServer();
      const server = app.listen(PORT, "127.0.0.1", async () => {
        logger.info(`🚀 Server ready at http://localhost:${PORT}`);
      });

      process.on("uncaughtException", (error) => {
        cluster.fork();
        server.close(() => process.exit(1));
      });
    }
  }
}

main();
