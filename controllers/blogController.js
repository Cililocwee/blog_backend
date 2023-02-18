const Blog = require("../models/blogModel");
const async = require("async");
const { body, validationResult } = require("express-validator");

// Display all blogposts
exports.blog_list = (req, res, next) => {
  Blog.find()
    // .sort(["date_posted", "ascending"])
    .exec(function (err, list_blogs) {
      if (err) {
        return next(err);
      }

      //Success => Render
      res.send(list_blogs);
    });
};

// Display detailed blogpost (specific blogpost)
exports.specific_blog = (req, res, next) => {
  Blog.findById(req.params.id).exec(function (err, one_blog) {
    if (err) {
      return next(err);
    }

    // Success => Render
    res.send(one_blog);
  });
};

// Blogpost create form POST
exports.blog_create_post = [
  // Validate and sanitize
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Title must be longer than 1 letter."),
  body("content")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Content must be longer than 1 letter."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Do better with this
      console.log(errors);
      return;
    }
    // Data is validated

    // Create blog object
    const newBlog = new Blog({
      title: req.body.title,
      content: req.body.content,
      date_posted: req.body.date_posted,
    });

    newBlog.save();
  },
];

// Handle blogpost delete POST
exports.blog_delete_post = (req, res, next) => {
  Blog.findById(req.params.id).exec((err, results) => {
    if (err) {
      return next(err);
    }

    // Success in finding blog
    Blog.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        return next(err);
      }

      // Delete successful, redirect (try redirect on frontend)
      //**  NOTE: This must send a response or it can't resolve!
      res.send("Delete successful");
    });
  });
};

// Display comments for one blogpost

// Handle blogpost update form GET
exports.blog_update_get = (req, res, next) => {
  Blog.findById(req.params.id).exec((err, result) => {
    if (err) {
      return next(err);
    }
    if (result == null) {
      // Not found
      const err = new Error("Post not found");
      err.status = 404;
      return next(err);
    }

    // Successfully found post
    res.send(result);
  });
};

// Handle blogpost update form POST
exports.blog_update_post = [
  (req, res, next) => {
    //TODO Quick and dirty, redo to be safer (like create)

    // Create the blog object
    const post = new Blog({
      title: req.body.title,
      content: req.body.content,
      date_posted: req.body.date_posted,
      _id: req.params.id,
    });

    // todo do something with errors (some way to display)

    Blog.findByIdAndUpdate(req.params.id, post, {}, (err, theblog) => {
      if (err) {
        return next(err);
      }
      res.send("Update successful");
    });
  },
];
