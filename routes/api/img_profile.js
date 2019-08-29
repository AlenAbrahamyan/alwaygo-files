const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
var user = require('./auth');
const path = require('path');

const app = express();
let tiv = 10500;
app.use(fileUpload());
const User = require('../../models/User');


// Upload Endpoint
router.post('/', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
tiv++;
  const file = req.files.file;

  file.mv(`${path.resolve(__dirname)}/../../images/profile_img/${tiv}${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
console.log(tiv, file.name);
console.log(user.user_info);
    user.user_info.profile_img =`https://alwaygo.herokuapp.com/images/profile_img/${tiv}${file.name}`;
    
    //Now update profile image url in Mongdb
    User.update( {_id:user.user_info._id} , user.user_info, function(err){
      if(err){
        console.log(err); 
        return;
      } else {

      }
    });

  });
});

module.exports = router;