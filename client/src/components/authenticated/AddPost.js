import React, { Fragment, Component } from 'react';
import axios from 'axios';
import { storage } from '../../config/firebaseConfig';

class AddPost extends Component { 

    state = {
        post_img: null,
        text: null,
        loading: false,
        msg: ''
    }


    handleImgUpload = (e) => {
        if (e.target.files[0]) {
          const image = (e.target.files[0]);
          const uploadTask = storage.ref(`images/${image.name}`).put(image);
          uploadTask.on('state_changed',
            (snapshot) => {
              this.setState({ loading: true })
              console.log(snapshot);
              snapshot.ref.getDownloadURL().then((downloadUrl) => {
                console.log(downloadUrl);
                this.setState({ post_img: downloadUrl })
                this.setState({ loading: false })

              })
            }
          )
        }
      }


     onChangeText = e => {
        this.setState({text: e.target.value})
    };


     onSubmit = async e => {
        e.preventDefault();
       
        if(this.state.text==null && this.state.post_img==null){
            this.setState({msg: 'The post is empty!'})
        }else{

            this.setState({msg: ''})

            const res = await axios.post('api/post', {text: this.state.text, post_img: this.state.post_img }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            window.location.reload()
        
    }
    };


    render() {
    return (
        <Fragment>
            <br/>
            <br/>
            <form onSubmit={this.onSubmit}>
                {this.state.msg ? <div><div className="error_msg_post">{this.state.msg}</div><br /></div> : null}

                <textarea className="text_add_post" placeholder="Create Post..." onChange={this.onChangeText}></textarea>

                <div className="upload-btn-wrapper">
                    <div className="btn-f"><p className="plus_size">+</p>Img</div>
                    <input type="file" className="input_post_img" onChange={this.handleImgUpload}/>
                </div>

                <br />
                {
                    this.state.loading?(<center><img src='https://dportek.com/img/design/loading.gif' width='60px' /></center>):(
                        <input className="add_post_btn" type="submit" value="POST" />
                    )
                }

            </form>
            <br/>
            <br/>
            
        </Fragment>
    );
    }
};

export default AddPost;