import React, { Component } from 'react';
import LogoutToo from './LogoutToo';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class LeftBar extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
      }

    render() {
        const { user } = this.props.auth.user;
        
        return (
            <div className="LeftBar" >
                <a href="/MyProfile" className="bar-links" className="NameInBar">{`${user.name} ${user.last_name}`}</a>
                <p className="bar-username">{`${user.username}`}</p>
                <br/>
                <br/>
               <a href="/MyProfile" className="bar-links">My Profile</a>
               <br/>
               <br/>
               <a href="/messages" className="bar-links">Messages</a>
               <br/>
               <br/>
               <a href="/friends" className="bar-links">Friendship</a>
               <br/>
               <br/>
               <a href="/notifications" className="bar-links">Notifications</a>
               <br/>
               <br/>    
                <LogoutToo />

            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
  });
  
  
  export default connect(mapStateToProps, null)(LeftBar); 