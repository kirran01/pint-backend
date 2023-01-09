require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const boardRouter = require("./routes/board.routes");
const commentRouter = require("./routes/comment.routes");

const app = express();
const PORT = process.env.PORT;

app.use(
  cors()
)

app.use(express.json());
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/boards", boardRouter);
app.use("/comments", commentRouter);

app.get("/", (req, res) => {
  res.send("pint server up");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then((connectRes) => {
    console.log("//////////////////// PINTREST-CLONE //////////////////////");
    console.log("connected to -->", connectRes.connections[0].name);
    app.listen(PORT, () => {
      console.log("Pint backend up on-->", +PORT);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });
