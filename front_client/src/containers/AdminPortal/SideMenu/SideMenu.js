import React, { Component } from 'react';
import './SideMenu.css';
import Aux from '../../Auxilary/Auxilary';
import { Link } from 'react-router-dom';



class Sidemenu extends Component{
    state = {
        activeKey:''
    }
    setActiveKey = (key) =>{
                this.setState({activeKey: key}, ()=> {this.props.changeContent(this.state.activeKey)});

                
    }
    render(){

        return(
            <Aux>
                <div id="mySidenav" className="sidenav" >
                
                <Link to='/admin-portal/home/manage-sections' className={this.state.activeKey === '1' ? "currentlyactive" : ""} onClick={() => {this.setActiveKey('1')}} >Manage Sections</Link>
                
                <Link  to="/admin-portal/home/manage-questions" className={this.state.activeKey === '2' ? "currentlyactive" : ""} onClick={() => {this.setActiveKey('2')}} >Manage Questions</Link>
                <Link to="/admin-portal/home/manage-candidates" className={this.state.activeKey === '3' ? "currentlyactive" : ""} onClick={() => {this.setActiveKey('3')}} >Manage Candidates</Link>
                <a href="/admin-portal/settings" className={this.state.activeKey === '4' ? "active" : ""} onClick={() => {this.setActiveKey('4')}} >Settings</a>
                
                </div>

                {/*<!-- Use any element to open the sidenav -->*/}
                {/*<!-- Add all page content inside this div if you want the side nav to push page content to the right (not used if you only want the sidenav to sit on top of the page -->*/}
                
                
            </Aux>
        );
    }
}

export default Sidemenu;