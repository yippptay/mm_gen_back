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

//use public folder for static assets
app.use(express.static("public"));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}

app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings

app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride("_method")); // allow POST, PUT and DELETE from a form
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());

/****
 * Routes
 **/
// localhost:3000
app.get("/", routes);

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
