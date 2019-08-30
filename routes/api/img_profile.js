const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
var user = require('./auth');
const app = express();
app.use(fileUpload());
const User = require('../../models/User');


router.post('/', (req, res) => {

  console.log(req.body)

   user.user_info.profile_img = req.body.img_url;
    
    //Now update profile image url in Mongdb
    User.update( {_id:user.user_info._id} , user.user_info, function(err){
      if(err){
        console.log(err); 
        return;
      } else {

      }
    });

});

module.exports = router;