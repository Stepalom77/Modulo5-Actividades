const mongoose = require('mongoose');
const Post = require('../models/Post')
  
  const createPost = async (req, res) => {
    let postCreated = null;
    const { text, title, author } = req.body;
    try {

        postCreated = await Post.create({
            text,
            title,
            author
      });
      await postCreated.save();
    } catch (err) {
      console.error(err);
      return res.status(400).json({message: 'There was an error when creating the post'});
    }
    return res.status(201).json(postCreated);
  };

  const getAllPosts = async (req, res) => {
    let postsFound = null;
    try {
        postsFound = await Post.find({});
    } catch (err) {
      console.error(err);
      if (!postsFound) {
        res.status(404).json({message: 'Error, posts not found'});
      } else {
        res.status(400).json({message: 'There was an error'});
      }
    }
    return res.status(200).json(postsFound);
  };

  const getPostById = async (req, res) => {
    let postFound = null;
    const postId = req.params.id;
    try {
        postFound = await Post.findById(postId);
        console.log(postFound)
    } catch (err) {
      console.error(err);
      if (!postFound) {
        res.status(404).json({message: 'Error, post not found'});
      } else {
        res.status(400).json({message: 'There was an error'});
      }
    }
    return res.status(200).json(postFound);
  };
  
  const editPost = async (req, res) => {
    const postId = req.params.id;
    let postSearched = null;
    let postEdited = null;
    try {
      postSearched = await Post.findById(postId);
      postEdited = await Post.findByIdAndUpdate(postId, req.body, {
        new: true,
      });
    } catch (err) {
      console.error(err);
      if (!postSearched) {
        res.status(404).json({message: 'Error, the post you are trying to edit was not founf'});
      } else {
        return res.status(400).json({message: 'There was an error'});
      }
    }
    return res.status(200).json(postEdited);
  };
  
  const deletePost = async (req, res) => {
    //let postDeleted = null;
    let postSearched = null;
    const postId = req.params.id;
    try {
      postSearched = await Post.findById(postId);
      console.log(postSearched)
      await Post.deleteOne({ _id: postId })
    } catch (err) {
      if (!postSearched) {
        res.status(404).json({message: 'Error, the post you are trying to delete was not found'});
      } else {
        return res.status(400).json({message: 'There was an error'});
      }
    }
    return res.status(204).json({
      message: 'The post was successfully deleted',
    });
  };

  module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    editPost,
    deletePost
  }