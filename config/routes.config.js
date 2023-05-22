const express = require('express');
const router = express.Router();
const posts = require('../controllers/postController')
const users = require('../controllers/userController');
const authMiddleware = require('../middlewares/authorizationMiddleware');

//Post routes
router.get("/posts", authMiddleware, posts.getAllPosts);
router.get("/posts/:id", authMiddleware, posts.getPostById);
router.post("/posts", authMiddleware, posts.createPost);
router.patch("/posts/:id", authMiddleware, posts.editPost);
router.delete("/posts/:id", authMiddleware, posts.deletePost);

//User
router.post("/users", users.signup);
router.post("/users/login", users.login);
module.exports = router;