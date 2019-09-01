const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const app = express();
app.use(fileUpload());
const User = require('../../models/User');


router.post('/', (req, res) => {


  req.body.user_data.profile_img = req.body.img_url;
    
    //Now update profile image url in Mongdb
    User.update( {_id: req.body.user_data._id} , req.body.user_data, function(err){
      if(err){
        console.log(err); 
        return;
      } else {

      }
    });

});

module.exports = router;
