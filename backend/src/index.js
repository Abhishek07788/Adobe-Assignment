const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post.routes");
const dbConnection = require("./config/db");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Hii this is adobe backend");
});

app.listen(8080, async () => {
  await dbConnection();
  console.log("Started at http://localhost:8080");
});
