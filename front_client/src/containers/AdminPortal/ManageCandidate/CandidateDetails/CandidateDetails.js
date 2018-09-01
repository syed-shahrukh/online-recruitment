import React, {Component} from 'react';
import Aux from '../../../Auxilary/Auxilary';
import { Modal, Breadcrumb } from 'react-bootstrap';
import Backdrop from 'react-backdrop';
import Spinner from '../../../../UI/Spinner/Spinner';
import axios from 'axios';
import ReactTable from 'react-table';
import './CandidateDetails.css';

class CandidateDetails extends Component{
    
    componentWillMount() {
        axios.get('/api/sections/').then(response => {
            let data = response.data;
            let sections = data.map(section => {
                return({id: section._id, name: section.name});
            });
            const section1 = sections[0].id;
            const section2 = sections[1].id;
            const section3 = sections[2].id;
            this.setState({section1: section1, section2:section2, section3: section3});
            axios.get(`/api/result/${this.state.candidateUserId}/${this.state.section1}`).then(response => {
                    let record = this.state.testinfo;
                    let receivedData = response.data;
                    receivedData.sectionName = "Section 1";
                    console.log(receivedData)
                    let newArray = record.concat(receivedData);
                    this.setState({testinfo: newArray}, () => {
                        console.log("STATE ARRAYYYY");
                        console.log(this.state.testinfo);});
                    
            });

        })
        axios.get(`/api/candidates/${this.state.candidateUserId}`).then(response => {
            let recievedData = response.data;
            let data = recievedData.map( data => {
                return({
                    userId: data.userId,
                    fullName: data.fullName,
                    mobilePhone: data.mobilePhone,
                    email: this.props.location.state.email,
                    positionApplied: data.positionApplied,
                    gender: data.gender,
                    fatherHusbandName: data.fatherHusbandName,
                    cnic: data.cnic,
                    dob: data.dob,
                    maritalStatus: data.maritalStatus,
                    homePhone: data.homePhone,
                    currentAddress: data.currentAddress,
                    permanentAddress: data.permanentAddress
                });
            });        
             this.setState({generalInfo: data[0]});   
        });
/******************************************************************************************* */
        axios.get(`/api/academicinfo/${this.state.candidateUserId}`).then(response => {
            let recievedData = response.data;
            let data = recievedData.map( data => {
                return({
                    userId: data.userId,
                    institute: data.institute,
                    subject: data.subject,
                    yearEnrolled: data.yearEnrolled,
                    yearGraduated: data.yearGraduated,
                    degree: data.degree,
                    grades: data.grades,
                    major: data.major
                });  
            });
            this.setState({academicInfo: data});
        });
/************************************************************************************************ */
        axios.get(`/api/professionalinfo/${this.state.candidateUserId}`).then(response => {
            let recievedData = response.data;
            let data = recievedData.map( data => {
                return({
                    userId: data.userId,
                    employer: data.employer,
                    title: data.title,
                    employmentDate: data.employmentDate,
                    duration: data.duration,
                    salaryStart: data.salaryStart,
                    salaryFinal: data.salaryFinal,
                    reason: data.reason,
                    duties: data.duties
                });  
            });
            this.setState({professionalInfo: data});
        });
/************************************************************************************************ */
        axios.get(`/api/referenceinfo/${this.state.candidateUserId}`).then(response => {
            let recievedData = response.data;
            console.log(recievedData);
            let data = recievedData.map( data => {
                return({
                    userId: data.userId,
                    name: data.name,
                    relationship: data.relationship,
                    phone: data.phone,
                    yearsKnown: data.yearsKnown,
                    notified: data.notified
                });  
            });
            this.setState({referencesInfo: data, loading: false});
        });

        
    }
    state= {
        section1: '',
        section2: '',
        section3: '',
        loading: true,
        sectionDetails: [],
        showSectionDetailsStatus: false,
        candidateUserId: this.props.location.state.userId,
        generalInfo: {},
        academicInfo:[],
        professionalInfo:[],
        referencesInfo:[],
        testinfo:[],
        parent_show:false,
       
        academicColumns: [
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
                        accessor: "yearEnrolled"
                    },
                    {
                        Header: "To",
                        headerClassName: "table-header-grid",
                        accessor: "yearGraduated"
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
          professionalColumns: [
            {
              Header: "Employer/Company",
              headerClassName: "table-header-grid",
              accessor: "employer",
              show: true
            },{
                Header: "Job Title",
                headerClassName: "table-header-grid",
                accessor: "title",
                show: true
              },
            {
                Header: "Employment Date",
                headerClassName: "table-header-grid",
                accessor: "employmentDate"
            },{
                Header: "Duration",
                headerClassName: "table-header-grid",
                accessor: "duration",
                show: true
              },
            {
                Header: "Salary",
                headerClassName: "table-header-grid",
                columns: [
                    {
                        Header: "Start",
                        headerClassName: "table-header-grid",
                        accessor: "salaryStart"
                    },
                    {
                        Header: "Final",
                        headerClassName: "table-header-grid",
                        accessor: "salaryFinal"
                    }
                ]
            },
            {
              Header: "Reason for Leaving",
              accessor: "reason",
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
                Header: "Relationship",
                headerClassName: "table-header-grid",
                accessor: "relationship",
                show: true
              },
            {
                Header: "Telephone",
                headerClassName: "table-header-grid",
                accessor: "phone"
            },
            {
              Header: "Years Known",
              accessor: "yearsKnown",
              headerClassName: "table-header-grid",
              show: true
            },{
                Header: "Notified",
                accessor: "notified",
                Cell: ({ value }) => {
                    if(value){
                        return "Yes";
                    }
                    else{
                        return "No";
                    }
                },
                headerClassName: "table-header-grid",
                show: true
              }
            
          ],
          testColumns: [
            {
                Header: "Section Id",
                headerClassName: "table-header-grid",
                accessor: "sectionId",
                show: false
              },
            {
              Header: "Attempt Date",
              headerClassName: "table-header-grid",
              accessor: "date",
              show: true
            },
            {
                Header: "Section",
                headerClassName: "table-header-grid",
                accessor: "sectionName",
                show: true
              },
            {
              Header: "Total Questions",
              headerClassName: "table-header-grid",
              accessor: "totalQuestions",
              show: true
            },
            {
                Header: "Correct Answers",
                headerClassName: "table-header-grid",
                accessor: "correctAnswers"
            },
            
            {
              Header: "Details",
              headerClassName: "table-header-grid",
              accessor: 'duties',
                minWidth:50,
                maxiWidth:60,
                Cell: row => (
                    <div>
                      <a onClick={this.getSectionDetails.bind(this, row.original)}>view</a>             
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
    handleSectionDetailsModal = () => {
        const status = !this.state.showSectionDetailsStatus;
        this.setState({ showSectionDetailsStatus: status });
    }
    
    handleShow = () => {
        this.setState({ parent_show: true });
    }
    toggleActive = (param) => {
      
        let dummy = param;
        this.setState({curr_active: dummy}, ()=> {console.log("State:  " +this.state.curr_active)});
        
    }
    getSectionDetails = (row) => {
        this.setState({loading: true});
        axios.get(`/api/result/getSectionDetails/${row.sectionId}`).then(response => {
            this.handleSectionDetailsModal();
            console.log(response.data);
            
            
            this.setState({loading: false, sectionDetails: response.data});
            
        })
    }
    render(){
        let details = "Nothing";
        if(this.state.sectionDetails != []){
             details = this.state.sectionDetails.map(question => {
                    const options = question.options.map(option => {
                        return (<li>
                                {option.ans_text}
                            </li>);
                    })
                return (
                    <Aux>
                        <div className="test-window-details">
                    <div className="statement-and-timer">
                        <div className="test-question-statement">
                            <p>{question.questionText}</p>
                        </div>
                    </div>

                    <div className="question-options">
                    
                        <ul>
                    
                        {options}

                        </ul>
                    
                    </div>
                   
                </div>
                    
                    </Aux>
                );
            })
        }
         
        return(
            <Aux>
            {this.state.loading ? <Backdrop>
                <Spinner/>
            </Backdrop>
            :
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
                <p>{this.state.generalInfo.fullName}</p>
            </div>

            <div className="col-md-2">
                <label>Father's Name: </label>
            </div>

            <div className="col-md-4">
            <p>{this.state.generalInfo.fatherHusbandName}</p>
            </div>
        </div>
        {/***************************************************************************/}

        <div className="row">
            <div className="col-md-2">
                <label>CNIC No: </label>
            </div>

            <div className="col-md-4">
                <p>{this.state.generalInfo.cnic}</p>
            </div>

            <div className="col-md-2">
                <label>Date of birth: </label>
            </div>

            <div className="col-md-4">
            <p>{this.state.generalInfo.dob}</p>
            </div>
        </div>
        {/***************************************************************************/}

        <div className="row">
            <div className="col-md-2">
                <label>Gender: </label>
            </div>

            <div className="col-md-4">
                <p>{this.state.generalInfo.gender}</p>
            </div>

            <div className="col-md-2">
                <label>Marital Status: </label>
            </div>

            <div className="col-md-4">
            <p>{this.state.generalInfo.maritalStatus}</p>
            </div>
        </div>
        {/***************************************************************************/}

        <div className="row">
            <div className="col-md-2">
                <label>Email ID: </label>
            </div>

            <div className="col-md-4">
                <p>{this.state.generalInfo.email}</p>
            </div>

            <div className="col-md-2">
                <label>Mobile Phone: </label>
            </div>

            <div className="col-md-4">
            <p>{this.state.generalInfo.mobilePhone}</p>
            </div>
        </div>
        {/***************************************************************************/}

        <div className="row">
            <div className="col-md-2">
                <label>Home Phone: </label>
            </div>

            <div className="col-md-4">
                <p>{this.state.generalInfo.homePhone}</p>
            </div>
        </div>
        {/***************************************************************************/}

        <div className="row">
            <div className="col-md-2">
                <label>Permanent Address: </label>
            </div>

            <div className="col-md-8">
                <p>{this.state.generalInfo.permanentAddress}</p>
            </div>
        </div>
        {/***************************************************************************/}

        <div className="row">
            <div className="col-md-2">
                <label>Current Address: </label>
            </div>

            <div className="col-md-8">
                <p>{this.state.generalInfo.currentAddress}</p>
            </div>

        </div>
        {/***************************************************************************/}

        <div className="row">
            <div className="col-md-2">
                <label>Position applied for: </label>
            </div>

            <div className="col-md-4">
                <p>{this.state.generalInfo.positionApplied}</p>
            </div>

           
        </div>
        {/***************************************************************************/}

        
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
           <ReactTable className="table-grid" showPagination={ false } data={this.state.academicInfo} minRows={0} columns={this.state.academicColumns} />
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
                    <ReactTable className="table-grid" showPagination={ false } data={this.state.professionalInfo} minRows={0} columns={this.state.professionalColumns} />
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
                    <ReactTable className="table-grid" showPagination={ false } data={this.state.referencesInfo} minRows={0} columns={this.state.reference_columns} />
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
            <ReactTable className="table-grid" showPagination={ false } data={this.state.testinfo} minRows={0} columns={this.state.testColumns} />
        </div>
    </div>
    <Modal show={this.state.showSectionDetailsStatus} onHide={this.handleSectionDetailsModal} >
              <Modal.Header closeButton>
                <Modal.Title>Section Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {details}
              </Modal.Body>
            </Modal>
    {/***********************************End of Test Performance******************************************/}
    </div>
    </Aux>
    }
            </Aux>
        );
    }
}

export default CandidateDetails;