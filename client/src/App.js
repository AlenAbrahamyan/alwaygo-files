import React, { Component } from 'react';
import Verify from './components/Verify';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";

  
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';


class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {

    return (


      <Provider store={store}>
        <div>
          <BrowserView><link rel="stylesheet" type="text/css" href='http://localhost:5000/style_api/general.css' /></BrowserView>
          <MobileView><link rel="stylesheet" type="text/css" href='http://localhost:5000/style_api/mobile.css' /></MobileView>
          <Verify />
        </div>
      </Provider>
    )
  }
}

export default App;
