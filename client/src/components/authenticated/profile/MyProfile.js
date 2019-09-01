import React, { Component } from 'react';
import AddPost from '../AddPost';
import MyPostBox from '../MyPostBox';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LogoutToo from '../LogoutToo';
import axios from 'axios';
import { storage } from '../../../config/firebaseConfig';


class MyProfile extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  state = {
    img: this.props.auth.user.user.profile_img,
    loading: false
  }

  handleImgUpload = (e) => {
    if (e.target.files[0]) {
      const image = (e.target.files[0]);
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_changed',
        (snapshot) => {
          this.setState({ loading: true })
          //console.log(snapshot);
          snapshot.ref.getDownloadURL().then((downloadUrl) => {
            // console.log(downloadUrl);
            this.setState({ img: downloadUrl })
            this.setState({ loading: false })
            axios.post('api/img_profile', {img_url: downloadUrl, user_data: this.props.auth.user.user}, {
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          })
        }
      )
    }
  }


  render() {
    const { user } = this.props.auth;

    return (
      <div className="MyProfile" >

        <title>{user.user.username} - alwaygo</title>
        <div className="profile_img_block">
          <img src={this.state.img} className="profile_img shadow" />
          <div>
            <br />
            <div className="upload-btn-wrapper2">
              <div className="btn-f2">Change Image</div>
              <input
                onChange={this.handleImgUpload}
                type='file'
                className="input_post_img"
              />
            </div>

            <div>{
              this.state.loading ? (<center><img src='https://dportek.com/img/design/loading.gif' width='60px' /></center>) : (null)
            }</div>
            <br />
            <br />
            <br />
            <a href="/messages" className="bar-links">Messages</a>
            <br />
            <a href="/friends" className="bar-links">Friendship</a>
            <br />
            <a href="/notifications" className="bar-links">Notifications</a>
            <br />
            <LogoutToo />
          </div>
        </div>
        <div className="profile-info">
          <div>
            <p className="full_name_in_profile_page">{user.user.name} {user.user.last_name}</p>
            <p className="username_in_profile_page">{user.user.username}</p>
          </div>

          <AddPost />
          <MyPostBox />

        </div>
        <div></div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps, null)(MyProfile);







