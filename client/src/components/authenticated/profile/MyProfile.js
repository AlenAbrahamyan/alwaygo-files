import React, { Component } from 'react';
import AddPost from '../AddPost';
import ImgProfile from '../ImgUpload/ImgProfile'
import MyPostBox from '../MyPostBox';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LogoutToo from '../LogoutToo';



class Navbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  }



  render() {
    const { user } = this.props.auth;
     
    return (
      <div className="MyProfile" >

        <title>{user.user.username} - alwaygo</title>
        <div className="profile_img_block">
          <img src={user.user.profile_img} className="profile_img shadow" />
          <div>
            <br />
            <ImgProfile />
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
            <p className="username_in_profile_page">@{user.user.username}</p>
          </div>

          <AddPost />
          <MyPostBox/>

        </div>
        <div></div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps, null)(Navbar);



