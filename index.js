const express = require("express");
const methodOverride =    require("method-override");
const mongoose = require("mongoose");
const db = mongoose.connection;
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const routes = require("./controllers/routes.js");

/****
 * Error / Success
 **/
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));
// open the connection to mongo
db.on("open", () => {});

/**
 * Middleware
 */
app.use(cors());

/**
 * Routes
 */
app.get("/api", (req, res) => {
  res.status(200).json({ api: "version 1" });
});

/****
 * New routes
 **/
app.use("/products", routes);

app.use((req, res) =>
  res.status(404).send({ code: "404", message: "no found" })
);

/**
 * Listen server
 */
app.listen(port, () => console.log("server started on port", port));
