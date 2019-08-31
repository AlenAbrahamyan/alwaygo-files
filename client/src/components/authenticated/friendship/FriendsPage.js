import React, { Fragment, Component, useState } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class Notification extends Component {


    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    state = {
        friendship_info: null,
        allUsers: [],
        status: 0,
        accepted: [],
        rejected: []
    }

    componentDidMount() {
        axios.get('../api/friendship/friendship_info/' + this.props.auth.user.user.username)
            .then(res => {
                this.setState({
                    friendship_info: res.data
                });
               
            });

    }

  



    render() {

        let index, ank = 1;


        const onClick = (num) => {
            index = num;
        

        };



        const SubmitAccept = this.state.friendship_info ? (async (e, user) => {

            e.preventDefault();

            axios.post('../api/friendship/accept_friend_request', { user: this.props.auth.user.user, friend: user })
                .then(res => {let arr = this.state.accepted; arr.push(res.data.msg); this.setState({ accepted: arr }) });


        }) : (null);


        const SubmitReject = this.state.friendship_info ? (async (e, user) => {

            e.preventDefault();

            axios.post('../api/friendship/reject_friend_request', { user: this.props.auth.user.user, friend: user })
                .then(res => { console.log(res.data.msg); let arr = this.state.rejected; arr.push(res.data.msg); this.setState({ rejected: arr }) });


        }) : (null);

        const asa = (event, username) => {
            console.log(username)
        }

        const Form = this.state.friendship_info ? (() => {
    
            this.state.friendship_info.friend.map( friend => {
                return (<div>
                   
                    <div className="no_pro_block">
                        
                        <img className="no_pro_img" src={friend.profile_img} />
                        <div className="no_us_name">
                            <a className="no_pro_name" href={`/profile/${friend.username}`}>{friend.name} {friend.last_name}</a>
                            <p className="no_pro_username">@{friend.username}</p>

                        </div>

                    </div>
                    </div>
                )
            })


        }) : (null);


        return (
            <Fragment>
                 <title>Friends - alwaygo</title>
                {Form}
                <div className="for_margin">
                    <p className='green_title'>My Friends</p>

                    {this.state.friendship_info ? (this.state.friendship_info.friends[0]==undefined?(
                        
                        <div>
                           Friends list is empty!
                        </div>
                        
                    
                ):(null)) : (null)}

                    {this.state.friendship_info ? (this.state.friendship_info.friends.map(
                        (friend) => {
                            return (
                                <div className="no_pro_block">
                                    <img className="no_pro_img" src={friend.profile_img} />
                                    <div className="no_us_name">
                                        <a className="no_pro_name" href={`/profile/${friend.username}`}>{friend.name} {friend.last_name}</a>
                                        <p className="no_pro_username">@{friend.username}</p>
            
                                    </div>
            
                                </div>
                            )
                        }
                    )) : (<div>Friends List Uploading...</div>)}

                </div>
                {
                    this.state.friendship_info ? (() => {
    
                        console.log(this.state.friendship_info)
            
            
                    }) : (null)
                }
                {
                    this.state.friendship_info ? (() => {
    
                        this.state.friendship_info.friends.map( friend => {
                            return (
                                <div className="no_pro_block">
                                    <img className="no_pro_img" src={friend.profile_img} />
                                    <div className="no_us_name">
                                        <a className="no_pro_name" href={`/profile/${friend.username}`}>{friend.name} {friend.last_name}</a>
                                        <p className="no_pro_username">@{friend.username}</p>
            
                                    </div>
            
                                </div>
                            )
                        })
            
            
                    }) : (null)
                }
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, null)(Notification);