import React, { Component } from 'react';
import axios from 'axios';
import { FormControl, FormGroup, ControlLabel, Form, Button } from 'react-bootstrap';
import LoginLogo from '../../images/login-logo.png';
import SignupLogo from '../../images/signup-logo.png';
import Navbar from '../Navbar/Navbar';
import './Login.css';
import Aux from '../Auxilary/Auxilary';
import { Redirect } from 'react-router-dom';






class Login extends Component {
  state ={
    signup_status: false,
    signup_email: "",
    signup_password: "",
    signup_confirm_password: ""

  };
  fillSignupInfo = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    switch (name) {
      case "signup-email":
        this.setState({signup_email: value});
        break;
      case "signup-password":
        this.setState({signup_password: value});
        break;
      case "signup-confirm-password":
        this.setState({signup_confirm_password: value});
        break;
      default:

    }

  };
  signupUser = () => {
    const user = {
      email: this.state.signup_email,
      password: this.state.signup_password
    }
    axios.post('/api/users/signup', user)
        .then(response => {
            console.log("User Created successfully: " + response);
            this.setState({signup_status: true});
            
        })
  }
  
  render() {
   
    return (

      <Aux>
        {this.state.signup_status ? <Redirect to="/signup"/> : console.log("")}
        <Navbar title="Welcome to Xavor Corporation" />
        <div className="row wrap">
          <div className="empty-parent-login">
          <div className="col-md-5 login-window">
          
          <div className="row dialogue-title">
              <div className="col-md-8 ">
                <h4>Login to site</h4>
                <h6>Enter your email and password to Login</h6>
              </div>
              <div className="col-md-4 logo ">
                <img alt="login-logo" src={LoginLogo} />
              </div>

            </div>
            <Form className="login-form">
              <div className="row">
                <div className="col-md-12">
                  <FormGroup bsSize="large"  >
                    <ControlLabel>Email</ControlLabel>{'    '}
                    <FormControl  type="email" placeholder="jane.doe@example.com" />
                  </FormGroup>{' '}
                </div>
                </div>
                
              <div className="row">
                <div className="col-md-12">
                  <FormGroup bsSize="large">
                    <ControlLabel>Password</ControlLabel>{'    '}
                    <FormControl type="password" placeholder="Enter your password" />
                  </FormGroup>{' '}
                </div>
              </div>
            </Form>
            <div className="row">
              <div className="col-md-12 button-container">
                <Button href="#" className="buttons" bsClass="xavor-style">Login</Button>
              </div>
            </div>
        
          </div>
          </div>
          <div className="line-drawer"></div>
          <div className="empty-parent-signup">
          <div className="col-md-5 signup-window">
          <div className="row dialogue-title">
                  <div className="col-md-8">
                    <h4>Sign up now</h4>
                    <h6>Fill in the form below to get instant access</h6>
                  </div>
                  <div className="col-md-4 logo">
                    <img alt="signup-logo" src={SignupLogo}/>
                  </div>
                  </div>

                  <Form className="signup-form">
                  <div className="row">
                <div className="col-md-12">
                  <FormGroup bsSize="large" >
                    <ControlLabel>Name</ControlLabel>{'    '}
                    <FormControl type="text" placeholder="Jane Doe" />
                  </FormGroup>{' '}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <FormGroup bsSize="large" controlId="formInlineEmail" >
                    <ControlLabel>Email</ControlLabel>{'    '}
                    <FormControl onChange={this.fillSignupInfo} name="signup-email" type="email" placeholder="jane.doe@example.com" />
                  </FormGroup>{' '}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <FormGroup bsSize="large">
                    <ControlLabel>Password</ControlLabel>{'    '}
                    <FormControl onChange={this.fillSignupInfo} name="signup-password" type="password" placeholder="Enter your password" />
                  </FormGroup>{' '}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <FormGroup bsSize="large">
                    <ControlLabel>Confirm Password</ControlLabel>{'    '}
                    <FormControl onChange={this.fillSignupInfo} name="signup-confirm-password" type="password" placeholder="Confirm your password" />
                  </FormGroup>{' '}
                </div>
                
              </div>
            </Form>
            <div className="row">
              <div className="col-md-12">
                <Button className="buttons" bsClass="xavor-style" onClick={this.signupUser}>Signup</Button>
              </div>
            </div>
            </div>
            </div>
          
        </div>
        
            {/* Login Modal*/}
      </Aux>
          );
      
        }
      }
      
      export default Login;
