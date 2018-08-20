import React, { Component } from 'react';
import Aux from '../../../Auxilary/Auxilary'; 



class  BreakMessage extends Component{
    constructor( props ){
        super( props );
        this.resumeTest = this.resumeTest.bind(this);
      }
      state =this.props.location.state;
    componentDidMount (){
        console.log(this.state);
        const breakMessageOver = setTimeout(this.resumeTest,3000);
    }
    resumeTest(){
        if (this.state.currentSection === "section-1"){
            this.props.history.push({
                pathname:'/candidate-test/test-screen',
                state:{masterTimer: this.state.masterTimer, currentSection:"section-2",sectionTimer:60}
            
            });
        }
        else if (this.state.currentSection === "section-2"){
            this.props.history.push({
                pathname:'/candidate-test/test-screen',
                state:{masterTimer: this.state.masterTimer, currentSection:"section-3",sectionTimer:60}
            
            });
        }
        
    }
    render(){
      const section = this.state.currentSection;
      const timer = this.state.masterTimer;
        return(
            <Aux>
                <h1>Hello From Break Message</h1>
                <h2>Your time {section} for  is over</h2>
                <h3>You still have {timer} seconds left for your test</h3>
            </Aux>

        );
    }
}

export default BreakMessage;