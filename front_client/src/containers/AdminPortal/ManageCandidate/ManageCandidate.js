import React, { Component } from 'react';
import Aux from '../../Auxilary/Auxilary';
import { Breadcrumb} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ReactTable from 'react-table';
import './ManageCandidate.css';

const fakeData = [
    { name: "Adil", number: '+123456', email: "xa@xavor.com",position: "Software Engineer", gender: "Male", expected_salary: "50,000" },
    { name: "Ahmer", number: '+123456', email: "xa@xavor.com",position: "Software Engineer", gender: "Male", expected_salary: "50,000" },
    { name: "Amir", number: '+123456', email: "xa@xavor.com",position: "Software Engineer", gender: "Male", expected_salary: "50,000" },
    { name: "Majid", number: '+123456', email: "xa@xavor.com",position: "Software Engineer", gender: "Male", expected_salary: "50,000" },
    { name: "Shahrukh", number: '+123456', email: "xa@xavor.com",position: "Software Engineer", gender: "Male", expected_salary: "50,000" }
   
  ];

class ManageCandidate extends Component{
    state = {
        show: false,
        columns: [
          {
            Header: "Candidate Name",
            headerClassName: "table-header-grid",
            accessor: "name",
            show: true
          },
          {
            Header: "Contact Number",
            headerClassName: "table-header-grid",
            accessor: "number",
            show: true
          },
          {
            Header: "Email Address",
            headerClassName: "table-header-grid",
            accessor: "email",
            show: true
          },
          {
            Header: "Position Applied for",
            headerClassName: "table-header-grid",
            accessor: "position",
            show: true
          },
          {
            Header: "Gender",
            accessor: "gender",
            headerClassName: "table-header-grid",
            show: true
          },
          {
            Header: "Expected Salary",
            accessor: "expected_salary",
            headerClassName: "table-header-grid",
            show: true
          },
          {
            Header: "Details",
            headerClassName: "table-header-grid",
            Cell: row => (
                <div>
                <Link to="/admin-portal/home/manage-candidates/candidate-details">
                View
                </Link>
                </div>
            )
        
          },
          
        ]
      };
    /***************************** Functions****************************************************** */
    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }
    handleDeleteOperation = () => {
        console.log("Delete operation function has been called!!!");
    }
    handleEditOperation = () =>{
        console.log("Edit operation function has been called!!!");
    }
    /***************************** End of Functions****************************************************** */
    render(){
        return(

            <Aux>
                <Breadcrumb className="bread-crumb">
                    <Breadcrumb.Item href="/admin-portal/home/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item className="current-node" active href="/admin-portal/home/manage-candidates">Manage Candidates</Breadcrumb.Item>
                </Breadcrumb>
                <div className="content-body">
                    <div className="admin-tools">
          
                     {/****************************************Search Bar*************************************/}
                    <div className="search-bar">
                        <form>
                            <input className="search-box" name="search" placeholder="Search..."/>
                            <button className="search-button">
                                <i className="fas fa-search"></i>
                            
                            </button>
                        </form>
                    </div>
                    {/****************************************Search Bar*************************************/}
                    </div>
                    <div className="tabular-data">
                        <ReactTable className="table-grid" data={fakeData} minRows={0} columns={this.state.columns} />
                    </div>
                </div>
                
            </Aux>
        );
    }
}

export default ManageCandidate;