import React, { Component } from 'react';
import Login from './containers/Login/Login';
import Aux from './containers/Auxilary/Auxilary';
import Profile from './containers/Profile/Profile';
import CandidateTest from './containers/CandidateTest/CandidateTest';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import AdminPortal from './containers/AdminPortal/AdminPortal';






class App extends Component {
  render() {
    return (
      <Aux>
      <Router >
        <div className="App">
          <Route path="/" exact component={Login} />
          <Route path={`/profile/`} exact component={Profile} />
          <Route path={"/candidate-test"} component={CandidateTest}/>
           <Route path={"/admin-portal/home/"} component={AdminPortal}/>   
        </div>
      </Router>
      <footer>
        <p>&copy; 2018 Xavor Corporation</p>
          </footer>
          </Aux>
    );
  }
}

export default App;
