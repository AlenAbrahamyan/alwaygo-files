import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import Welcome from './Welcome';
import WelcomeRegistration from './WelcomeRegistration';



class GenaralWelcome extends Component {
   

  render() {
    return (
      
      <div>
        <BrowserRouter>
        <Route  path='/' component={Welcome}/>
        <Route exact path='/registration' component={WelcomeRegistration}/>
        </BrowserRouter>
      </div>
    )
  }
}

export default GenaralWelcome;