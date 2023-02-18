const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: { type: String, required: true, maxLength: 100, minLength: 1 },
  content: { type: String, required: true, minLength: 1 },
  date_posted: { type: Date, required: true },
});

module.exports = mongoose.model("Blog", BlogSchema);
