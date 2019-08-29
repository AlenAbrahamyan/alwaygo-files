import React, { Component } from 'react';
import PostBox from './PostBox';

import axios from 'axios'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MyPostBox extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  state = {
    info: null
  }

  componentDidMount() {
    axios.get('/api/profile/'+this.props.auth.user.user.username)
      .then(res => {
        this.setState({
          info: res.data
        });
 
      });
  }

  render() {
    const profile = this.state.info ? (

      this.state.info.posts ? (

        <div className="MyPostBox" >
  
          <PostBox posts={this.state.info.posts} profile_img={this.state.info.user.profile_img} />
  
        </div>
      ) : (
          <div className="center"></div>
        )
    ) : (
        <div className="center">Posts Uploading...</div>
      );

    return (
      <div>
        {profile}
      </div>
    )
  }
}




const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps, null)(MyPostBox);


