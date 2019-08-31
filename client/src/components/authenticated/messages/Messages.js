import React, { Fragment, Component } from 'react';
import axios from 'axios'
import openSocket from 'socket.io-client';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ContainerMsg from 'react-scroll-to-bottom';
import MapCat from './MapChat';
const socket = openSocket('https://alwaygo-server.herokuapp.com');


//socket.on('get_messages', msg_arr => {ank_arr = msg_arr; console.log(msg_arr)});





class Notification extends Component {


    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    state = {
        window_height : window.innerHeight,
        UserFriend: {} ,
        msg: '',
        msg_arr:{friend:'', msg:[]},
        send_info_status: true,
        help_msg: {},
        textarea : '',
        zona_status: true
    }

 


    componentDidMount() {

        
        const username_f = this.props.match.params.username;
        console.log(username_f);
        axios.get('/api/profile/' + username_f)
        .then(res => {
          this.setState({
            UserFriend: res.data.user
          });
          console.log(this.state.UserFriend);
        });

        axios.get('../api/friendship/friendship_info/' + this.props.auth.user.user.username)
            .then(res => {
                this.setState({
                    friendship_info: res.data
                });
                console.log(this.state);
            });

            socket.on('get_messages', msg_arr => {console.log(msg_arr);  
                let ln = this.props.match.params.username+this.props.auth.user.user.username;
                let ln2= this.props.auth.user.user.username+this.props.match.params.username;
                let gn = msg_arr.friend + msg_arr.user;
                if( ln==gn  ){
                   
                    this.setState({ msg_arr:  msg_arr})
                    console.log(this.props.match.params.username + this.props.auth.user.user.username)
                    console.log(msg_arr.friend + msg_arr.user)
                  }
                  
                  
            });

          

    }



    
     
    onChange = e => {
        this.setState({ msg: e.target.value });
        this.setState({textarea: e.target.value});
      };



    render() {

        let index, ank = 1;

        const divStyle = {
            height: (this.state.window_height-60) + 'px',
        };

        const msgStyle = {
            height: (this.state.window_height-166) + 'px',
        };

      
       if(this.state.send_info_status && this.state.UserFriend.username){
        socket.emit('info', {
            user: this.props.auth.user.user,
            friend_user: this.state.UserFriend
         })
        this.setState({ send_info_status: false})
       }


    
    

        const send_msg = (e) => {
            socket.emit('send_msg', {
                message: this.state.msg
            });

            this.setState({textarea: ''});
            
            e.preventDefault();
        } 


        const change_zona_status = (e) => {
            
            if(this.state.zona_status){
                this.setState({zona_status: false})
            }else{
                this.setState({zona_status: true})
            }
        }







        return (
            <Fragment>
                <div className="for_margin">
                    <title>Messages</title>

                    {this.state.friendship_info ? (
                    
                    <div className='msg_g' >
                              <div className='friendsBar' style={divStyle}>
                              {this.state.friendship_info.friends.map(
                        (friend) => {
                            return (
                                <a className="just_link" href={`/messages/${friend.username}`}>
                                <div className='go_f_msg'>
                                   <br/>
                                   <div className='name_15'>
                                <a className="no_pro_name">{friend.name} {friend.last_name}</a>
                                        <p className="no_pro_username">@{friend.username}</p>
                                        </div>
                                        
                                </div>
                                </a>
                            )})}
                                  </div>
                              <div className='mainContentMsg' style={divStyle}>
                                  <div className='infoBarMsg'>
                                      <div className="img_div_msg">
                                      <img  src={this.state.UserFriend.profile_img} width='50px'/>
                                      </div>
                                      <div className="name_div_msg">
                                        <a className="no_pro_name2" href={`/profile/${this.state.UserFriend.username}`}>{this.state.UserFriend.name} {this.state.UserFriend.last_name}</a>
                                        <p className="no_pro_username">@{this.state.UserFriend.username}</p>
                                        </div>
                                        {this.state.zona_status ? (
                                        <a onClick={change_zona_status} className="ChangeZona"><img src='https://scontent.fevn5-1.fna.fbcdn.net/v/t1.15752-9/69803884_352473528989671_7223696338272124928_n.png?_nc_cat=111&_nc_oc=AQnpKOK0Z8EPYvbTEs8JkhzcVxoF36b95pDtjILH-Y6qqFlN5YBtD7BOmb4HGlZNNgk&_nc_ht=scontent.fevn5-1.fna&oh=f74e07a5a5c038f13b984be6f65a98ef&oe=5DD7B17E'/> <div className="no_pro_name3">Geolocations</div></a>
                                        ):(
                                        <a onClick={change_zona_status} className="ChangeZona"><img src='https://scontent.fevn5-1.fna.fbcdn.net/v/t1.15752-9/69301796_439574276766778_3711578774333030400_n.png?_nc_cat=105&_nc_oc=AQkqrEdinoKpFgaoYqzcSjByIrkfn_7y5kVQMSVRmRAv2Q_uoWl3JZKaJnkGuOhK2k8&_nc_ht=scontent.fevn5-1.fna&oh=109e0ada1f82fc8f60043213783e8079&oe=5DD83431'/> <div className="no_pro_name3">Messaging</div></a>
                                        )} 
                                  </div>
                                  
                                      {this.state.zona_status ? (
                                      <div className='MsgChatZona'>
                                  <ContainerMsg className='messages_content' style={msgStyle}>
                                  
                                    {this.state.UserFriend.username==this.state.msg_arr.friend?(
                                        
                                      this.state.msg_arr.msg.map( msg_obj => {
                                          if(msg_obj.name==this.props.auth.user.user.username){
                                            
                                            return(<div><div className='my_msg'>{msg_obj.msg}</div><br/><br/></div>)
                                          }else{
                                            
                                            return(<div><div className='other_msg'>{msg_obj.msg}</div><br/><br/></div>)
                                          }
                                      })

                                    ):( null)}

                                  </ContainerMsg>
                                  <div className='form_send_msg'>
                                  <form onSubmit={e => {send_msg(e)}}>
                                  <textarea value={this.state.textarea} onChange={this.onChange} className="textarenaMsg"></textarea>

                                        <input
                                        type="submit"
                                        className="msgBtn"
                                        value='SEND'
                                        
                                    />
                                  </form>
                                  </div>
                                  </div>):(<div className='MapChatZona'>
                                  
                                      <MapCat />
                                     
                                  </div>)}
                                  </div>
                              </div>
                            
                            ) : (<div>Data Uploading...</div>)}

                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, null)(Notification);
