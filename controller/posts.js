// const { Router, response } = require("express"); // --> unused!!!
const data = require("../postsDummyData");
// const express = express.Router; // --> why doubled??
console.log(data)

// Firstly you need export expressjs
const express = require("express");
// and use its methods express.Router();
const router = express.Router();

// const e = required("express"); // --> unused!!!
const { v4: uuidv4 } = require("uuid"); // --> you need install uuid

router.get("/", (request, response) => {
  if (data) {
    response.send("this is posts get").json(data);
  } else {
    response
      .send()
      .status(500)
      .json({ errorMessage: "The posts information could not be retrieved." });
  }
});

// on put you are handling only errors where handle on success???
router.put("/:id", (request, response) => {
  const { id } = request.params;
  if (!id) {
    response.send().status(400).json({ errorMessage: "Bad Request" });
  }
  // const { title, content } = request.body; // --> unused
  const found = data.find((object) => object.id === id);
  // }); // --> you are closed function here!! its wrong you need close it fater all logic
  if (!found) {
    response
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  } else {
    response
      .status(404)
      .json({ errorMessage: "The post's information could not be modified" });
  }
}); // --> Here yuo need close!!

router.post("/", (request, response) => {
  const body = request.body;
  if (!body.content || !body.title) {
    response.status(400).json({ errorMessage: "Title and content required " });
  } else {
    const newUser = { ...body, id: uuidv4() };
    response.send(newUser).status(200).statusCode(200);
    message("successfully added new post");
  }
});
router.delete("/:id", (request, response) => {
  const { id } = request.params;
  // }); // -- > why close function before write logic side?
  const found = data.find((object) => object.id === id);
  if (!found) {
    response
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  } else if (found) {
    const filteredData = data.filter((object) => object.id !== id);
    response.status(200).json({ users: filteredData });
  }
}); // you need close function here!!

module.exports = router;