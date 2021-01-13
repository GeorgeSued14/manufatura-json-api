import { createConnection } from "typeorm";

createConnection()
  .then(async (connection) => {
    if (await connection.showMigrations()) {
      connection.runMigrations();
    }
    console.log(
      "Connection Database Products has been established successfully"
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
