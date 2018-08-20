import React, { Component } from 'react';
import Aux from '../../Auxilary/Auxilary';
import './WelcomeScreen.css';
import { Button } from 'react-bootstrap';


class WelcomeScreen extends Component{
    constructor( props ){
        super( props );
      }
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
  };
  startTest = () => {
    const self = this;
    self.props.history.push({
        pathname:'/candidate-test/test-screen',
        state:{masterTimer: 3*60, currentSection:"section-1",sectionTimer:60}
    });
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
                   <Button onClick={this.startTest} bsClass="xavor-style-small">Start test</Button>
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