import React, { Component } from 'react';
import Aux from '../../../Auxilary/Auxilary'; 



class  BreakMessage extends Component{
    constructor( props ){
        super( props );
        this.resumeTest = this.resumeTest.bind(this);
      }
      state ={...this.props.location.state,
                sectionQuestions: 0} ;
    componentDidMount (){
        console.log(this.state);
        const breakMessageOver = setTimeout(this.resumeTest,30000);
        
         let currentSection = this.state.currentSection.name;
         if(currentSection == "Section 1"){
             currentSection = this.state.sections[1];
             this.setState({currentSection: currentSection, sectionQuestions: 15});
         } 

         if(currentSection == "Section 2"){
            currentSection = this.state.sections[2];
            this.setState({currentSection: currentSection, sectionQuestions: 20});
        } 
    }
    resumeTest(){
       
            this.props.history.push({
                pathname:'/candidate-test/test-screen',
                state:{masterTimer: this.state.masterTimer, currentSection:"section-2",sectionTimer:60, test:this.state.test, activeUser: this.state.activeUser,
                        sectionQuestions: this.state.sectionQuestions}
            
            });
    
        
        
    }
    render(){
      
      const timer = this.state.masterTimer;
        return(
            <Aux>
                <h1>Hello From Break Message</h1>
                <h2>Your time  for  is over</h2>
                <h3>You still have {timer} seconds left for your test</h3>
            </Aux>

        );
    }
}

export default BreakMessage;