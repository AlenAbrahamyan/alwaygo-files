import React, { Component } from 'react';
import SimpleNavbar from './SimpleNavbar';
import LoginForm from './LoginForm';

class Welcome extends Component {

    render() {

        return (
            <div className="Welcome" >
                <title>Welcome alwaygo</title>
                <SimpleNavbar />
                <LoginForm />

            </div>);
    }
}


export default Welcome;