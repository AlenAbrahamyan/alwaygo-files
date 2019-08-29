const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if(!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if(!user) return res.status(400).json({ msg: 'User Does not exist' });

      // Validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
              if(err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  last_name: user.last_name,
                  username: user.username,
                  email: user.email,
                  profile_img : user.profile_img
                }
              });
            }
          )
        })
    })
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
  let user={user: '', posts: '', username:'' };
  
  User.findById(req.user.id)
    .select('-password')
    .then(user_info => {user.username = user_info.username; console.log(user_info.username); 
      Post.find({'username': user_info.username })
    .then(posts => { user.posts = posts});
     User.findById(req.user.id)
    .select('-password')
    .then(user_info => {user.user = user_info; res.json(user), module.exports.user_info = user_info});
    });

});
 



module.exports.router = router;

