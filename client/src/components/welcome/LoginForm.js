import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';


class LoginForm extends Component {
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
      };
    
      static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
      };
    
      componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
         
          if (error.id === 'LOGIN_FAIL') {
            this.setState({ msg: error.msg.msg });
          } else {
            this.setState({ msg: null });
          }
        }else{
          //window.location.reload(); 
        }
      }  


      onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
      onSubmit = e => {
        e.preventDefault();
    
        const { email, password } = this.state;
    
        const user = {
          email,
          password
        };
    
        this.props.clearErrors(); 
        // Attempt to login
        this.props.login(user);
         
        
      };



    render() {
        return (
            <div className="LoginForm">
                <form onSubmit={this.onSubmit}>
                    <center>
                    <p className="green_title">Sign in</p>

                    {this.state.msg ? (
              <div className="error_info" >{this.state.msg}</div>
            ) : null}
                    <input type="email" name="email"  placeholder="email" className="input_for_welcome" onChange={this.onChange}/>
                    <br/>
                    <input type="password" name="password" placeholder="password" className="input_for_welcome" onChange={this.onChange}/>
                    <br/> 
                    <br/>
                    <a href="/registration" className="btn_welcome">Sign up</a>
                    <input type="submit" value="Sign in" className="btn_welcome" /> 
                    
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
    { login, clearErrors }
  )(LoginForm);