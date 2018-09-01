import React, { Component } from 'react';
import Aux from '../Auxilary/Auxilary';
import { Link, Route, Switch } from 'react-router-dom';
import './CandidateTest.css';
import Screen from './TestScreen/TestScreen';
import CompletionScreen from './CompletionScreens/CompletionScreens';
import Navbar from '../Navbar/Navbar';
import BreakMessage from './TestScreen/BreakMessage/BreakMessage';
import WelcomeScreen from './WelcomeScreen/WelcomeScreen';

class CandidateTest extends Component{
   state = {
       candidateName: 'Syed Muhammad Shahrukh'
   }

    render(){
        return( 
            <Aux>
            
                <div className="test-body">
                
                <Switch>
                <Route exact path={`/candidate-test/`} component={WelcomeScreen} />
                <Route exact path={`/candidate-test/test-screen/`} component={Screen} />
                <Route exact path={`/candidate-test/break/`} component={BreakMessage} />
                <Route exact path={`/candidate-test/test-completed/`} component={CompletionScreen} name="syed shahrukh" />
                </Switch>
           </div>
              
            </Aux>

        );
    }
}

export default CandidateTest;