const data = require("../postsDummyData.js");
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
            .json({ errorMessage: "The post information could not be retrieved." });
    }
});

router.post("/", (request, response) => {
    const body = request.body;
    if (!body.title || !body.content) {
        response
            .status(400)
            .json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        const newPost = { ...body, id: uuidv4() };
        response
            .send(newPost)
            .status(201)
            .statusCode(201)
            .statusMessage("");
    }
});

router.post("/:id/commentData", (request, response) => {
    const body = request.body;
    const { id } = request.params;
    if (!id) {
        response.send().status(404).json({ errorMessage: "The post with the specified ID does not exist." });
    }
    if (!body.commentText) {
        response
            .status(400)
            .json({ errorMessage: "Please provide text for the comment." });
    } else {
        const newComment = { ...body, id: body.id };
        response
            .send(newComment)
            .status(201)
            .statusCode(201)
            .statusMessage("");
    }
});


module.exports = router;
