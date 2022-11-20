const mongoose = require("mongoose");

const uri =
  "mongodb+srv://Chingun:chingun0216@cluster0.aet5v7c.mongodb.net/?retryWrites=true&w=majority";

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database is successfully connected.");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
