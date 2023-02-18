const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  username: { type: String, required: true },
  profile_pic_url: { type: String, required: true },
  comment_body: { type: String, required: true, minLength: 1 },
  date_posted: { type: Date, required: true },
  associated_blog: { type: String, required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);
