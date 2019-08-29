import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LeftBar from './LeftBar';
import MainBar from './MainBar';





class MainPage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  }


  render() {
    const { user } = this.props.auth.user;
    return (
      <div>
        <title>alwaygo</title>
        <div className="main-container">
          <LeftBar />
       
          <MainBar />

        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps, null)(MainPage); 