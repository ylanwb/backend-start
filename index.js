const data = require("./Dummy");
const parser = require("body-parser");
const posts = require("./controller/posts");
const express = require("express");

// const res = require("express/lib/response"); // --> unused!!!
// const { response } = require("express"); // --> unused!!!

const port = 1212;
const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use("/posts", posts);
app.get("/users", (request, response) => {
  response.send("this is users get");
});

app.put("/users", (request, response) => {
  const { id } = request.params;
  const { name, email } = req.body;
  const updateData = data.map((d) => {
    if (d.id === id) {
      return {
        id: id,
        name: body.name,
        email: body.email,
        ...d,
      };
    } else {
      return d;
    }
  });
  response.send(updateData);
});

app.delete("/users/:id", (request, response) => {
  const { id } = request.params;
  const filteredData = data.filter((object) => {
    response.send(filteredData).status;
  });
});

app.post("/users", (request, response) => {
  const body = request.body;
  const updatedData = [...data, body];
  response
    .send(updatedData)
    .status(200)
    .statusMessage("successfully added new user");
});

app.get("/posts", (request, response) => {
  response.send("Hello posts api");
});

app.listen(port, () => {
  // --> you need wrapp console this
  // Server is running at locoalhose:${port};
  console.log(`Server is running at locoalhost:${port}`);
});