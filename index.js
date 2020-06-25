const port = process.env.PORT || 3000;
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.get("/api", (req, res) => {
  res.status(200).json({ api: "version 1" });
});

app.listen(port, () => console.log("server started on port", port));
