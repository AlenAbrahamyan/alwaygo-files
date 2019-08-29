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

        const Form = this.state.friendship_info ? (() => {
    
            this.state.friendship_info.friend.map( friend => {
                return (
                    <div className="no_pro_block">
                        
                        <div className="no_us_name">
                            <a className="no_pro_name" href={`/profile/${friend.username}`}>{friend.name} {friend.last_name}</a>
                            <p className="no_pro_username">@{friend.username}</p>

                        </div>

                    </div>
                )
            })


        }) : (null);


        return (
            <Fragment>
                <title>Messages List - alwaygo</title>
                {Form}
                <div className="for_margin">
                    <p className='green_title5'>My Messages</p>

                    {this.state.friendship_info ? (this.state.friendship_info.friends.map(
                        (friend) => {
                            return (
                                
                                <a href={`/messages/${friend.username}`} className="just_link">
                                    <div className="no_pro_block2">
                                    <div className='no_ank'>
                                        <a className="no_pro_name" >{friend.name} {friend.last_name}</a>
                                        <p className="no_pro_username">@{friend.username}</p>
                                    </div>

                                        <img src='https://scontent.fevn5-1.fna.fbcdn.net/v/t1.15752-9/69180624_677305992751626_1130278196504166400_n.png?_nc_cat=102&_nc_oc=AQl8Lyxy5TIYh8j1Da2LJS6Z4z8OPE01Wb81vx6QAC41Q7fn6-T9WpwqoXMMfRO17-E&_nc_ht=scontent.fevn5-1.fna&oh=4d87948a272a3b0c6f0a8b51b072a86e&oe=5E050550' className='img_bg_msg'/>
                                </div>
                                </a>
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