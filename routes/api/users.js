const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');
const Friendship = require('../../models/Friendship');
const MessagesStore = require('../../models/MessagesStore');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
    const { name, last_name, username, email, password } = req.body;

    // Simple validation
    if (!name || !last_name || !username || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

 



    //Check for Username
    User.findOne({ username }).then(user => {
        if (user) return res.status(400).json({ msg: 'This username is already registered' });

        // Check for existing user
        User.findOne({ email })
            .then(user => {
                if (user) return res.status(400).json({ msg: 'This email is already registered' });

                const newUser = new User({
                    name,
                    last_name,
                    username,
                    email,
                    password
                });

                const NewFriendship = new Friendship({
                    username
                });
            
                NewFriendship.save();


                const NewMessagesStore = new MessagesStore({
                    username
                });
            
                NewMessagesStore.save();
                


                // Create salt & hash
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                jwt.sign(
                                    { id: user.id },
                                    config.get('jwtSecret'),
                                    { expiresIn: 3600 },
                                    (err, token) => {
                                        if (err) throw err;
                                        res.json({
                                            token,
                                            user: {
                                                id: user.id,
                                                name: user.name,
                                                email: user.email
                                            }
                                        });
                                    }
                                )
                            });
                    })
                })
            })
    })

})


module.exports = router;