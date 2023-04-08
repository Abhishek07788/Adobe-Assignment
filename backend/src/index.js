const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hii this is adobe backend");
});

app.listen(8080, () => {
  console.log("Started at http://localhost:8080");
});
