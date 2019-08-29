import React, { Component } from 'react';
import SimpleNavbar from './SimpleNavbar';
import RegistrationForm from './RegistrationForm';






class WelcomeRegistration extends Component {


  
    render() {

    

        return (
            <div className="Welcome" >
            <title>Registration alwaygo</title>
            <SimpleNavbar/>
            <center>
            
            
            <RegistrationForm />
            
           
            </center>
             
            </div>
        ); 
    }
  }
  
  
 
  
  

   
  export default WelcomeRegistration;
  