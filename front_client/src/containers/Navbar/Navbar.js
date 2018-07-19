import React, { Component } from 'react';
import Logo from '../../images/xavor_logo.png';
import './Navbar.css';
import Aux from '../Auxilary/Auxilary';

class Header extends Component {
    render(){
        return (
                <Aux>
                    <div className="header-wrapper">
                        <div className="image-container">
                        <a href="/"><img className="company-logo" src={Logo} alt="company-logo"/></a>
                        </div>
                        <div className="header-content">
                        <span><b>{this.props.title}</b></span>
                        {this.props.children}
                        </div>
                    </div>
                </Aux>
        );
    }
}

export default Header;