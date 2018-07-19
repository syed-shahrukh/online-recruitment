import React, { Component } from 'react';
import Aux from '../../../Auxilary/Auxilary';
import Questions from '../Questions/Questions';
import Timer from '../Timer/Timer';
import { Button, Radio, FormGroup, Alert } from 'react-bootstrap';



class Section extends Component{
    constructor(props) {
        super(props);
        this.state = {
            section1isActive:true,
            section2isActive:false,
            section3isActive:false,
            break_message: false,
            section1_timer:10,
            section2_timer:20,
            section3_timer:30,
            master_timer: true
        }
       this.startSection1Timer = this.startSection1Timer.bind(this);
       this.startSection2Timer = this.startSection2Timer.bind(this);
       this.startSection3Timer = this.startSection3Timer.bind(this);
      }
    startSection1Timer(){
        const self = this;
        let timer = setInterval(function() {
            self.setState(({ section1_timer }) => ({
                section1_timer: section1_timer - 1,
                
            }));
            console.log("Value of state time: " + self.state.section1_timer );
            if(self.state.section1_timer === -1){
                
                self.setState({section1isActive:false, break_message:true, master_timer:false});
                
            }
            if(self.state.section1_timer === -7){
                self.setState({section2isActive:true, break_message:false, master_timer:true});
                clearInterval(timer);
                self.startSection2Timer();
            }           
          }, 1000)
    };

    startSection2Timer(){
        const self = this;
        let timer = setInterval(function() {
            self.setState(({ section2_timer }) => ({
                section2_timer: section2_timer - 1,
                
            }));
            console.log("Value of state time: " + self.state.section2_timer );
            if(self.state.section2_timer === -1){
                self.setState({section2isActive:false, break_message:true,master_timer: false});
                
                
            }
            if(self.state.section2_timer === -7){
                self.setState({section3isActive:true, break_message:false,master_timer:true});
                clearInterval(timer);
                self.startSection3Timer();
            }              
          }, 1000)
    };

    startSection3Timer(){
        const self = this;
        let timer = setInterval(function() {
            self.setState(({ section3_timer }) => ({
                section3_timer: section3_timer - 1,
                
            }));
            console.log("Value of state time: " + self.state.section3_timer );
            if(self.state.section3_timer === -1){
                self.setState({section3isActive:false,master_timer: false});
                clearInterval(timer);
                
            }
                          
          }, 1000)
    };
    componentDidMount(){
        this.startSection1Timer();
        
    }
    componentDidUpdate(){
        console.log("master_timer: " + this.state.master_timer);
    }
   
    render(){
        return(
            <Aux>
                {this.state.break_message ? 
                <Alert bsStyle="info">
                    Your time for <strong>this section</strong> is over. Take a break. Your test will resume shortly
              </Alert>: (this.state.section1isActive) ? <h3>Section 1</h3>:
                (this.state.section2isActive) ? <h3>Section 2</h3>:
                (this.state.section3isActive) ? <h3>Section 3</h3>:
                <h3>Test Finished</h3>
                }
                 <div className="question-timer">
                    <Questions/>
                    <Timer isTicking={this.state.master_timer}/>
                    
                </div>
                <div className="test-window">
                    <div className="statement-and-timer">
                    <div className="test-question-statement">
                        <h2><label>Test Question Statement</label></h2>
                    </div>
                    <div className="section-timer">
                        
                        {(this.state.section1isActive) ?
                             (<h3>{Math.floor(this.state.section1_timer/60)}:{("0"+this.state.section1_timer%60).slice(-2)}</h3>)
                             :(this.state.section2isActive)?
                             (<h3>{Math.floor(this.state.section2_timer/60)}:{("0"+this.state.section2_timer%60).slice(-2)}</h3>)
                             :(this.state.section3isActive)?
                             (<h3>{Math.floor(this.state.section3_timer/60)}:{("0"+this.state.section3_timer%60).slice(-2)}</h3>)
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

export default Section;