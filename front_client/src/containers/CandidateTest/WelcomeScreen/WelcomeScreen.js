import React, { Component } from 'react';
import Aux from '../../Auxilary/Auxilary';
import { Link } from 'react-router-dom';
import './WelcomeScreen.css';
import { Button } from 'react-bootstrap';


class WelcomeScreen extends Component{
    state={
        show:false,
        candidate_name:'Syed Muhammad Shahrukh'
    };

  componentDidMount = function() {
    setTimeout(
        function() {
            this.setState({show: true});
        }
        .bind(this),
        2000
    );
  }
    render(){
        return(
            <Aux>
                
                {this.state.show ? 
                    <div>
                    <div className="welcome-dialogue">
                    <h1>Welcome {this.state.candidate_name}</h1>
                    </div>
                   <div className="instruction-window">
                   <div className="headline">
                       <label>Your test is ready. Please read instructions carefully before your test commences</label>
                   </div>
                   <ul>
                           <li>Instruction one.</li>
                           <li>Instruction two.</li>
                           <li>Instruction three.</li>
                           <li>Your test duration will be of 60 minutes.</li>
                       </ul>
                   <div className="button-container">
                   <Link to="/candidate-test/test-screen"> <Button bsClass="xavor-style-small">Start test</Button></Link>
                      <Button bsClass="xavor-style-small">Complete Profile</Button>
                   </div>  
                     </div>
                     </div>
                    : 
                
                <div className="verification-link-container">
                    <p>
                    Verification link has been sent to email you provided.
                    Please click on that link to verify your email address.
                    </p>
                </div>
                }
                
                
            </Aux>
        );
    }
}
export default WelcomeScreen;