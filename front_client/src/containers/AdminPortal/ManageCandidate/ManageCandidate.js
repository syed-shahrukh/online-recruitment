import React, { Component } from 'react';
import Aux from '../../Auxilary/Auxilary';
import { Breadcrumb, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ReactTable from 'react-table';
import './ManageCandidate.css';
import axios from 'axios';

const fakeData = [
    { name: "Adil", number: '+123456', email: "xa@xavor.com",position: "Software Engineer", gender: "Male", expected_salary: "50,000" },
    { name: "Ahmer", number: '+123456', email: "xa@xavor.com",position: "Software Engineer", gender: "Male", expected_salary: "50,000" },
    { name: "Amir", number: '+123456', email: "xa@xavor.com",position: "Software Engineer", gender: "Male", expected_salary: "50,000" },
    { name: "Majid", number: '+123456', email: "xa@xavor.com",position: "Software Engineer", gender: "Male", expected_salary: "50,000" },
    { name: "Shahrukh", number: '+123456', email: "xa@xavor.com",position: "Software Engineer", gender: "Male", expected_salary: "50,000" }
   
  ];

class ManageCandidate extends Component{
    componentDidMount(){
        axios.get('/api/candidates/').then(response => {
            console.log(response.data);
            let recievedData = response.data;
            let data = recievedData.map( data => {
                return({
                    userId: data.userId,
                    fullName: data.fullName,
                    mobilePhone: data.mobilePhone,
                    email: data.email['email'],
                    positionApplied: data.positionApplied,
                    gender: data.gender
                });
            });
            console.log(data);
                
             this.setState({candidatesData: data});
                
            
        }
        
    
    )

    }
    state = {
        show: false,
        candidatesData: [
            
        ],
        columns: [
          {
              Header: "Id",
              accessor: "id",
              show:false
          },
        {
            Header: "Candidate Name",
            headerClassName: "table-header-grid",
            accessor: "fullName",
            show: true
          },
          {
            Header: "Contact Number",
            headerClassName: "table-header-grid",
            accessor: "mobilePhone",
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
            accessor: "positionApplied",
            show: true
          },
          {
            Header: "Gender",
            accessor: "gender",
            headerClassName: "table-header-grid",
            show: true
          },
          {
            Header: "Details",
            headerClassName: "table-header-grid",
            Cell: row => (
                <div>
                <a onClick={ () => this.viewCandidateDetails(row.original) }>View</a>
                </div>
            )
        
          },
          
        ]
      };
    /***************************** Functions****************************************************** */
    viewCandidateDetails = (row) => {
        console.log(row);
        this.props.history.push({
            pathname: "manage-candidates/candidate-details",
            state: row
        });

    }
    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
        console.log(this.state.candidatesData);
    }
    handleDeleteOperation = () => {
        console.log("Delete operation function has been called!!!");
    }
    handleEditOperation = () =>{
        console.log("Edit operation function has been called!!!");
    }
    /***************************** End of Functions****************************************************** */
    render(){
        const data = this.state.candidatesData;
        
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
                        <ReactTable className="table-grid" data={data} minRows={0} columns={this.state.columns} />
                    </div>
                </div>
                
            </Aux>
        );
    }
}

export default ManageCandidate;