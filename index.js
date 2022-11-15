const express = require("express");
const users = require("./controller/users.js");

const port = 6666;
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);

app.use("/users", users);

app.listen(port, () => {
  `Server is running at localhost:${port}s`;
});