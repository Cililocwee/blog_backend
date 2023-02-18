const express = require("express");
const router = express.Router();
const Blog = require("../models/blogModel");
const blog_controller = require("../controllers/blogController");
router.get("/", (req, res) => res.render("You shouldn't be here, Dave."));

router.post("/create", blog_controller.blog_create_post);

router.get("/blogs", blog_controller.blog_list);

router.get("/blog/details/:id", blog_controller.specific_blog);

router.delete("/blog/delete/:id", blog_controller.blog_delete_post);

router.put("/update/:id", blog_controller.blog_update_post);

module.exports = router;
