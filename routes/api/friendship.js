const express = require('express');
const router = express.Router();
const Friendship = require('../../models/Friendship');
const User = require('../../models/User');
const MessagesStore = require('../../models/MessagesStore');


//Get info about friendship
router.get('/friendship_info/:user', (req, res) => {
    const data = req.params;
    username = data.user;

    Friendship.findOne({ username })
        .then(friendship_info => { res.json(friendship_info) });
});


//Send friend request
router.post('/friend_request', (req, res) => {
    console.log(req.body.friend_form.from, req.body.friend_form.to);
    res.json({ msg: 'sent' });


    Friendship.findOne({ username: req.body.friend_form.from })
        .then(user_from => {
            user_from.sent.unshift(req.body.friend_form.to); console.log(user_from);
            Friendship.updateOne({ username: req.body.friend_form.from }, user_from, function (err) {
                if (err) { console.log(err); return; } else { }
            });
        });

    Friendship.findOne({ username: req.body.friend_form.to })
        .then(user_to => {
            User.findOne({ username: req.body.friend_form.from }).then(user => {
                user_to.received.unshift(user); user_to.status = "false"; console.log(user_to)
                Friendship.updateOne({ username: req.body.friend_form.to }, user_to, function (err) {
                    if (err) { console.log(err); return; } else { }
                });
            })
        });
});

//Accept friend request
router.post('/accept_friend_request', (req, res) => {


Friendship.findOne({ username: req.body.user.username }).then( user => {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    console.log(user.received.indexOf(req.body.friend));
    let a = 0;

    MessagesStore.findOne({username: req.body.user.username}).then(data=>{
        data.messages.push({friend: req.body.friend.username, msg: []});
        MessagesStore.updateOne( {username: req.body.user.username} , data, function(err){
            if(err){
              console.log(err); 
              return;} else {}});

        MessagesStore.findOne({username: req.body.friend.username}).then(data2=>{
            data2.messages.push({friend: req.body.user.username, msg: []});
            MessagesStore.updateOne( {username: req.body.friend.username} , data2, function(err){
                if(err){
                console.log(err); 
                return;} else {}});
            });
    });
 
    user.received.map(
        ank => {
            if(ank.username === req.body.friend.username){
                user.friends.push(user.received[a]);
                user.received.splice(a, 1);


                Friendship.updateOne( {_id:user._id} , user, function(err){
                    if(err){
                      console.log(err); 
                      return;
                    } else {
              
                    }
                  }).then(
                    Friendship.findOne({ username: req.body.friend.username })
                    .then(
                        friend => {
                            let n;
                            friend.sent.map(
                                username =>{
                                    if(username===req.body.user.username){
                                        friend.sent.splice(n, 1);
                                        friend.friends.push(req.body.user);

                                        Friendship.updateOne( {_id:friend._id} , friend, function(err){
                                            if(err){
                                              console.log(err); 
                                              return;
                                            } else {
                                      
                                            }
                                          })
                                    }
                                    n++;
                                }
                            )
                        }
                    )
                  );
                
            }
            a++;
        }
    );
    

})



res.json({ msg : req.body.friend.username })

});


//Reject friend request
router.post('/reject_friend_request', (req, res) => {

    console.log(req.body);

    Friendship.findOne({ username: req.body.friend.username }).then( friend => {

        friend.sent.splice(friend.sent.indexOf(req.body.user.username), 1);
        Friendship.updateOne({ username: req.body.friend.username }, friend, function (err) {
            if (err) { console.log(err); return; } else { }
        });

        Friendship.findOne({ username: req.body.user.username }).then( user => {
            let a = 0;
            user.received.map(
                obj => {
                    if(obj.username === req.body.friend.username){
                        user.received.splice(a,1)
                    }
                    a++;
                }
            )
            Friendship.updateOne({ username: req.body.user.username }, user, function (err) {
                if (err) { console.log(err); return; } else { }
            });
        })

    })

    res.json({msg : req.body.friend.username})
});


router.post('/status_true', (req, res) => {
    console.log(req.body);
    Friendship.findOne({ username: req.body.user }).then(
        user =>{
            user.status = true;
            Friendship.updateOne({ username: req.body.user }, user, function (err) {
                if (err) { console.log(err); return; } else { }
            });
        }
    )
    
    res.json({msg:'true'});
});


module.exports = router; 