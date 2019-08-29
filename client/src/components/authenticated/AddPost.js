import React, { Fragment, useState } from 'react';
import axios from 'axios';
//import PostBox from './PostBox';
let posts = [];
const AddPost = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    let post_text;
    

    const onChangeText = e => {
        post_text = e.target.value;
    };

    const onChangeImage = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const onSubmit = async e => {
        e.preventDefault();
        const formDataImage = new FormData();
        formDataImage.append('image', file);

        const formDataText = new FormData();
        formDataText.append('text', post_text);


        try {
            const res = await axios.post('api/post/image', formDataImage, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );

                    // Clear percentage
                    setTimeout(() => setUploadPercentage(0), 10000);
                }
            });



            const resa = await axios.post('api/post/text', formDataText, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });


            const { post_img } = res.data;
            const { post_content } = resa.data;

            setUploadedFile({ post_img, post_content });
            //console.log(post_content);
            posts.push(uploadedFile.post_content);
            //console.log(posts);

            setMessage(null);

        } catch (err) {
            if (err.response.status === 500) {
                setMessage('There was a problem with the server');
            } else {
                setMessage(err.response.data.msg);
            }
        }
        
        window.location.reload()
    };



    return (
        <Fragment>

            <form onSubmit={onSubmit}>
                {message ? <div><div className="error_msg_post">{message}</div><br /></div> : null}

                <textarea className="text_add_post" placeholder="Create Post..." onChange={onChangeText}></textarea>
 

                <div className="upload-btn-wrapper">
                    <div className="btn-f"><p className="plus_size">+</p>Img</div>
                    <input type="file" className="input_post_img" onChange={onChangeImage} />
                </div>

                <br />
                <input className="add_post_btn" type="submit" value="POST" />


            </form>
            <br/>
            
            {uploadedFile.post_content ? (
                <div className='row mt-5'>
                   {/* {posts.map( (my_post) =>{ <PostBox post_content={my_post}/>})} */}
                   {/* <PostBox post_content={uploadedFile.post_content}/>  */}
                </div>

            ) : null}
        </Fragment>
    );
};

export default AddPost;