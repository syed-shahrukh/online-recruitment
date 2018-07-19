import React, {Component} from 'react';
import Aux from '../../../Auxilary/Auxilary';
import { Modal, Breadcrumb } from 'react-bootstrap';

import ReactTable from 'react-table';
import './CandidateDetails.css';

class CandidateDetails extends Component{
    state= {
        parent_show:false,
        curr_active: '',
        duties_to_show:'',
        name: 'Syed Muhammad Shahrukh',
        fathername: 'Syed Waseem Akhtar',
        cnic: '17301-7643773-5',
        dob:'22/01/1995',
        gender:'Male',
        marital:'Single',
        email:'sshahrukh@xavor.com',
        mobile:'0333-9xxxxx7',
        homephone:'042-3xxxxx-x',
        current_address:'Bankers Avenue, Bedian Rd, Lahore.',
        permanent_address:'Hayatabad, Peshawar',
        position_applied:'Software Engineer',
        salary_expected:'175000',
        employment_desired: 'Full Time',
        expected_joining:'2',
        academic_records: [
            {institute:'Forward Model School',subject:'Sciences',degree:'Matriculation',from:'12/07/2000',to:'16/10/2010',grades:'858/1050'},
            {institute:'Edwardes College',subject:'Pre-Engineering',degree:'FSc',from:'12/08/2010',to:'28/04/2012',grades:'790/1100'},
            {institute:'NUCES - FAST',subject:'Engineering',degree:'BS Computer Science',from:'14/08/2012',to:'24/12/2015',grades:'2.1'},
        ],
        professional_records: [
            {employer:'Google',address:'Montreal, Canada',employment_start:'January, 2012',employment_end:'May 2018',salary_start:'75000',salary_final:'100000',job_title:'Software Engineer',reason_leaving:'Boredom',duties:'Hands on my neck, foot on my back Closing in from every side Bleeding me dry, I\'m fading fast\nLeft for dead but I will rise up on my own I could make it alone I got all that I need to survive'}
            
        ],
        reference_records: [
            {name:'Waseem',address:'Montreal, Canada',telephone:'+923339103604',relationship:'Teacher',years_known:'7',characters_vouch:'Loyal'}
            
        ],
        test_records: [
            {attempt_date:'8 June, 2018',marks:'74',status:'Passed'}
            
        ],
        academic_columns: [
            {
              Header: "Name of institute",
              headerClassName: "table-header-grid",
              accessor: "institute",
              show: true
            },
            {
              Header: "Subject",
              headerClassName: "table-header-grid",
              accessor: "subject",
              show: true
            },
            {
                Header: "Tenure",
                headerClassName: "table-header-grid",
                columns: [
                    {
                        Header: "From",
                        headerClassName: "table-header-grid",
                        accessor: "from"
                    },
                    {
                        Header: "To",
                        headerClassName: "table-header-grid",
                        accessor: "to"
                    }
                ]
            },
            {
              Header: "Major/Degree",
              headerClassName: "table-header-grid",
              accessor: "degree",
              show: true
            },{
              Header: "Grades/CGPA",
              accessor: "grades",
              headerClassName: "table-header-grid",
              show: true
            }
            
          ],
          professional_columns: [
            {
              Header: "Employer/Company",
              headerClassName: "table-header-grid",
              accessor: "employer",
              show: true
            },
            {
              Header: "Adress",
              headerClassName: "table-header-grid",
              accessor: "address",
              show: true
            },
            {
                Header: "Employment Tenure",
                headerClassName: "table-header-grid",
                columns: [
                    {
                        Header: "From",
                        headerClassName: "table-header-grid",
                        accessor: "employment_start"
                    },
                    {
                        Header: "To",
                        headerClassName: "table-header-grid",
                        accessor: "employment_end"
                    }
                ]
            },{
                Header: "Salary",
                headerClassName: "table-header-grid",
                columns: [
                    {
                        Header: "Start",
                        headerClassName: "table-header-grid",
                        accessor: "salary_start"
                    },
                    {
                        Header: "Final",
                        headerClassName: "table-header-grid",
                        accessor: "salary_final"
                    }
                ]
            },
            {
              Header: "Job Title",
              headerClassName: "table-header-grid",
              accessor: "job_title",
              show: true
            },{
              Header: "Reason for Leaving",
              accessor: "reason_leaving",
              headerClassName: "table-header-grid",
              show: true
            },
            {
                Header: "Duties",
                headerClassName: "table-header-grid",
                accessor: 'duties',
                minWidth:50,
                maxiWidth:60,
                Cell: row => (
                    <div>
                      <a onClick={this.catchDuties.bind(this, row.original)}>view</a>             
                    </div>
                  )
              }
            
          ],
          reference_columns: [
            {
              Header: "Name",
              headerClassName: "table-header-grid",
              accessor: "name",
              show: true
            },
            {
              Header: "Address",
              headerClassName: "table-header-grid",
              accessor: "address",
              show: true
            },
            {
                Header: "Telephone",
                headerClassName: "table-header-grid",
                accessor: "telephone"
            },
            {
              Header: "Relationship",
              headerClassName: "table-header-grid",
              accessor: "relationship",
              show: true
            },{
              Header: "Years Known",
              accessor: "years_known",
              headerClassName: "table-header-grid",
              show: true
            },{
                Header: "Characters they vouch",
                accessor: "characters_vouch",
                headerClassName: "table-header-grid",
                show: true
              }
            
          ],
          test_columns: [
            {
              Header: "Attempt Date",
              headerClassName: "table-header-grid",
              accessor: "attempt_date",
              show: true
            },
            {
              Header: "Marks",
              headerClassName: "table-header-grid",
              accessor: "marks",
              show: true
            },
            {
                Header: "Status",
                headerClassName: "table-header-grid",
                accessor: "status"
            },
            {
              Header: "Details",
              headerClassName: "table-header-grid",
              accessor: 'duties',
                minWidth:50,
                maxiWidth:60,
                Cell: row => (
                    <div>
                      <a onClick={/*this.catchDuties.bind(this, row.original)*/() => {console.log("redirect to test details!");}}>view</a>             
                    </div>
                  )
              }
            
          ]
    };
    catchDuties(rowData){
        const duty = rowData.duties;
        this.setState({duties_to_show:duty});
        this.handleShow();
    }
    handleClose = () => {
        this.setState({ parent_show: false });
    }
    
    handleShow = () => {
        this.setState({ parent_show: true });
    }
    toggleActive = (param) => {
      
        let dummy = param;
        this.setState({curr_active: dummy}, ()=> {console.log("State:  " +this.state.curr_active)});
        
    }
    render(){
        
        return(
            <Aux>
            {/*************************************************HyperLinks******************************************/}
            <div className="container-fluid ">
               
            
            </div>    
            {/*************************************************End of HyperLinks******************************************/}
            <div className="container-fluid content-body details">
            <div className="row">
            <div className="col-md-12 hyper-links">
            <Breadcrumb className="bread-crumb">
                    <Breadcrumb.Item onClick={this.toggleActive.bind(this, 'general-info')} className={this.state.curr_active === 'general-info' ? 'hyperlink-active' : 'nonactive'} href="#general-info">General Information</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={this.toggleActive.bind(this, 'academic-info')} className={this.state.curr_active === 'academic-info' ? 'hyperlink-active' : 'nonactive'} href="#academic-info">Academic Information</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={this.toggleActive.bind(this, 'professional-info')} className={this.state.curr_active === 'professional-info' ? 'hyperlink-active' : 'nonactive'} href="#professional-info">Professional Information</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={this.toggleActive.bind(this, 'reference-info')} className={this.state.curr_active === 'reference-info' ? 'hyperlink-active' : 'nonactive'} href="#reference-info">References</Breadcrumb.Item>
                    <Breadcrumb.Item onClick={this.toggleActive.bind(this, 'test-info')} className={this.state.curr_active === 'test-info' ? 'hyperlink-active' : 'nonactive'} href="#test-info">Test Performance</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        </div>
        {/**************************General Information***************************/}
        <div id="general-info">
        <div className="row">
            <div className="col-md-6">
                <h5><u><b>General Information</b></u></h5>
            </div>
        </div>
        {/***************************************************************************/}
        <div className="row">
            <div className="col-md-2">
                <label>Name (As Per NIC): </label>
            </div>

            <div className="col-md-4">
                <p>{this.state.name}</p>
            </div>

            <div className="col-md-2">
                <label>Father's Name: </label>
            </div>

            <div className="col-md-4">
            <p>{this.state.fathername}</p>
            </div>
        </div>
        {/***************************************************************************/}

        <div className="row">
            <div className="col-md-2">
                <label>CNIC No: </label>
            </div>

            <div className="col-md-4">
                <p>{this.state.cnic}</p>
            </div>

            <div className="col-md-2">
                <label>Date of birth: </label>
            </div>

            <div className="col-md-4">
            <p>{this.state.dob}</p>
            </div>
        </div>
        {/***************************************************************************/}

        <div className="row">
            <div className="col-md-2">
                <label>Gender: </label>
            </div>

            <div className="col-md-4">
                <p>{this.state.gender}</p>
            </div>

            <div className="col-md-2">
                <label>Marital Status: </label>
            </div>

            <div className="col-md-4">
            <p>{this.state.marital}</p>
            </div>
        </div>
        {/***************************************************************************/}

        <div className="row">
            <div className="col-md-2">
                <label>Email ID: </label>
            </div>

            <div className="col-md-4">
                <p>{this.state.email}</p>
            </div>

            <div className="col-md-2">
                <label>Mobile Phone: </label>
            </div>

            <div className="col-md-4">
            <p>{this.state.mobile}</p>
            </div>
        </div>
        {/***************************************************************************/}

        <div className="row">
            <div className="col-md-2">
                <label>Home Phone: </label>
            </div>

            <div className="col-md-4">
                <p>{this.state.homephone}</p>
            </div>
        </div>
        {/***************************************************************************/}

        <div className="row">
            <div className="col-md-2">
                <label>Permanent Address: </label>
            </div>

            <div className="col-md-8">
                <p>{this.state.permanent_address}</p>
            </div>
        </div>
        {/***************************************************************************/}

        <div className="row">
            <div className="col-md-2">
                <label>Current Address: </label>
            </div>

            <div className="col-md-8">
                <p>{this.state.current_address}</p>
            </div>

        </div>
        {/***************************************************************************/}

        <div className="row">
            <div className="col-md-2">
                <label>Position applied for: </label>
            </div>

            <div className="col-md-4">
                <p>{this.state.position_applied}</p>
            </div>

            <div className="col-md-2">
                <label>Employment Desired: </label>
            </div>

            <div className="col-md-4">
            <p>{this.state.employment_desired}</p>
            </div>
        </div>
        {/***************************************************************************/}

        <div className="row">
            <div className="col-md-2">
                <label>Expected salary: </label>
            </div>

            <div className="col-md-4">
                <p>{this.state.salary_expected}</p>
            </div>

            <div className="col-md-2">
                <label>Available to work: </label>
            </div>

            <div className="col-md-4">
            <p>{this.state.expected_joining} weeks</p>
            </div>
        </div>
        </div>
        {/**************************End of General Information***************************/}
        <hr/>
        {/**************************Academic Information***************************/}
        <div id="academic-info">
           <div className="row">
             <div className="col-md-6">
             <h5><u><b>Academic Information</b></u></h5>
             </div>
           </div>
           {/***************************************************************************/}
           <div className="row">
           <div className="col-md-12">
           <ReactTable className="table-grid" showPagination={ false } data={this.state.academic_records} minRows={0} columns={this.state.academic_columns} />
           </div>
         </div>
         </div>
         {/***************************************************************************/}
        {/**************************End of Academic Information***************************/}
        <hr/>
        {/**************************Professional Information***************************/}
        <div id="professional-info">
        <div className="row">
            <div className="col-md-6">
                <h5><u><b>Professional Information</b></u></h5>
            </div>
        </div>
        {/*****************************************************************************************/}
        {/*************************************Duties Modal*****************************************/}
        <Modal show={this.state.parent_show} onHide={this.handleClose} >
              <Modal.Header closeButton>
                <Modal.Title>Duties</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>{this.state.duties_to_show}</p>
              </Modal.Body>
            </Modal>
            {/*****************************************************************************************/}
            {/*************************************Professional Records*****************************************/}
            <div className="row">
                <div className="col-md-12">
                    <ReactTable className="table-grid" showPagination={ false } data={this.state.professional_records} minRows={0} columns={this.state.professional_columns} />
                </div>
            </div>
            </div>
            {/*****************************************************************************************/}
            <hr/>
            {/*************************************End of Professional Information*****************************************/}

            {/*************************************Refernces Information*****************************************/}
            <div id="reference-info">
                <div className="row">
                    <div className="col-md-6">
                            <h5><u><b>References</b></u></h5>
                    </div>
                </div>
            {/***********************************************************************************************************/}
            {/*************************************Reference Table*****************************************/}
            <div className="row">
                    <div className="col-md-12">
                    <ReactTable className="table-grid" showPagination={ false } data={this.state.reference_records} minRows={0} columns={this.state.reference_columns} />
                    </div>
                </div>
            
            {/*************************************End of Reference Table*****************************************/}
            </div>
            <hr/>
    {/*********************************************************************************************************************/}
    {/*****************************************Test Performance******************************************/}    
    <div id="test-info">
        <div className="row">
            <div className="col-md-6">
                <h5><u><b>Test performance</b></u></h5>
            </div>
        </div>
    </div>
    {/*********************************************************************************************************************/}
    <div className="row">
        <div className="col-md-12">
            <ReactTable className="table-grid" showPagination={ false } data={this.state.test_records} minRows={0} columns={this.state.test_columns} />
        </div>
    </div>

    {/***********************************End of Test Performance******************************************/}
    </div>
            </Aux>
        );
    }
}

export default CandidateDetails;