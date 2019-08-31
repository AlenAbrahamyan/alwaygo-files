import React, { Fragment, Component, useState } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class FriendshipTab extends Component {


    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    state = {
        info: null,
        friendship_info: null,
        ank: true
    }

    componentDidMount() {
        axios.get('/api/profile/' + window.location.pathname.split('/profile/')[1])
            .then(res => {
                this.setState({
                    info: res.data
                });
            });

        axios.get('../api/friendship/friendship_info/' + this.props.auth.user.user.username)
            .then(res => {
                this.setState({
                    friendship_info: res.data
                });
               
            });
    }





    render() {

        let msg;




        const btn_status = () => {
            if (this.state.info && this.state.friendship_info) {

                if(this.state.info.user.username == this.state.friendship_info.username){
                   return( null)
                }

                if (this.state.friendship_info.sent.indexOf(this.state.info.user.username) > -1) {
                    return (
                        <div className='sent_friend_request'>Request Sent</div>
                    ) 
                }else if(7==7){
                    let s = false;
                    let r = false;
                    
                    this.state.friendship_info.friends.map(friend => {
                        
                        if(friend.username === this.state.info.user.username){
                             s = true;
                             
                        }
                    })
                    
                    this.state.friendship_info.received.map(friend => {
                        
                        if(friend.username === this.state.info.user.username){
                             r = true;
                             
                        }
                    })

                    if(s){
                        return(
                            <div className="green_title_2">Friend &#10004;</div>
                        )
                    }else if(r){
                        return(
                            <div> For accept or reject {this.state.info.user.name}'s friend request click <a href="/notifications">here</a>.</div>
                        )
                    }
                    else{
                        return (
                            this.state.ank ? (
    
                                <form onSubmit={onSubmit}>
                                    <input
                                        type='submit'
                                        value="Add Friend"
                                        className="friend_request"
                                    />
                                </form>) : (
                                    <input
                                        type='submit'
                                        value="Request Sent"
                                        className="sent_friend_request"
                                    />
                                ))
                    }
                }
                

            }
            else {
                return (null)
            }
        }


        const friend_form = this.state.info ? (
            {
                from: this.props.auth.user.user.username,
                to: this.state.info.user.username
            }) : (null);


        const onSubmit = this.state.info ? (async e  => {

            e.preventDefault();

            axios.post('../api/friendship/friend_request', { friend_form })
                .then(res => {  msg = res.data.msg; this.setState({ ank: false }) });


        }) : (null);






        return (
            <Fragment>
                

                {/* {msg ? (<div>Friend rewsd</div>) : (null)} */}
                {btn_status()}



            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, null)(FriendshipTab);