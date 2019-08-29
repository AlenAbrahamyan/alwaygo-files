const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  profile_img: {
    type: String,
    required: true
  },
  post_img: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);