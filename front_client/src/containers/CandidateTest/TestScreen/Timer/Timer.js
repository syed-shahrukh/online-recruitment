import React, { Component } from 'react';
import Aux from '../../../Auxilary/Auxilary';


class Timer extends Component{
    
    startTimer() {
        const self = this;
        let timer = setInterval(function() {
            self.setState(({ time }) => ({
                time: time - 1,
                
            }));
            if(self.props.isTicking === false){
                clearInterval(timer);
            }
            if(self.state.time === -1){
                clearInterval(timer);
            }           
          }, 1000)
    }

    componentDidMount(){
        this.startTimer();
    }
    
    
    state = {
        time: 60,
        
    };
    

    render(){
        return(
            <Aux>
                
                <div className="test-timer">
                {(this.props.isTicking) ? <p>pause timer is true</p>  : <p>pause timer is false</p>}       
                        {(this.state.time>-1)? <h3>{Math.floor(this.state.time/60)}:{("0" + this.state.time%60).slice(-2)}</h3>:<h3>0:00</h3>}
                    </div>
            </Aux>
        );
    }
}

export default Timer;