import React, { Component } from 'react';
import Aux from '../../Auxilary/Auxilary';
import './CompletionScreens.css';
import { Button } from 'react-bootstrap';
import Navbar from '../../Navbar/Navbar';
import { Link } from 'react-router-dom';


class CompletionScreens extends Component{
    constructor( props ){
        super( props );
        this.logout = this.logout.bind(this);
      }
      state={
          candidateName: 'Syed Muhammad Shahrukh'
      }

logout () {
    console.log("Logout Called");
    this.props.history.push({
        pathname:'/'
    })
}
    render(){
        return(
            <Aux>
                <Navbar title="">
                        <div className="greeting-statement">
                        <span><b>{this.state.candidateName}</b></span>
                        <Link to="/"><i className="fas fa-sign-out-alt"></i></Link>   
                        </div>
                    </Navbar>
                <div className="instruction-window">
                   <div className="headline">
                       <label>Your test is completed. Your progress has been saved. Please Logout before leaving your 
                           seat.
                       </label>
                   </div>
                  
                     </div>
              

            </Aux>
        );
    }
}

export default CompletionScreens;