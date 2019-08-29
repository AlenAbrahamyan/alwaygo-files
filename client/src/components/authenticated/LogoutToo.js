import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';

export class LogoutToo extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return (

        <a className="bar-links" onClick={this.props.logout} href='#'>
          Logout
        </a>

    );
  }
}

export default connect(
  null,
  { logout }
)(LogoutToo);
