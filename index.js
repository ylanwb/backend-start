const parser = require("body-parser");
const posts = require("./controller/posts/posts");
const users = require("./controller/users/users")
const comments = require("./controller/comments/comments")
const express = require("express");
const connect = require("./mongoDb/db");

// const res = require("express/lib/response"); // --> unused!!!
// const { response } = require("express"); // --> unused!!!

const port = 1212;
const app = express();
connect()

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use("/comments", comments);
app.use("/posts", posts);
app.use("/users", users)

app.listen(port, () => {
  // --> you need wrapp console this
  // Server is running at locoalhose:${port};
  console.log(`Server is running at localhost:${port}`);
});