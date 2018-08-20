import React, { Component } from 'react';
import Aux from '../../Auxilary/Auxilary'; 
import axios from 'axios';
import './TestScreen.css';
import { FormGroup, Radio, Button} from 'react-bootstrap';


class  TestScreen extends Component{
    constructor( props ){
        super( props );
        this.startSectionTimer = this.startSectionTimer.bind(this);
      }
    state =  this.props.location.state;
    
   componentDidMount () {
       console.log("State: ");
       console.log(this.state);
       console.log(this.props.location.state);
    this.loadQuestions();
    
   };
   loadQuestions() {
    axios.get('/api/test')
    .then(response => {
        console.log(response.data);
        this.startTimer();
        this.startSectionTimer();
    })
   }
   startSectionTimer() {
       this.setState({breakMessage: false});
    let sectionTimer =  setInterval(()=>{
        const newTime = this.state.sectionTimer - 1;
        this.setState({sectionTimer: newTime}, () => {
            console.log("Timer is :" + this.state.sectionTimer);
            if(this.state.sectionTimer === 0){
                if(this.state.masterTimer === 0){
                    this.props.history.push({
                        pathname:'/test-completed'
                    });
                    return;
                }
                clearInterval(sectionTimer);
                this.props.history.push({
                    pathname:'/break-message',
                    state:{masterTimer: this.state.masterTimer, currentSection:this.state.currentSection}
                
                });
            }
        });
    },1000);
   };
   startTimer(){
   let timerId =  setInterval(()=>{
        const newTime = this.state.masterTimer-1;
        this.setState({masterTimer: newTime}, () => {
            console.log("Timer is :" + this.state.masterTimer);
            if(this.state.masterTimer === 0){
                clearInterval(timerId);
            }
        })
    },1000);
   };

    render(){
        const timer = this.state.masterTimer;
        const sectionTimer = this.state.sectionTimer;
        return(
            <Aux>
                
                
                <div className="question-timer">
                <div className="question-number">
                    <h3>Question 50/60</h3>
                
                </div>
                    
                    <div className="test-timer">
                        {(timer>-1)? <h3>{Math.floor(timer/60)}:{("0" + timer%60).slice(-2)}</h3>:<h3>0:00</h3>}
                    </div>
                </div>
            
                <div className="test-window">
                    <div className="statement-and-timer">
                    <div className="test-question-statement">
                        <h2><label>Test Question Statement</label></h2>
                    </div>
                    <div className="section-timer">

                        {(sectionTimer) ?
                             (<h3>{Math.floor(sectionTimer/60)}:{("0"+sectionTimer%60).slice(-2)}</h3>)
                                :<h3>0:00</h3>}
                    </div>
                    </div>
                    <div className="question-options">

                    <FormGroup>
                        <Radio name="radioGroup">
                            Option 1
                        </Radio>{' '}
                        <Radio name="radioGroup">
                            Option 2
                        </Radio>{' '}
                        <Radio name="radioGroup">
                            Option 3
                        </Radio>
                    </FormGroup>
                    </div>
        {/****************************************Next Question Button************************************************/}
                    <div className="next-question-button-container">
                        <Button onClick={this.changeQuestion} bsClass="xavor-style">Next</Button>
                    </div>
        {/*********************************End of Next Question Button************************************************/}
                </div>

                
                
                
            </Aux>

        );
    }
}

export default TestScreen;