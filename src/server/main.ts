import express from "express";
import path from "path";
import mongoose from "mongoose";

import { apiRouter } from "./routes/api-router";
import { pagesRouter } from "./routes/pages-router";
import { staticsRouter } from "./routes/statics-router";

import * as config from "./config";

import databaseHandler from "./db";
import filesHandler from "./filesHandler";

const app = express();
const fHandler = new filesHandler(databaseHandler);

app.set("view engine", "ejs");
app.use("/assets", express.static(path.join(process.cwd(), "assets")));
app.use(apiRouter());
app.use(staticsRouter());
app.use(pagesRouter());

databaseHandler.connect();

mongoose.connection.once("open", function () {
  console.log("Connected to database");
  databaseHandler.getUsers(fHandler.loadAllMusic);
  databaseHandler.getAllData();
});

app.listen(config.SERVER_PORT, () => {
  console.log(`App listening on port ${config.SERVER_PORT}!`);
});