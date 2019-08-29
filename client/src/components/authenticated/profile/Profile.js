import React, { Component } from 'react'
import axios from 'axios'
import PostBox from '../PostBox';
import FriendshipTab from '../friendship/FriendshipTab';

class Profile extends Component { 
  state = {
    info: null
  }
  componentDidMount(){
    let id = this.props.match.params.post_id;
    axios.get('/api/profile/' + id)
      .then(res => {
        this.setState({
          info: res.data
        });

      });
      
  }


  render() {
    const profile = this.state.info ? (
      
      this.state.info.user ? (
      
        <div className="profile">
         
          <title>{this.state.info.user.username} - alwaygo</title>
         <div className="profile_img_block">
            <img src={ this.state.info.user.profile_img} className="profile_img"/>
           
          </div>
          <div className="profile-info">
            <div>
          <p className="full_name_in_profile_page">{this.state.info.user.name} {this.state.info.user.last_name}</p>
          <p className="username_in_profile_page">@{this.state.info.user.username}</p>
          </div>
          <div className="btn_area">
          <FriendshipTab/>
          </div>
          <div className="profile_posts">
            {
              this.state.info ? (

                this.state.info.posts ? (
          
                  <div className="MyPostBox" >
            
                    <PostBox posts={this.state.info.posts} profile_img={this.state.info.user.profile_img} />
            
                  </div>
                ) : (
                    <div className="center"></div>
                  )
              ) : (
                  <div className="center"></div>
                )
            }
          
          </div>
          </div>
          <div></div>
          
        </div>
      ) : (
        <div className="RedText">{window.location.pathname.split('/')[2]} is not found!</div>
      )
      ) : (
        <div className="center">Profile Uploading...</div>
      );
    return (
        <div className="profile-container">
        {profile}
        
      </div>
    )
  }
}

export default Profile

