import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GeneralWelcome from './welcome/GeneralWelcome';
import GeneralAuthentcated from './authenticated/GeneralAuthentcated';


import { Provider } from 'react-redux';
import store from '../store';
import { loadUser } from '../actions/authActions';



class Verify extends Component {

    componentDidMount() {
        store.dispatch(loadUser());
      }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }


    render() {

        const { isAuthenticated, user } = this.props.auth;


        return (
            <Provider store={store}>
            <div>
                {
                    isAuthenticated == null ? (<div>Loading...</div>) : (
                        isAuthenticated ?  (<div><GeneralAuthentcated />{console.log(isAuthenticated)}</div>)  : (<div><GeneralWelcome />{console.log(isAuthenticated)}</div>)
                    )
                }
            </div></Provider>
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, null)(Verify);


