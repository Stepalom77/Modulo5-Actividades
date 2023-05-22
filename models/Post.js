const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  text: {
    type: String,
    required: [true, 'The text is required'],
    minlength: 5
  },
  title: {
    type: String,
    required: [true, 'The title is required'],
    minlength: 5
  },
  author: {
    type: String,
    required: [true, 'The autor is required'],
  }
}, { 
  timestamps: true,
});

const Post = mongoose.model('Post', schema);
module.exports = Post;