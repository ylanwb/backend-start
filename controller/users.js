const data = require("../dummyData");
const express = require("express");
const e = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

router.get("/", (request, response) => {
  if (data) {
    response.send().json(data);
  } else {
    response
      .send()
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

router.put("/:id", (request, response) => {
  const { id } = request.params;
  if (!id) {
    response.send().status(400).json({ errorMessage: "Bad Request" });
  }
  const { first_name, email } = request.body;
  const found = data.find((object) => object.id === Number(id));

  if (found) {
    Object.assign(found, { first_name, email });
    response.status(200).json({ found });
  } else if (!found) {
    response
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    response
      .status(404)
      .json({ errorMessage: "The user information could not be modified." });
  }
});

router.post("/", (request, response) => {
  const body = request.body;
  if (!body.email || !body.first_name) {
    response
      .status(400)
      .json({ errorMessage: "Email and First Name required" });
  } else {
    const newUser = { ...body, id: uuidv4() };
    response
      .send(newUser)
      .status(200)
      .statusCode(200)
      .statusMessage("successfully added new user");
  }
});

router.delete("/:id", (request, response) => {
  const { id } = request.params;

  const found = data.find((object) => object.id === Number(id));

  if (!found) {
    response
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (found) {
    const filteredData = data.filter((object) => object.id !== Number(id));
    response.status(200).json({ users: filteredData });
  }
});

module.exports = router;
