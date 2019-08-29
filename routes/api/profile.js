const express = require('express');
const router = express.Router();


// User Model
const User = require('../../models/User');
// Post Model
const Post = require('../../models/Post');

info={user: '', posts: 'posts'}

router.get('/:user', (req, res) => {
  const data = req.params;
  username= data.user;

  Post.find({'username': username })
    .then(posts => { info.posts = posts.reverse()});

  User.findOne({ username })
    .then(user => { info.user=user; res.json(info)}); 
});




module.exports = router;