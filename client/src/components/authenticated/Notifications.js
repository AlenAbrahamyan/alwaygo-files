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
                console.log(this.state);
            });

    }

  



    render() {

        let index, ank = 1;


        const onClick = (num) => {
            index = num;
            console.log(index);

        };



        const SubmitAccept = this.state.friendship_info ? (async (e, user) => {

            e.preventDefault();

            axios.post('../api/friendship/accept_friend_request', { user: this.props.auth.user.user, friend: user })
                .then(res => { console.log(res.data.msg); let arr = this.state.accepted; arr.push(res.data.msg); this.setState({ accepted: arr }) });


        }) : (null);


        const SubmitReject = this.state.friendship_info ? (async (e, user) => {

            e.preventDefault();

            axios.post('../api/friendship/reject_friend_request', { user: this.props.auth.user.user, friend: user })
                .then(res => { console.log(res.data.msg); let arr = this.state.rejected; arr.push(res.data.msg); this.setState({ rejected: arr }) });


        }) : (null);

        const asa = (event, username) => {
            console.log(username)
        }

        const Form = this.state.friendship_info ? ((user) => {
        



            if (this.state.accepted.indexOf(user.username) > -1) {
                return (
                  
                    <div className="no_pro_block">
                        <img className="no_pro_img" src={user.profile_img} />
                        <div className="no_us_name">
                            <a className="no_pro_name" href={`/profile/${user.username}`}>{user.name} {user.last_name}</a>
                            <p className="no_pro_username">@{user.username}</p>

                            <div className="accepting_form">
                                You have accepted {user.name}'s friend request.
                                    </div>
                        </div>

                    </div>
                )
            } else if (this.state.rejected.indexOf(user.username) > -1) {
                return (
                    <div className="no_pro_block">
                        <img className="no_pro_img" src={user.profile_img} />
                        <div className="no_us_name">
                            <a className="no_pro_name" href={`/profile/${user.username}`}>{user.name} {user.last_name}</a>
                            <p className="no_pro_username">@{user.username}</p>

                            <div className="accepting_form">
                                You have rejected {user.name}'s friend request.
                                    </div>
                        </div>

                    </div>
                )
            } else {
                return (
                    <div className="no_pro_block">
                        <img className="no_pro_img" src={user.profile_img} />
                        <div className="no_us_name">
                            <a className="no_pro_name" href={`/profile/${user.username}`}>{user.name} {user.last_name}</a>
                            <p className="no_pro_username">@{user.username}</p>

                            <div className="accepting_form">

                                <form className="inline" onSubmit={(e) => (SubmitAccept(e, user))}>
                                    <input
                                        type="submit"
                                        className="accepting_btn"
                                        value='Accept'
                                    />
                                </form>
                                <form className="inline" onSubmit={(e) => (SubmitReject(e, user))}>
                                    <input
                                        type="submit"
                                        className="rejecting_btn"
                                        value='Reject'
                                    />
                                </form>
                            </div>
                        </div>

                    </div>
                )
            }


        }) : (null);


        return (
            <Fragment>
                <title>Notifications - alwaygo</title>
                <div className="for_margin">
                    <p className='green_title'>Notifications</p>
                    {this.state.friendship_info ? (this.state.friendship_info.received[0]==undefined?(
                        
                            <div>
                               Notifications page is empty!
                            </div>
                            
                        
                    ):(null)) : (null)}
                    {this.state.friendship_info ? (this.state.friendship_info.received.map(
                        (user) => {
                            return (<div>
                                {Form(user)}
                            </div>
                            )
                        }
                    )) : (<div>Notifications Uploading...</div>)}

                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, null)(Notification);