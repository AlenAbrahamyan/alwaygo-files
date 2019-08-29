import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import MainPage from './MainPage';
import Profile from './profile/Profile';
import Navbar from './Navbar';
import MyProfile from './profile/MyProfile';
import Notifications from './Notifications';
import FriendsPage from './friendship/FriendsPage';
import Messagest from './Messagest';
import Messages from './messages/Messages';
import MessagesPage from './messages/MessagesPage';
import Redirect from './Redirect';



class GenaralWelcome extends Component {
   

  render() {
    return (
      
      <div>
        <Navbar/>
        <BrowserRouter>
        <Route exact path='/' component={MainPage}/>
        <Route exact path='/MyProfile' component={MyProfile}/>
        <Route exact path='/profile/:post_id' component={Profile}/>
        <Route exact path='/notifications' component={Notifications}/>
        <Route exact path='/friends' component={FriendsPage}/>
        <Route exact path='/messages_test' component={Messagest}/>
        <Route exact path='/messages/:username' component={Messages}/>
        <Route exact path='/messages' component={MessagesPage}/>
        <Route exact path='/registration' component={Redirect}/>
        </BrowserRouter>
      </div>
    )
  }
}

export default GenaralWelcome;