import React, { Component } from 'react';
import SimpleNavbar from './SimpleNavbar';
import LoginForm from './LoginForm';

class Welcome extends Component {

    render() {

        return (
            <div className="Welcome" >
                <title>Welcome alwaygo</title>

                <SimpleNavbar />
                <img className='nk_a' src='https://scontent.fevn5-1.fna.fbcdn.net/v/t1.15752-0/p280x280/69370666_1387835631395138_7465498354177277952_n.png?_nc_cat=102&_nc_oc=AQklR2mRHsZi1evQZUi7ToZ-zWCClPuFXzREjWK6XsrkLB2A5d3fEXNhT5JAWCKQx3k&_nc_ht=scontent.fevn5-1.fna&oh=4a28da7b6cbb97e3372db1e447c2218c&oe=5E1658EF'/>
               
                <LoginForm />


            </div>);
    }
}


export default Welcome;