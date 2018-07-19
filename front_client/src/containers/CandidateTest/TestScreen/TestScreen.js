import React, { Component } from 'react';
import Aux from '../../Auxilary/Auxilary'; 
import './TestScreen.css';
import Section from './Section/Section';

class TestScreen extends Component{
   
    render(){
        
        return(
            <Aux>
               <Section />
                
            </Aux>

        );
    }
}

export default TestScreen;