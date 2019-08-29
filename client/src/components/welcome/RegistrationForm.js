import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';



class RegistrationForm extends Component {

    state = {
        modal: false,
        name: '', 
        last_name: '',
        username: '',
        email: '',
        password: '',
        msg: null
      };

      static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
      };
  

      componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
          // Check for register error
          if (error.id === 'REGISTER_FAIL') {
            this.setState({ msg: error.msg.msg });
          } else {
            this.setState({ msg: null });
          }
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });

      };

      onSubmit = e => {
         
        e.preventDefault(); 

        const { name, last_name, username, email, password } = this.state;

        // Create user object
        const newUser = {
          name,
          last_name,
          username,
          email,
          password
        };
    
        this.props.clearErrors(); 
        // Attempt to register 
        this.props.register(newUser);

    }; 

    render() {
        return (
            <div className="RegistrationForm"> 

            <form onSubmit={this.onSubmit} >
                <center>
                <p className="green_title">Sign up</p>
                {this.state.msg ? (
              <div className="error_info" >{this.state.msg}</div>
            ) : null}
                <input type="text" name="name" id='name' placeholder="Name" className="input_for_welcome" onChange={this.onChange} />
                <br/>
                <input type="text" name="last_name" id="last_name" placeholder="Last Name" className="input_for_welcome"  onChange={this.onChange}/>
                <br/>
                <input type="text" name="username" id="username" placeholder="Username" className="input_for_welcome"  onChange={this.onChange}/>
                <br/>
                <input type="email" name="email" id="email" placeholder="Email" className="input_for_welcome" onChange={this.onChange}/>
                <br/>
                <input type="password" name="password" id="password" placeholder="Password" className="input_for_welcome"  onChange={this.onChange}/>
                <br/> 
                <br/>
                
                <input type="submit" value="Sign up" className="btn_welcome" /> 
                
                </center>

            </form>
            
        </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  });
  
  export default connect(
    mapStateToProps,
    { register, clearErrors }
  )(RegistrationForm);