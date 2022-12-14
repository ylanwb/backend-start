const parser = require("body-parser");
const posts = require("./router/posts");
const users = require("./router/users");
const register = require("./router/register");
const login = require("./router/login");
const comments = require("./router/comments");
const express = require("express");
const connect = require("./db/db");
const cors = require("cors");
const dotenv = require("dotenv");
const { tokenGenerate, checkToken } = require("./authentication/jwt");
dotenv.config();

const port = 1212;
const app = express();
connect();
app.use(
  cors({
    origin: "*",
  })
);

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(register);
app.use(login);
app.use("/comments", comments);
app.use("/posts", posts);
app.use("/users", users);

app.get("/", (req, res) => {
  res.status(200).json({ message: "server is running" });
});

app.listen(port, () => {
  console.log(`Server is running at localhost:${port}`);
});
