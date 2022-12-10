const mongoose = require("mongoose");
const schema = mongoose.Schema({
  title: String,
  content: String,
  image: String,
});

module.exports = mongoose.model("Blog", schema);
