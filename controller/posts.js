const data = require("../postsDummyData.js");

const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

router.get("/", (request, response) => {
  if (data) {
    console.log(data)
    response.send().json(data);
  } else {
    response
      .send()
      .status(500)
      .json({ errorMessage: "The post information could not be retrieved." });
  }
});
router.get("/:id", (request, response) => {
  const { id } = request.params;
  if (data) {
    response.send().json(data);
  } else if (!id) {
    response
      .send()
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  } else {
    response
      .send()
      .status(500)
      .json({ message: "The post information could not be retrieved." });
  }
});
router.get("/:id/commentData", (request, response) => {
  const { id } = request.params;
  if (data.commentData) {
    response.send().json(data.commentData);
  } else if (!id) {
    response
      .send()
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  } else {
    response
      .send()
      .status(500)
      .json({ message: "The post information could not be retrieved." });
  }
});
router.delete("/postData/:id", (request, response) => {
  const { id } = request.params;
  if (data.postData) {
    response.send().json(data.postData);
  } else if (!id) {
    response
      .send()
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  } else {
    response
      .send()
      .status(500)
      .json({ errorMessage: "The post could not be removed." });
  }
});

router.post("/postData", (request, response) => {
  const body = request.body;
  if (!body.title || !body.content) {
    response.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else {
    const newPost = { ...body, id: uuidv4() };
    response.send(newPost).status(201).statusCode(201).statusMessage("");
  }
});

router.post("/:id/commentData", (request, response) => {
  const body = request.body;
  const { id } = request.params;
  if (!id) {
    response
      .send()
      .status(404)
      .json({ errorMessage: "The post with the specified ID does not exist." });
  }
  if (!body.commentText || !body.commentId || !body.postId || !body.userId) {
    response
      .status(400)
      .json({ errorMessage: "Comment text, comment ID, post ID, user ID required." });
  } else {
    const newComment = { ...body };
    response.send(newComment).status(201).statusCode(201).statusMessage("");
  }
});

router.put("/data/:id", (request, response) => {
  const { id } = request.params;
  if (!id) {
    response
      .send()
      .status(404)
      .json({ errorMessage: "The post with the specified ID does not exist" });
  }
  const body = request.body;
  const found = data.postData.find((object) => object.id);

  if (found) {
    Object.assign(found, body);
    response.status(200).json({ found });
  } else if (!body.title || !body.content) {
    response
      .status(404)
      .json({ errorMessage: "Please provide title and content for the post." });
  } else {
    response
      .status(404)
      .json({ errorMessage: "The user information could not be modified." });
  }
});

router.put("/:id/commentData", (request, response) => {
  const { id } = request.params;
  if (!id) {
    response
      .send()
      .status(400)
      .json({ errorMessage: "The post with the specified ID does not exist" });
  }
  const body = request.body;
  const found = data.commentData.find((object) => object.commentId);

  if (found) {
    Object.assign(found, body);
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

module.exports = router;
