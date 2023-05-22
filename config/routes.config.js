const express = require('express');
const router = express.Router();
const posts = require('../controllers/postController')

//Post routes
router.get("/posts", posts.getAllPosts);
router.get("/posts/:id", posts.getPostById);
router.post("/posts", posts.createPost);
router.patch("/posts/:id", posts.editPost);
router.delete("/posts/:id", posts.deletePost);

module.exports = router;