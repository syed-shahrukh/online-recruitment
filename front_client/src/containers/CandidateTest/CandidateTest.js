import React, { Component } from 'react';
import Aux from '../Auxilary/Auxilary';
import { Link, Route, Switch } from 'react-router-dom';
import './CandidateTest.css';
import Screen from './TestScreen/TestScreen';
import CompletionScreen from './CompletionScreens/CompletionScreens';
import Navbar from '../Navbar/Navbar';
import WelcomeScreen from './WelcomeScreen/WelcomeScreen';

class CandidateTest extends Component{
   

    render(){
        return( 
            <Aux>
            <Navbar title="">
                        <div className="greeting-statement">
                        <span><b>Candidate Name</b></span>
                        <Link to="/account-type"><i className="fas fa-sign-out-alt"></i></Link>   
                        </div>
                </Navbar>
                <div className="test-body">
                
                <Switch>
                <Route exact path={`/candidate-test/`} component={WelcomeScreen} />
                <Route exact path={`/candidate-test/test-screen/`} component={Screen} />
                <Route exact path={`/candidate-test/test-completed/`} component={CompletionScreen} name="syed shahrukh" />
                </Switch>
           </div>
              
            </Aux>

        );
    }
}

export default CandidateTest;