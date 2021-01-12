import { createConnection } from "typeorm";

createConnection()
  .then((connection) => {
    console.log(
      "Connection Database Products has been established successfully"
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
