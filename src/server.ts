import app from "./app";
import { createConnection } from "typeorm";
import OrmConfig from "./ormconfig";


/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
  createConnection(OrmConfig).then(async () => {
    console.log(
      "  App is running at http://localhost:%d in %s mode",
      app.get("port"),
      app.get("env")
    );
  }).catch((error) => {
    console.log(error)
  });
  console.log("  Press CTRL-C to stop\n");
});

export default server;