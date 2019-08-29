import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return (

        <a className="Logout_btn" onClick={this.props.logout} href='#'>
          <img src = 'https://scontent.fevn5-1.fna.fbcdn.net/v/t1.15752-9/67640100_393445271376600_2177256021993455616_n.png?_nc_cat=107&_nc_oc=AQkq1QSVEl2_9Ehty4Aka4yvdbDcDrDeCHLnD0WVldwYrOgYn40aN_4z8eYxyZknNnI&_nc_ht=scontent.fevn5-1.fna&oh=e8320f29329dc3ad840fba3dce69406a&oe=5DDCA725'/><div className="for_sl_size">Logout</div>
        </a>

    );
  }
}

export default connect(
  null,
  { logout }
)(Logout);
