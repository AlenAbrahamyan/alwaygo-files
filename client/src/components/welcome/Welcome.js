import React, { Component } from 'react';
import SimpleNavbar from './SimpleNavbar';
import LoginForm from './LoginForm';

class Welcome extends Component {

    render() {

        return (
            <div className="Welcome" >
                <title>Welcome alwaygo</title>

                <SimpleNavbar />
                <img className='nk_a' src='https://scontent.xx.fbcdn.net/v/t1.15752-0/p280x280/69305523_1322880497870571_2650977076357627904_n.png?_nc_cat=109&_nc_oc=AQnzGebHYkfUfMxOJAQcinsSYqB8108REQvoiIzBLCwPFKycPDw_LH0OvNGUIQKlhR16GqVd_iLBrYSfvVBTkDbF&_nc_ad=z-m&_nc_cid=0&_nc_zor=9&_nc_ht=scontent.xx&oh=c9e3568be288a247566b27d64ab4bcf1&oe=5DC90F46'/>
               
                <LoginForm />


            </div>);
    }
}


export default Welcome;