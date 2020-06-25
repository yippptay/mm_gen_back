const express = require("express");
const app = express();
// require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT;
const WHITELIST = process.env.WHITELIST;
const MONGODB_URI = process.env.MONGODB_URI; //Check that MONGODB_URI is correct for heroku

console.log("Whitelist", WHITELIST);
const corsOptions = {
  origin: process.env.cor,
};
app.use(cors(corsOptions));

////// Globals
const bookmarkdController = require("./controllers/bookmarkd.js");

/////////////////////////////////////////////////////////////////
// Mongo DB Setup
//////////////////////////////////////////////////////////////////
const db = mongoose.connection;
mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
db.on("error", (error) =>
  console.log(error.message + "Dude you messed up check yourself")
);
db.on("connected", () =>
  console.log(
    "you connected, your a MongoDB Wizard, and your connected to ",
    MONGODB_URI
  )
);
db.on("disconnected", () => console.log("by have a wonderful time"));
db.on("open", () => {
  console.log("Connection made!");
});

/////////////////////////////////////////////////////////////////
// Mongo DB Setup
//////////////////////////////////////////////////////////////////
app.use(cors());
app.use(express.json());

////////// middleware
app.use("/bookmarks/", bookmarkdController);

app.listen(PORT, () => {
  console.log("🎉🎊", "celebrations happening on port", PORT, "🎉🎊");
});
