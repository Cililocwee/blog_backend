const Comment = require("../models/commentModel");
const async = require("async");
const { body, validationResult } = require("express-validator");

// Display all comments for a blog
// TODO
exports.comment_list = (req, res, next) => {
  Comment.find({ associated_blog: req.params.id }).exec((err, comments) => {
    if (err) {
      return next(err);
    }
    // console.log(req.params);
    // console.log(req.body);
    // Found all the comments
    res.send(comments);
  });
};

// Post a comment
exports.comment_create = [
  // Validate and sanitize
  body("comment_body")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Comment must be longer than 1 letter")
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return;
    }

    //Data sanitized

    const newComment = new Comment({
      username: req.body.username,
      profile_pic_url: req.body.profile_pic_url,
      comment_body: req.body.comment_body,
      date_posted: req.body.date_posted,
      associated_blog: req.body.associated_blog,
    });

    newComment.save();
  },
];

// Delete a comment
// TODO
exports.comment_delete = (req, res, next) => {
  Comment.findById(req.params.id).exec((err, results) => {
    if (err) {
      return next(err);
    }

    // Found comment
    Comment.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        return next(err);
      }
      res.send(`Comment ${req.params.id} deleted`);
    });
  });
};
