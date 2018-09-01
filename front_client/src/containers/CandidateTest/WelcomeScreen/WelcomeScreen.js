import React, { Component } from 'react';
import Aux from '../../Auxilary/Auxilary';
import './WelcomeScreen.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Backdrop from 'react-backdrop';
import Spinner from '../../../UI/Spinner/Spinner';
import Navbar from '../../Navbar/Navbar';
import { Link } from 'react-router-dom';


class WelcomeScreen extends Component{

    state= { 
        show:false,
        candidateName:'Syed Muhammad Shahrukh',
        loading: false,
        acitveUser: "5b83f15650a3d344e0bb1e61"// this.props.location.state.userId
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
    this.setState({loading: true}, () => {
    });
    axios.get('/api/sections')
    .then(response => {
        const self = this;
        self.setState({loading:false});
        const sections = response.data.map(section => {
            return (section);
        })
    self.props.history.push({
        pathname:'/candidate-test/test-screen',
        state:{masterTimer: 3*60, currentSection: sections[0], sections: sections, activeUser: this.state.acitveUser, sectionQuestions: 10}
    });  
    });
   
    }

    completeProfile = () => {       
        this.props.history.push({
            pathname:'/profile',
           // state:{userId: this.state.acitveUser}
        });  
    
    }
    render(){
        return(
            <Aux>
                
                {this.state.show ? 
                    
                    <div>
                        <Navbar title="">
                        <div className="greeting-statement">
                        <span><b>{this.state.candidateName}</b></span>
                        <Link to="/"><i className="fas fa-sign-out-alt"></i></Link>   
                        </div>
                    </Navbar>
                    <div className="welcome-dialogue">
                    <h1>Welcome {this.state.candidateName} </h1>
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
                      <Button onClick= {this.completeProfile} bsClass="xavor-style-small">Complete Profile</Button>
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
                {this.state.loading ? 
                    <Backdrop>
                    <Spinner/>
                </Backdrop>:
                <div></div>
                
                }
                
                
            </Aux>
        );
    }
}
export default WelcomeScreen;