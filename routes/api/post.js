const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const user = require('./auth'); 


const app = express();
app.use(fileUpload());



const Post = require('../../models/Post');


//Post Text
router.post('/', (req, res) => {

        if(req.body.text==null){req.body.text=''}
        if(req.body.post_img==null){req.body.post_img=''}



        res.json({ post_content: req.body });


        const { name, last_name, username, profile_img, post_img, text } = req.body;

        console.log(req.body)

        const newPost = Post({
            name, 
            last_name, 
            username,
            profile_img, 
            post_img,
            text
        }); 

        newPost.save()
        
    
});



router.get('/get_all_post', (req, res) => {

    Post.find({})
      .then(posts => {res.json(posts.reverse())});
  
  });



module.exports = router;













