const data = require("./dummyData");
const parser = require("body-parser");
const posts = require("./controller/posts");
const users = require("./controller/users")
const express = require("express");

// const res = require("express/lib/response"); // --> unused!!!
// const { response } = require("express"); // --> unused!!!

const port = 1212;
const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use("/posts", posts);
app.use("/users", users)

app.listen(port, () => {
  // --> you need wrapp console this
  // Server is running at locoalhose:${port};
  console.log(`Server is running at locoalhost:${port}`);
});