const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const user = require('./auth'); 


const app = express();
let number = 18963;
app.use(fileUpload());

let images;
let post_image='';
//let text;

const Post = require('../../models/Post');

// Post Image
router.post('/image', (req, res) => {
    console.log('xsxsxsxsx');
    console.log(req.files)
    if (req.files == null) {
        images = undefined;
        res.json({ post_img: `as` });
    } else {
        number++;
        const file = req.files.image;
        //console.log(req.files);
        images = file;
        file.mv(`${__dirname}/../../images/post_img/${number}${file.md5}${file.name}`, err => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }

            res.json({ post_img: `https://alwaygo-server.herokuapp.com/images/post_img/${number}${file.md5}${file.name}` });
            post_image=`https://alwaygo-server.herokuapp.com/images/post_img/${number}${file.md5}${file.name}`;
        });
    }


});

//Post Text
router.post('/text', (req, res) => {

    if (req.body.text == 'undefined' && images == undefined ) {

            console.log('Post is empty');
            return res.status(400).json({ msg: 'Post is empty' });
        
    } else {

        if(req.body.text == 'undefined'){req.body.text=''}
        texta = req.body;
        
        req.body.name = user.user_info.name;
        req.body.last_name = user.user_info.last_name;
        req.body.username = user.user_info.username;
        req.body.profile_img = user.user_info.profile_img;
        req.body.post_img = post_image;

        console.log(user.user_info);
        

        res.json({ post_content: req.body });

        console.log(images, texta, req.body.textcs);

        const { name, last_name, username, profile_img, post_img, text } = req.body;

        const newPost = Post({
            name, 
            last_name, 
            username,
            profile_img, 
            post_img,
            text
        }); 

        newPost.save()
        
    }
});



router.get('/get_all_post', (req, res) => {

    Post.find({})
      .then(posts => {res.json(posts.reverse())});
  
  });



module.exports = router;






