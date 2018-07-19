import React, { Component } from 'react';
import Aux from '../Auxilary/Auxilary';
import Sidemenu from './SideMenu/SideMenu';
import Navbar from '../Navbar/Navbar';
import { Switch, Route, Link} from 'react-router-dom';
import AdminHome from './AdminHome/AdminHome';
import ManageSection from './ManageSection/ManageSection';
import ManageQuestion from './ManageQuestion/ManageQuestion';
import ManageCandidate from './ManageCandidate/ManageCandidate';
import CandidateDetails from './ManageCandidate/CandidateDetails/CandidateDetails';
import './AdminPortal.css';



class AdminPortal extends Component{
    constructor(){
        super();
        this.setContentId = this.setContentId.bind(this);
    }


    state = {
      
        marginLeft:'0px',
        class:'',
        componentToLoad:'none',
        key: 'undefined'
    }
   
    setContentId(newID){
      this.setState({key: newID}, () => {console.log(`The param value is ${newID}  Component in Admin Portal with id ${this.state.key} is loaded...`)});        
    }  


    render(){
        return(
            <Aux>
            
                
                <Navbar title="Admin Portal">
                        <div className="greeting-statement">
                        <span><b>Welcome, Admin</b></span>
                        <Link to="/account-type"><i className="fas fa-sign-out-alt"></i></Link>   
                        </div>
                </Navbar>
               
                <Sidemenu 
                    changeContent = {this.setContentId}
                marginLeft={this.state.marginLeft}
                isOpen={this.state.isOpen}
                click={this.openSidebar}/>

                <div id="main" style={{marginLeft: this.state.marginLeft}}>
                
               
                <Switch>
                 
                    <Route exact path={`/manage-sections`} component={ManageSection} />
                    <Route exact path={`/manage-questions`} component={ManageQuestion} />
                    <Route exact path={`/manage-candidates`} component={ManageCandidate} />
                    <Route exact path={`/admin-portal/home/`} component={AdminHome} />
                    <Route exact path={`/admin-portal/home/manage-sections/`} component={ManageSection} />
                    <Route exact path={`/admin-portal/home/manage-questions/`} component={ManageQuestion} />
                    <Route exact path={`/admin-portal/home/manage-candidates/`} component={ManageCandidate} />
                    <Route exact path={`/admin-portal/home/manage-candidates/candidate-details/`} component={CandidateDetails} />
                    
                    
            </Switch>
                </div>
                
            </Aux>
            
        );
    }
}

export default AdminPortal;