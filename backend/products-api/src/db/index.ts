import { createConnection } from "typeorm";

createConnection()
  .then((connection) => {
    console.log("Connection has been established successfully");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
