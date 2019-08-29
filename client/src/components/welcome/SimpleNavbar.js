import React, { Component } from 'react';
import Logo from '../../images/logo.png';


class SimpleNavbar extends Component {
    render() {
        return (
            <div className="SimpleNavbar" >
                <a href="/"><img className="LogoWelcome" src={Logo} /></a>
            </div>
        )
    }
}

export default SimpleNavbar